'use client';
import React, { useEffect, useState } from 'react'
import Navbar from '../patient/_components/Navbar'
import { Shield, LogOut, DownloadIcon, UploadIcon, X } from 'lucide-react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { downloadMedicalReports, getMedicalRecordsAction, uploadMedicalAction } from '../actions/recordsAction';
import MedicalRecordsTable from '../components/MedicalReportsTable';
import UpperNavbar from '../patient/_components/UpperNavbar';

function Records() {

    const [activeSection, setActiveSection] = useState('Medical Records')
    const [isDocumentOpen, setIsDocumentOpen] = useState(false)
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [formData, setFormData] = useState({
        recordType: 'lab_report',
        date: '',
        title: '',
        description: ''
    });

    const [medicalRecords, setMedicalRecords] = useState([])
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        handleFileUpload(uploadedFile);
    };

    const handleFileUpload = (uploadedFile) => {
        if (!uploadedFile) return;

        setFile(uploadedFile);

        // Generate preview for image or PDF
        if (uploadedFile.type.startsWith('image/') || uploadedFile.type === 'application/pdf') {
            const url = URL.createObjectURL(uploadedFile);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        handleFileUpload(droppedFile);
    };

    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
    };

    const getMedicalRecords = async () => {
        try {
            setLoading(true);
            const res = await getMedicalRecordsAction();
            if (res.success) {
                setMedicalRecords(res.data)
            }
        } catch (error) {
            toast.error("Unable to get the Medical Records");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUploadToBackend = async () => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }

        const data = new FormData();
        data.append('file', file);
        data.append('recordType', formData.recordType);
        data.append('date', formData.date);
        data.append('title', formData.title);
        data.append('description', formData.description);

        try {
            setUploading(true);
            const res = await uploadMedicalAction(data);
            if (res.success) {
                await getMedicalRecords();
                toast.success('File uploaded successfully!');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            toast.error('File upload failed!');
            setUploading(false);
        } finally {
            // Reset form
            setFile(null);
            setPreviewUrl(null);
            setUploading(false);
            setIsDocumentOpen(false);
        }
    };


    const downloadRecords = async () => {
        try {
            setDownloading(true)
            const res = await downloadMedicalReports();
            if (res.success) {
                toast("Downalod Started");
            }
        } catch (error) {
            toast.error("Unable to get the Medical Records");
            console.log(error);
        } finally {
            setDownloading(false);
        }
    }

    useEffect(() => {
        getMedicalRecords();
    }, [])

    return (
        <div className='min-h-screen bg-slate-50'>
            <UpperNavbar />

            <div className="w-full flex px-40 py-8 gap-6">
                <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

                <div className="w-full p-8 bg-white rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Medical Records</h1>

                        <div className="flex gap-3">
                            <button
                                onClick={downloadRecords}
                                className="bg-gray-100 text-gray-400 cursor-pointer px-3 flex items-center gap-2 py-2 rounded-xl"
                            >

                                {downloading ? `Downloading...` : <> <DownloadIcon size={20} /> <span>Download All</span></>}
                            </button>

                            <button
                                onClick={() => setIsDocumentOpen(!isDocumentOpen)}
                                className="bg-teal-500 text-white cursor-pointer px-3 flex items-center gap-2 py-2 rounded-xl"
                            >
                                <UploadIcon size={20} /> Upload Records
                            </button>
                        </div>
                    </div>

                    {/* Upload form section */}
                    {isDocumentOpen && (
                        <div className="mt-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 mb-6 border-2 border-teal-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Upload New Record
                            </h3>

                            <div className="space-y-4">
                                {/* Record Type and Date */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Record Type
                                        </label>
                                        <select
                                            name='recordType'
                                            value={formData.recordType}
                                            onChange={(e) => setFormData({ ...formData, recordType: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                            <option value="lab_report">Lab Report</option>
                                            <option value="prescription">Prescription</option>
                                            <option value="discharge_summary">Discharge Summary</option>
                                            <option value="xray">X-Ray</option>
                                            <option value="scan">Scan</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            name='date'
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name='title'
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., Blood Test Results"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name='description'
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Additional details about this record"
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    ></textarea>
                                </div>

                                {/* File Upload */}
                                {/* File Preview */}
                                {file ? (
                                    <div className="mt-4 p-4 border rounded-lg bg-transparent shadow-sm relative">
                                        <button
                                            onClick={removeFile}
                                            className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-red-500"
                                        >
                                            <X size={18} />
                                        </button>
                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                            File: {file.name}
                                        </p>

                                        {/* Image Preview */}
                                        {previewUrl && file?.type?.startsWith('image/') && (
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="max-h-64 mx-auto rounded-lg border"
                                            />
                                        )}

                                        {/* PDF Preview */}
                                        {previewUrl && file?.type === 'application/pdf' && (
                                            <iframe
                                                src={previewUrl}
                                                title="PDF Preview"
                                                className="w-full h-64 border rounded-lg"
                                            ></iframe>
                                        )}

                                        {/* DOC/DOCX Notice */}
                                        {!previewUrl &&
                                            (file?.type === 'application/msword' ||
                                                file?.type ===
                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && (
                                                <p className="text-gray-600 text-sm">
                                                    📄 {file.name} (Preview not supported)
                                                </p>
                                            )}
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                                        <div
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${dragOver ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-500'
                                                }`}
                                        >
                                            <input
                                                type="file"
                                                id="file-upload"
                                                className="hidden"
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                onChange={handleFileChange}
                                            />
                                            <label htmlFor="file-upload" className="cursor-pointer block">
                                                <UploadIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-600">
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    PDF, JPG, PNG, DOC (max 10MB)
                                                </p>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleUploadToBackend}
                                        disabled={uploading}
                                        className={`px-4 py-2 rounded-lg transition-colors ${uploading
                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                            : 'bg-teal-600 text-white hover:bg-teal-700'
                                            }`}
                                    >
                                        {uploading ? `Uploading...` : 'Save Record'}
                                    </button>
                                    <button
                                        onClick={() => setIsDocumentOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Medical Records Table */}
                    {!loading && medicalRecords.length > 0 && (
                        <div className="mt-8">
                            <MedicalRecordsTable data={medicalRecords} refreshRecords={getMedicalRecords} />
                        </div>
                    )}

                    {/* Empty state (only show when no records and form is closed) */}
                    {!loading && medicalRecords.length === 0 && !isDocumentOpen && (
                        <div className="text-center py-12 mt-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-file-text h-12 w-12 text-gray-400 mx-auto mb-3"
                            >
                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                <path d="M10 9H8"></path>
                                <path d="M16 13H8"></path>
                                <path d="M16 17H8"></path>
                            </svg>
                            <p className="text-gray-600 mb-2">No medical records yet</p>
                            <p className="text-sm text-gray-500">
                                Upload your first medical record to get started
                            </p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Records