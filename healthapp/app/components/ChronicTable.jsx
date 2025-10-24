'use client';
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteChronic } from "../actions/userAction";

export default function ChronicTable({chronic, refreshUser}) { 

    const [loading, setLoading] = useState(false);

      const handleDelete = async(id) => {
        try {
            setLoading(true);
            const res = await deleteChronic(id);
            if(res.success) {
                toast.success("Successfully Deleted")
                await refreshUser()
            }
        } catch (error) {
            consol.log(error)
            toast.error("Unable to delete")
        } finally {
            setLoading(false);
        }
      };

    return (
        <div className="overflow-x-auto mt-2">
            <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
                <thead className="bg-blue-500/80 text-white">
                    <tr>
                        <th className="py-3 px-4 text-center">Name</th>
                        <th className="py-3 px-4 text-center">Date</th>
                        <th className="py-3 px-4 text-center">Notes</th>
                        <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        chronic.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b hover:bg-gray-100 transition text-center"
                            >
                                <td className="py-3 px-4">{item.conditionName}</td>
                                <td className="py-3 px-4">{item.date}</td>
                                <td className="py-3 px-4">{item.notes}</td>
                                <td className="flex justify-center py-6 gap-3">
                                    <Trash2
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-500 cursor-pointer hover:text-red-700 transition"
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
