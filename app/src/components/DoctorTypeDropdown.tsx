"use client";

import { useState } from "react";

export default function DoctorTypeDropdown() {
  const [doctorType, setDoctorType] = useState("");

  return (
    <div className="flex flex-col gap-4 text-white w-full max-w-sm">
      <h2 className="text-l font-bold">Select Doctor Type</h2>

      {/* First Dropdown */}
      <select
        className="p-1 rounded bg-white text-black border border-gray-300 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   w-48"
        value={doctorType}
        onChange={(e) => setDoctorType(e.target.value)}
      >
        <option value="" disabled>
          Choose a doctor
        </option>

        <option value="Psychiatrist">Psychiatrist</option>
        <option value="Neuro">Neuro Physician</option>
      </select>

      {/* Second Dropdown (only for Psychiatrist) */}
      {doctorType === "Psychiatrist" && (
        <div className="flex flex-col gap-2">
          <h2 className="text-l font-bold">Select Your Doctor</h2>

          <select
            className="p-1 rounded bg-white text-black border border-gray-300 shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       w-48"
            defaultValue=""
          >
            <option value="" disabled>
              Choose doctor
            </option>

            <option value="mridul">Dr. Mridul Deepanshu</option>
            <option value="kritika">Dr. Kritika Agarwal</option>
          </select>
        </div>
      )}

      {doctorType === "Neuro" && (
        <div className="flex flex-col gap-2">
          <h2 className="text-l font-bold">Select Your Doctor</h2>

          <select
            className="p-1 rounded bg-white text-black border border-gray-300 shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       w-48"
            defaultValue=""
          >
            <option value="" disabled>
              Choose doctor
            </option>
            <option value="mridul">Dr. Chaudhary Laxmi Narayanan</option>
            <option value="kritika">Dr. Deepshikha Kavya</option>
          </select>
        </div>
      )}
    </div>
  );
}
