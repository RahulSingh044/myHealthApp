"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function EmergencyAccessPage() {
  const { accessKey } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profile/emergency-access/${accessKey}`
        );
        if (res.data.success) {
          console.log("res", res.data.data)
          setData(res.data.data);
        }

        if (!res.data.success) throw new Error(res.data.message); // Corrected to use 'res.data.message'
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessKey) fetchEmergencyData();
  }, [accessKey]);

  // --- State Components ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-12 h-12 border-4 border-t-4 border-t-teal-500 border-gray-200 rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold text-teal-600">
          Loading critical medical data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 p-4">
        <div className="p-8 bg-white rounded-xl shadow-lg border-l-4 border-red-600">
          <p className="text-2xl font-bold text-red-700 mb-2">🚨 Access Error</p>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-xl text-gray-600">
          No emergency data found for this key.
        </p>
      </div>
    );
  }
  // --- End State Components ---

  const { personalInfo, allergies, chronicConditions, emergencyContact, currentMedications } = data;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 font-inter">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-10 space-y-8 border-t-8 border-teal-500">
        <h1 className="text-4xl font-extrabold text-teal-700 text-center tracking-tight">
          🏥 Emergency Medical Information
        </h1>
        <p className="text-center text-gray-500 text-sm">
          This information is provided for emergency responders. Please use with caution.
        </p>

        {/* Personal Info & Core Data */}
        <section className="space-y-4 p-5 bg-teal-50 rounded-xl shadow-inner border border-teal-200">
          <h2 className="text-2xl font-bold text-teal-700 border-b pb-2 mb-2 border-teal-300">
            👤 Personal Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-700 p-2 bg-white rounded-lg shadow-sm">
              <span className="font-semibold text-gray-900 block text-sm">Name:</span>
              <span className="font-extrabold text-lg">{personalInfo.fullName}</span>
            </p>
            <p className="text-gray-700 p-2 bg-white rounded-lg shadow-sm">
              <span className="font-semibold text-gray-900 block text-sm">Gender:</span>
              <span className="font-medium">{personalInfo.gender}</span>
            </p>
            <p className="text-gray-700 p-2 bg-white rounded-lg shadow-sm">
              <span className="font-semibold text-gray-900 block text-sm">Mobile:</span>
              <span className="font-medium">{personalInfo.phone}</span>
            </p>
            <p className="text-gray-700 p-2 bg-red-100 rounded-lg shadow-md border border-red-300">
              <span className="font-bold text-red-800 block text-sm">🩸 Blood Group:</span>
              <span className="font-extrabold text-2xl text-red-700">{personalInfo.bloodGroup || "N/A"}</span>
            </p>
          </div>
        </section>

        {/* Medical Alerts (Allergies and Conditions) */}
        <section className="space-y-4 p-5 bg-red-50 rounded-xl shadow-md border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-700 border-b pb-2 mb-2 border-red-300">
            ⚠️ Critical Alerts
          </h2>
          <div className="space-y-3">
            {/* Allergies */}
            <div>
              <span className="font-bold text-gray-900 block mb-1">Allergies:</span>
              <p className="text-gray-800 bg-white p-3 rounded-lg shadow-sm border border-red-200">
                {allergies?.length
                  ? allergies.map(a => <span key={a.name} className="inline-block bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-1">{`${a.name} (${a.reaction})`}</span>)
                  : <span className="text-green-600 font-semibold">None reported.</span>}
              </p>
            </div>
            {/* Chronic Conditions */}
            <div>
              <span className="font-bold text-gray-900 block mb-1">Chronic Conditions:</span>
              <p className="text-gray-800 bg-white p-3 rounded-lg shadow-sm border border-teal-200">
                {chronicConditions?.length
                  ? chronicConditions.map(a => <span key={a.conditionName} className="inline-block bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-1">{a.conditionName}</span>)
                  : <span className="text-green-600 font-semibold">None reported.</span>}
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="space-y-4 p-5 bg-blue-50 rounded-xl shadow-md border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-700 border-b pb-2 mb-2 border-blue-300">
            📞 Emergency Contact
          </h2>
          {emergencyContact ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-gray-700 p-2 bg-white rounded-lg shadow-sm">
                <span className="font-semibold text-gray-900 block text-sm">Contact Name:</span>
                <span className="font-medium">{emergencyContact.contactName || "N/A"}</span>
              </p>
              <p className="text-gray-700 p-2 bg-white rounded-lg shadow-sm">
                <span className="font-semibold text-gray-900 block text-sm">Contact Phone:</span>
                <a
                  href={`tel:${emergencyContact.phone}`}
                  // Use 'contactNumber' if 'phone' is unavailable, falling back to N/A for display
                  className="text-blue-600 font-bold hover:underline transition-colors duration-200"
                >
                  {emergencyContact.contactNumber || emergencyContact.phone || "N/A"}
                </a>
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic p-3">No emergency contact information available.</p>
          )}
        </section>

        {/* Medications & Records Links */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">📄 Additional Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/medication"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 flex flex-col items-center justify-center bg-teal-600 text-white rounded-xl shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-teal-300"
            >
              <h3 className="text-xl font-bold">Current Medications</h3>
              <span className="text-xs mt-1 opacity-90">Click to view full medication list and history.</span>
            </Link>

            <Link
              href="/records"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 flex flex-col items-center justify-center bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-300"
            >
              <h3 className="text-xl font-bold">Medical Records</h3>
              <span className="text-xs mt-1 opacity-90">Click to view comprehensive medical history.</span>
            </Link>
          </div>
        </section>

        <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-100">
          Last updated securely via <span className="font-semibold text-teal-500">MediLink</span> © 2025
        </div>
      </div>
    </div>
  );
}