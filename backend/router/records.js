const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const MedicalRecord = require('../models/medicalRecord');
const verifyUser = require('../middleware/verifyUser');
const PrescribedRecord = require('../models/prescribedRecord');

// Create storage directory if it doesn't exist
const storageDir = path.join(__dirname, '../storage');
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, storageDir)
    },
    filename: function (req, file, cb) {
        // Create unique filename with timestamp and original extension
        const uniqueSuffix = Date.now() + '-' + path.basename(file.originalname);
        cb(null, uniqueSuffix)
    }
});

// File filter function
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Invalid file type. Only PDF, JPG, PNG, and DOC files are allowed.';
        cb(null, false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
});

// Upload medical record
router.post('/medical-record/upload', verifyUser, upload.single('file'), async (req, res) => {
    try {
        const { recordType, date, title, description } = req.body;
        
        // Check for file validation error
        if (req.fileValidationError) {
            return res.status(400).json({
                success: false,
                message: req.fileValidationError
            });
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Create new medical record
        const medicalRecord = new MedicalRecord({
            userId: req.userId,
            recordType,
            date,
            title,
            description,
            fileUrl: file.filename,
            fileName: file.originalname,
            fileType: path.extname(file.originalname).substring(1),
            fileSize: file.size
        });

        await medicalRecord.save();

        res.status(201).json({
            success: true,
            message: 'Medical record uploaded successfully'
        });

    } catch (error) {
        // Delete uploaded file if record creation fails
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        
        console.error('Error uploading medical record:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading medical record',
            error: error.message
        });
    }
});

// Delete medical record
router.delete('/medical-record/:id', verifyUser, async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.findById(req.params.id);

        if (!medicalRecord) {
            return res.status(404).json({
                success: false,
                message: 'Medical record not found'
            });
        }

        if (medicalRecord.userId.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this record'
            });
        }

        
        await MedicalRecord.findByIdAndDelete(req.params.id);
        
        const filePath = path.join(storageDir, medicalRecord.fileUrl);

        if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.status(200).json({
            success: true,
            message: 'Medical record deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting medical record',
            error: error.message
        });
    }
})

// Get all records for a user
router.get('/medical-record/all', verifyUser, async (req, res) => {
    try {
        const records = await MedicalRecord.find({ userId: req.userId }).select('-userId -fileUrl -__v -fileName -fileType -fileSize -lastModified -uploadedAt')
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            data: records
        });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching records',
            error: error.message
        });
    }
});

// Download all records as zip
router.get('/medical-record/download-all', verifyUser, async (req, res) => {
    try {
        // Get all records for user
        const records = await MedicalRecord.find({ userId: req.userId });
        
        if (records.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No records found'
            });
        }

        // Create zip file
        const archive = archiver('zip', {
            zlib: { level: 9 } // Maximum compression
        });

        // Set the content disposition and type
        res.attachment('medical-records.zip');
        res.setHeader('Content-Type', 'application/zip');

        // Pipe archive data to response
        archive.pipe(res);

        // Add each file to the archive
        for (const record of records) {
            const filePath = path.join(storageDir, record.fileUrl);
            if (fs.existsSync(filePath)) {
                // Create folder structure based on record type
                const folderName = record.recordType.replace('_', ' ').toUpperCase();
                const fileName = `${folderName}/${record.date.toISOString().split('T')[0]}-${record.title}${path.extname(record.fileName)}`;
                
                archive.file(filePath, { name: fileName });
            }
        }

        // Finalize archive
        await archive.finalize();

    } catch (error) {
        console.error('Error downloading records:', error);
        res.status(500).json({
            success: false,
            message: 'Error downloading records',
            error: error.message
        });
    }
});

// Error handler for multer errors
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size cannot exceed 10MB'
            });
        }
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    next(error);
});

// Add prescribed medication record
router.post('/prescribed-record/add', verifyUser, async (req, res) => {
    try {
        const { medicationName, dosage, frequency, startDate, prescribingDoctor } = req.body;

        const prescribedRecord = new PrescribedRecord({
            userId: req.userId,
            medicationName,
            dosage,
            frequency,
            startDate,
            prescribingDoctor
        });

        await prescribedRecord.save();

        res.status(201).json({
            success: true,
            message: 'Medication record added successfully',
            data: prescribedRecord
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding medication record',
            error: error.message
        });
    }
});

// Get all prescribed medication records for a user
router.get('/prescribed-record/all', verifyUser, async (req, res) => {
    try {
        const records = await PrescribedRecord.find({ userId: req.userId })
            .select('-userId -__v -createdAt -updatedAt')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching medication records',
            error: error.message
        });
    }
});

// Delete prescribed medication record
router.delete('/prescribed-record/:id', verifyUser, async (req, res) => {
    try {
        const record = await PrescribedRecord.findById(req.params.id);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Medication record not found'
            });
        }

        if (record.userId.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this record'
            });
        }

        await PrescribedRecord.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Medication record deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting medication record',
            error: error.message
        });
    }
});

module.exports = router;