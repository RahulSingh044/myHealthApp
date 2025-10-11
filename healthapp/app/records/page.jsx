'use client';
import React, { useState } from 'react'
import Navbar from '../patient/_components/Navbar'
import { Shield, LogOut, DownloadIcon, UploadIcon } from 'lucide-react'

function Records() {

    const [activeSection, setActiveSection] = useState('Medical Records')
    const [isDocumentOpen, setIsDocumentOpen] = useState(false)

    return (
        <div className='min-h-screen bg-slate-50'>
            <div className='w-full flex justify-between items-center py-4 px-40 bg-white border-b-2 border-gray-200'>
                <div className='text-2xl flex items-center space-x-4 font-semibold font-serif'>
                    <Shield className='text-green-500' /> MediLink
                </div>
                <div className='flex items-center space-x-4 '>
                    <span className='text-gray-500 mr-10'> rahul@gmail.com </span>
                    <LogOut size={20} className='mr-2' />  Sign Out
                </div>
            </div>

            <div className="w-full flex px-40 py-8 gap-6">
                <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

                <div className="w-full p-8 bg-white rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Medical Records</h1>

                        <div className="flex gap-3">
                            <button
                                className="bg-gray-100 text-gray-400 cursor-pointer px-3 flex items-center gap-2 py-2 rounded-xl"
                            >
                                <DownloadIcon size={20} /> Download All
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
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
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
                                        placeholder="Additional details about this record"
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    ></textarea>
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Upload File
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
                                        <input
                                            type="file"
                                            id="file-upload"
                                            className="hidden"
                                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer">
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
                                                className="lucide lucide-upload h-8 w-8 text-gray-400 mx-auto mb-2"
                                            >
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="17 8 12 3 7 8"></polyline>
                                                <line x1="12" x2="12" y1="3" y2="15"></line>
                                            </svg>
                                            <p className="text-sm text-gray-600">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                PDF, JPG, PNG, DOC (max 10MB)
                                            </p>
                                        </label>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                                        Save Record
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

                    {/* Empty state (only show when no records and form is closed) */}
                    {!isDocumentOpen && (
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