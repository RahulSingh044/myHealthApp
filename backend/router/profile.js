const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const verifyUser = require('../middleware/verifyUser');
const EmergencyAccessKey = require('../models/emergencyAccessKey');
const crypto = require('crypto');
const PrescribedRecord = require('../models/prescribedRecord');
const MedicalRecord = require('../models/medicalRecord');

// Get profile
router.get('/', verifyUser, async (req, res) => {
    try {
        const userId = req.userId;  // Get userId from middleware
        const profile = await Profile.findOne({ userId });
        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})

// Create or update profile
router.patch('/', verifyUser, async (req, res) => {
    try {
        const { personalInfo, insuranceInfo, emergencyContact, allergies, chronicConditions } = req.body;
        const userId = req.userId;  // Get userId from middleware

        // Check if profile already exists for the user
        let profile = await Profile.findOne({ userId });

        if (profile) {
            // Update existing profile
            profile.personalInfo = {...personalInfo, email: profile.personalInfo.email};
            profile.insuranceInfo = insuranceInfo;
            profile.emergencyContact = emergencyContact;
            profile.allergies = allergies;
            profile.chronicConditions = chronicConditions;

            const updatedProfile = await profile.save();
            return res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: updatedProfile
            });
        }

        // Create new profile
        const newProfile = new Profile({
            userId,
            personalInfo,
            insuranceInfo,
            emergencyContact,
            allergies,
            chronicConditions
        });

        const savedProfile = await newProfile.save();
        res.status(201).json({
            success: true,
            message: 'Profile created successfully',
            data: savedProfile
        });

    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving profile',
            error: error.message
        });
    }
});

// Add a new allergy to existing profile
router.post('/allergy', verifyUser, async (req, res) => {
    try {
        const { allergy } = req.body;
        const userId = req.userId;  // Get userId from middleware
        
        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        profile.allergies.push(allergy);
        const updatedProfile = await profile.save();

        res.status(200).json({
            success: true,
            message: 'Allergy added successfully',
            data: updatedProfile
        });

    } catch (error) {
        console.error('Error adding allergy:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding allergy',
            error: error.message
        });
    }
});

// Delete an allergy from existing profile
router.delete('/allergy/:id', verifyUser, async (req, res) => {
    try {
        const allergyId = req.params.id;
        const userId = req.userId;  // Get userId from middleware
        const profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        const index = profile.allergies.findIndex(allergy => allergy._id.toString() === allergyId);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Allergy not found'
            });
        }

        profile.allergies.splice(index, 1);
        await profile.save();

        res.status(200).json({
            success: true,
            message: 'Allergy deleted successfully',
            data: profile
        });

    } catch (error) {
        console.error('Error deleting allergy:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting allergy',
            error: error.message
        });
    }
});

// Add a new chronic condition to existing profile
router.post('/chronic-condition', verifyUser, async (req, res) => {
    try {
        const { chronicCondition } = req.body;
        const userId = req.userId;  // Get userId from middleware
        
        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        profile.chronicConditions.push(chronicCondition);
        const updatedProfile = await profile.save();

        res.status(200).json({
            success: true,
            message: 'Chronic condition added successfully',
            data: updatedProfile
        });

    } catch (error) {
        console.error('Error adding chronic condition:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding chronic condition',
            error: error.message
        });
    }
});

// Delete a chronic condition from existing profile
router.delete('/chronic-condition/:id', verifyUser, async (req, res) => {
    try {
        const conditionId = req.params.id;
        const userId = req.userId;  // Get userId from middleware
        const profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        const index = profile.chronicConditions.findIndex(condition => condition._id.toString() === conditionId);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Chronic condition not found'
            });
        }
        profile.chronicConditions.splice(index, 1);
        await profile.save();

        res.status(200).json({
            success: true,
            message: 'Chronic condition deleted successfully',
            data: profile
        })
    } catch (error) {
        console.error('Error deleting chronic condition:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Generate emergency access key
router.post('/generate-emergency-key', verifyUser, async (req, res) => {
    try {
        const userId = req.userId;  // Get userId from middleware
        
        // Generate an alphanumeric key with hyphens
        const generateKey = () => {
            const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let key = '';
            for (let i = 0; i < 16; i++) {
                if (i > 0 && i % 4 === 0) key += '-';
                const randomIndex = crypto.randomInt(0, chars.length);
                key += chars[randomIndex];
            }
            return key;
        };
        
        const accessKey = generateKey();
        
        // Check if there's an existing key for this user and remove it
        await EmergencyAccessKey.deleteMany({ userId });
        
        // Create new emergency access key
        const emergencyKey = new EmergencyAccessKey({
            userId,
            accessKey
        });
        
        await emergencyKey.save();
        
        res.status(201).json({
            success: true,
            message: 'Emergency access key generated successfully',
            data: {
                accessKey,
                expiresIn: '10 minutes'
            }
        });
        
    } catch (error) {
        console.error('Error generating emergency access key:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating emergency access key',
            error: error.message
        });
    }
});

//Access Data with Emergency Key
router.get('/emergency-access/:accessKey', async (req, res) => {
    try {
        const { accessKey } = req.params;
        const keyDoc = await EmergencyAccessKey.findOne({ accessKey });
        if (!keyDoc) {
            return res.status(404).json({
                success: false,
                message: 'Invalid or expired access key'
            });
        }

        const profile = await Profile.findOne({ userId: keyDoc.userId });
        const medications = await PrescribedRecord.find({ userId: keyDoc.userId }).select('-userId -__v -createdAt -updatedAt');
        const medicalRecords = await MedicalRecord.find({ userId: keyDoc.userId }).select('-userId -__v -createdAt -updatedAt');
        
        // Extract only required emergency information
        const emergencyData = {
            personalInfo: profile.personalInfo,
            allergies: profile.allergies,
            chronicConditions: profile.chronicConditions,
            emergencyContact: profile.insuranceInfo,
            currentMedications: medications,
            medicalRecords: medicalRecords
        };

        res.status(200).json({
            success: true,
            message: 'Emergency data retrieved successfully',
            data: emergencyData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving data',
            error: error.message
        });
    }
});

module.exports = router;
