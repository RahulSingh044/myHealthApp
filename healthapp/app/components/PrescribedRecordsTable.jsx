'use client';
import React from 'react';
import { SquarePen, Trash2 } from 'lucide-react'
import { deletePrescribedMedicationAction } from '../actions/recordsAction';
import toast from 'react-hot-toast';

const PrescribedRecordsTable = ({ records }) => {

    const handleDelete = async (id) => {
        try {
            const res = await deletePrescribedMedicationAction(id);
            if(res.success) {
                toast.success("Medication Deleted Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">S.no</th>
            <th className="py-3 px-4 text-left">Medication Name</th>
            <th className="py-3 px-4 text-left">Dosage</th>
            <th className="py-3 px-4 text-left">Frequency</th>
            <th className="py-3 px-4 text-left">Start Date</th>
            <th className="py-3 px-4 text-left">Prescribing Doctor</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {records && records.length > 0 ? (
            records.map((record, index) => (
              <tr
                key={record._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{record.medicationName}</td>
                <td className="py-3 px-4">{record.dosage}</td>
                <td className="py-3 px-4">{record.frequency}</td>
                <td className="py-3 px-4">{record.startDate}</td>
                <td className="py-3 px-4">{record.prescribingDoctor}</td>
                <td className="flex py-6 gap-3">
                    <SquarePen />
                    <Trash2 
                    onClick={() => handleDelete(record._id)}
                    className='text-red-500 cursor-pointer' />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-4 text-gray-500 italic"
              >
                No prescribed records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PrescribedRecordsTable;
