const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reaction: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const chronicConditionSchema = new mongoose.Schema({
    conditionName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    }
});

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    personalInfo: {
        fullName: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other']
        },
        bloodGroup: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        }
    },
    insuranceInfo: {
        type: String,
        required: true
    },
    emergencyContact: {
        Name: {
            type: String,
            required: true
        },
        Phone: {
            type: String,
            required: true
        }
    },
    allergies: [allergySchema],
    chronicConditions: [chronicConditionSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
profileSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;