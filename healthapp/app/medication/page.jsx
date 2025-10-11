'use client';
import React, { useState } from 'react'
import Navbar from '../patient/_components/Navbar';
import { Shield, LogOut, Plus } from 'lucide-react';

function Medication() {

    const [activeSection, setActiveSection] = useState('Medication Prescribed');

    const [isPrescribedOpen, setIsPrescribedOpen] = useState(false);

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
                                onClick={() => setIsPrescribedOpen(!isPrescribedOpen)}
                                className="bg-teal-600 text-white cursor-pointer px-3 flex items-center gap-2 py-2 rounded-xl"
                            >
                                <Plus size={20} /> Add Medication
                            </button>
                        </div>
                    </div>

                    {/* upload Section  */}
                    {isPrescribedOpen && (
                        <div className="mt-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 mb-6 border-2 border-teal-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Add new Medication
                            </h3>

                            <div className='space-y-4'>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="medication">Medication Name</label>
                                        <input
                                            type="text"
                                            placeholder='e.g., Aspirin'
                                            className="w-full mt-2  px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="dosage">Dosage</label>
                                        <input
                                            type="text"
                                            placeholder='e.g., 100mg'
                                            className="w-full mt-2  px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="frequency">Frequency</label>
                                        <input
                                            type="text"
                                            placeholder='e.g., Once a day'
                                            className="w-full mt-2  px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="startDate">Start Date</label>
                                        <input
                                            type="date"
                                            className="w-full mt-2  px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="prescribedDoctor">Prescribing Doctor</label>
                                        <input
                                            type="text"
                                            placeholder='e.g., Dr. Sayam Khajuria'
                                            className="w-full mt-2  px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                                        Add Medication
                                    </button>
                                    <button
                                        onClick={() => setIsPrescribedOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}
                    {/* Empty state (only show when no records and form is closed) */}
                    {!isPrescribedOpen && (
                        <div className="text-center py-12 mt-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-search h-12 w-12 text-gray-400 mx-auto mb-3">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>

                            <p className="text-gray-600 mb-2">No medications added yet</p>
                            <p className="text-sm text-gray-500">
                                Add your medications to check for interactions
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Medication