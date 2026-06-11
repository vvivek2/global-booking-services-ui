"use client";

import { useState } from "react";

export default function BusinessRegisterPage() {
  const [mode, setMode] = useState<"individual" | "company" | "">("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    businessType: "Healthcare",
    clinicName: "",
    title: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) =>
    /^[0-9]{0,10}$/.test(phone); // allow typing but max 10 digits

  const validatePassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/.test(password);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // live validation
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email format",
      }));
    }

    if (name === "phone") {
      if (value.length <= 10 && /^[0-9]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: value.length === 10 ? "" : "Phone must be 10 digits",
        }));
      } else {
        return; // block extra digits
      }
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Min 6 chars, 1 uppercase, 1 special character",
      }));
    }

    setForm({ ...form, [name]: value });
  };

  const sendOtp = async () => {
    if (mode === "company") {
      alert("Company registration coming soon");
      return;
    }

    // block if validation fails
    if (errors.email || errors.phone || errors.password) return;

    const res = await fetch("/api/business/send-otp", {
      method: "POST",
      body: JSON.stringify({ email: form.email }),
    });

    if (res.ok) setOtpSent(true);
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/business/verify-otp", {
      method: "POST",
      body: JSON.stringify({ ...form, otp }),
    });

    if (res.ok) {
      alert("Business Registered Successfully");
      window.location.assign("/business/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">Business Registration</h2>

        {/* Radio Buttons */}
        <div className="mb-4">
          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="mode"
              value="individual"
              checked={mode === "individual"}
              onChange={() => setMode("individual")}
            />
            Register as Individual
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="company"
              checked={mode === "company"}
              onChange={() => setMode("company")}
            />
            Register as Company
          </label>
        </div>

        {mode === "" && (
          <p className="text-sm text-gray-600 mb-4">
            Please select an option to continue
          </p>
        )}

        {/* Company Mode */}
        {mode === "company" && !otpSent && (
          <div className="text-red-600 font-semibold mb-4">
            Company registration coming soon
          </div>
        )}

        {/* Individual Mode */}
        {mode === "individual" && !otpSent && (
          <>
            <select
              name="businessType"
              className="w-full p-2 border rounded mb-3"
              value="Healthcare"
              disabled
            >
              <option value="Healthcare">Healthcare</option>
            </select>

            <input
              name="clinicName"
              placeholder="Clinic Name (optional)"
              className="w-full p-2 border rounded mb-3"
              onChange={handleChange}
            />
            <select
              name="title"
              className="w-full p-2 border rounded mb-3"
              onChange={handleChange}
            >
              <option value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Miss">Miss</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Dr">Dr</option>
            </select>


            <input
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border rounded mb-3"
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Business Email"
              className="w-full p-2 border rounded mb-3"
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mb-2">{errors.email}</p>
            )}

            <input
              name="phone"
              placeholder="Phone Number"
              className="w-full p-2 border rounded mb-3"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mb-2">{errors.phone}</p>
            )}

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-3"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mb-2">{errors.password}</p>
            )}

            <input
              name="address"
              placeholder="Address"
              className="w-full p-2 border rounded mb-3"
              onChange={handleChange}
            />

            <button
              onClick={sendOtp}
              disabled={
                !!errors.email ||
                !!errors.phone ||
                !!errors.password ||
                !form.email ||
                !form.phone ||
                !form.password
              }
              className="w-full bg-blue-600 text-white p-2 rounded mt-2 disabled:bg-gray-400"
            >
              Send OTP
            </button>
          </>
        )}

        {/* OTP Screen */}
        {otpSent && (
          <>
            <input
              placeholder="Enter OTP"
              className="w-full p-2 border rounded mb-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white p-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
