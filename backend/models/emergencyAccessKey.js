const mongoose = require('mongoose');

const emergencyAccessKeySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accessKey: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // 10 minutes in seconds (10 * 60)
    }
});

const EmergencyAccessKey = mongoose.model('EmergencyAccessKey', emergencyAccessKeySchema);

module.exports = EmergencyAccessKey;
