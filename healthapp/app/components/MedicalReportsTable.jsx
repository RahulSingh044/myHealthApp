'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteMedicalRecords } from '../actions/recordsAction';

export default function MedicalRecordsTable({ data,  refreshRecords}) {

    const [selectedImage, setSelectedImage] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async (id) => {
        try {
            setDeleting(true);
            const res = await deleteMedicalRecords(id);
            if (res.success) {
                toast.success("Deleted Successfully");
                refreshRecords();
            }
        } catch (error) {
            toast.error("Unable to delete")
            console.log(error);
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="p-6">
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-teal-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Record Type</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((record, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{record.title}</td>
                                <td className="py-3 px-4 capitalize">{record.recordType.replace('_', ' ')}</td>
                                <td className="py-3 px-4">{record.date}</td>
                                <td className="py-3 px-4">{record.description}</td>
                                <td className="py-3 px-4">
                                    <div className="relative w-32 h-20 overflow-hidden rounded-lg border border-gray-200">
                                        {/* half image preview */}
                                        {record?.imageUrl && (
                                            <Image
                                                src={record.imageUrl}
                                                alt={record.title}
                                                fill
                                                className="object-cover object-top"
                                            />
                                        )}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className='flex justify-center gap-4'>
                                        <button
                                            onClick={() => setSelectedImage(record?.imageUrl)}
                                            className="mt-2 text-sm cursor-pointer text-teal-600  hover:underline"
                                        >
                                            <Eye />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(record._id)}
                                            className="mt-2 text-sm cursor-pointer hover:underline text-red-600"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-3xl">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 text-gray-700 hover:text-black"
                        >
                            <X size={20} />
                        </button>
                        {selectedImage && (
                            <Image
                                src={selectedImage}
                                alt="Full Preview"
                                width={800}
                                height={500}
                                className="rounded-lg"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
