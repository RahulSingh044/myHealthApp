const mongoose = require('mongoose');

const prescribedRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medicationName: {
        type: String,
        required: [true, 'Medication name is required']
    },
    dosage: {
        type: String,
        required: [true, 'Dosage is required']
    },
    frequency: {
        type: String,
        required: [true, 'Frequency is required']
    },
    startDate: {
        type: String,
        required: [true, 'Start date is required']
    },
    prescribingDoctor: {
        type: String,
        required: [true, 'Prescribing doctor name is required']
    }
}, { timestamps: true });

const PrescribedRecord = mongoose.model('PrescribedRecord', prescribedRecordSchema);

module.exports = PrescribedRecord;
