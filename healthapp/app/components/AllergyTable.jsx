'use client';
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteAllergy } from "../actions/userAction";

export default function AllergyTable({allergies, refreshUser}) { 

    const [loading, setLoading] = useState(false);

      const handleDelete = async(id) => {
        try {
            setLoading(true);
            const res = await deleteAllergy(id);
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
                <thead className="bg-red-500 text-white">
                    <tr>
                        <th className="py-3 px-4 text-center">S.no</th>
                        <th className="py-3 px-4 text-center">Allergy Name</th>
                        <th className="py-3 px-4 text-center">Reaction</th>
                        <th className="py-3 px-4 text-center">Type</th>
                        <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allergies.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b hover:bg-gray-100 transition text-center"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{item.name}</td>
                                <td className="py-3 px-4">{item.reaction}</td>
                                <td className="py-3 px-4">{item.type}</td>
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
