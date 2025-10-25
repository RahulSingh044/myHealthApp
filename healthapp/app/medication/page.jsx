'use client';
import React, { useState, useEffect } from 'react'
import Navbar from '../patient/_components/Navbar';
import { Shield, LogOut, Plus } from 'lucide-react';
import { addPrescribedMedicationAction, getPrescribedMedicationAction } from '../actions/recordsAction';
import PrescribedRecordsTable from '../components/PrescribedRecordsTable';
import toast from 'react-hot-toast';
import UpperNavbar from '../patient/_components/UpperNavbar';

function Medication() {

    const [activeSection, setActiveSection] = useState('Medication Prescribed');
    const [isPrescribedOpen, setIsPrescribedOpen] = useState(false);
    const [prescribedFile, setPrescribedFile] = useState(null);
    const [medList, setMedList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMed = async () => {
            try {
                const res = await getPrescribedMedicationAction();
                if (res.success) {
                    setMedList(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getMed();
    }, [medList])

    const handleAdd = async () => {
        try {
            if (!prescribedFile) {
                toast.error('Please choose a file to upload');
                return;
            }

            setLoading(true);
            const formData = new FormData();
            formData.append('file', prescribedFile);

            const res = await addPrescribedMedicationAction(formData);
            if (res.success) {
                toast.success('Prescription uploaded');
                setMedList(prev => [...prev, res.data]);
                setIsPrescribedOpen(false);
                setPrescribedFile(null);
            } else {
                toast.error(res.message || 'Upload failed');
            }
        } catch (error) {
            toast.error('Unable to save the data');
        } finally {
            setLoading(false);
        }
    }

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
                                        <label htmlFor="prescriptionFile">Choose file (jpg, png, pdf)</label>
                                        <input
                                            id="prescriptionFile"
                                            type="file"
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            onChange={(e) => setPrescribedFile(e.target.files[0] || null)}
                                            className="w-full mt-2"
                                        />
                                        {prescribedFile && (
                                            <p className="text-sm text-gray-600 mt-2">Selected: {prescribedFile.name}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleAdd}
                                        disabled={loading}
                                        className={`px-4 py-2 rounded-lg transition-colors ${loading
                                                ? 'bg-teal-300 cursor-not-allowed text-white'
                                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                                            }`}
                                    >
                                        {loading ? 'Uploading...' : 'Upload Prescription'}
                                    </button>

                                    <button
                                        onClick={() => { setIsPrescribedOpen(false); setPrescribedFile(null); }}
                                        disabled={loading}
                                        className={`px-4 py-2 rounded-lg transition-colors ${loading
                                                ? 'bg-gray-200 cursor-not-allowed text-gray-400'
                                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Empty state (only show when no records and form is closed) */}
                    {medList.length < 1 ? (
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
                    ) : (
                        <main className="p-6 bg-gray-50 min-h-screen">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Prescribed Medication Records</h1>
                            <PrescribedRecordsTable records={medList} onDelete={(id) => setMedList(prev => prev.filter(r => r._id !== id))} />
                        </main>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Medication