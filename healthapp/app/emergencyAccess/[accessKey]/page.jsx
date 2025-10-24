"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EmergencyAccessPage() {
  const { accessKey } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile/emergency-access/${accessKey}`
        );
        const result = await res.json();

        if (!result.success) throw new Error(result.message);
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessKey) fetchEmergencyData();
  }, [accessKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-teal-600 text-xl font-semibold">
        Loading emergency data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        No emergency data found.
      </div>
    );
  }

  const { bloodGroup, allergies, chronicConditions, emergencyContact, currentMedications } = data;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8 space-y-6 border border-gray-100">
        <h1 className="text-3xl font-bold text-teal-700 text-center">
          🏥 Emergency Medical Information
        </h1>

        {/* Personal Info */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Personal Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p className="text-gray-600">
              <span className="font-medium">Blood Group:</span>{" "}
              <span className="text-red-600">{bloodGroup || "N/A"}</span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Allergies:</span>{" "}
              {allergies?.length ? allergies.join(", ") : "None"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Chronic Conditions:</span>{" "}
              {chronicConditions?.length ? chronicConditions.join(", ") : "None"}
            </p>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Emergency Contact</h2>
          {emergencyContact ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> {emergencyContact.name || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span>{" "}
                <a
                  href={`tel:${emergencyContact.phone}`}
                  className="text-teal-600 hover:underline"
                >
                  {emergencyContact.phone || "N/A"}
                </a>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Relation:</span>{" "}
                {emergencyContact.relation || "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No emergency contact information available.</p>
          )}
        </section>

        {/* Medications */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Current Medications</h2>
          {currentMedications?.length ? (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Medication Name</th>
                    <th className="py-3 px-4">Dosage</th>
                    <th className="py-3 px-4">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMedications.map((med, idx) => (
                    <tr
                      key={idx}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-2 px-4">{idx + 1}</td>
                      <td className="py-2 px-4">{med.medicationName || "N/A"}</td>
                      <td className="py-2 px-4">{med.dosage || "N/A"}</td>
                      <td className="py-2 px-4">{med.frequency || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No medications currently prescribed.</p>
          )}
        </section>

        <div className="text-center text-sm text-gray-400 pt-4">
          Last updated securely via HealthHistory System © 2025
        </div>
      </div>
    </div>
  );
}
