"use client";

import { useState } from "react";

export default function BookingForm({ hotelId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, message: "Submitting...", error: false });

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, hotelId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      setStatus({
        loading: false,
        message: "Booking confirmed!",
        error: false,
      });
      setForm({
        name: "",
        email: "",
        checkInDate: "",
        checkOutDate: "",
        guests: 1,
      });
    } catch (err) {
      setStatus({
        loading: false,
        message: err.message || "Something went wrong",
        error: true,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">Name</label>
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
          className="p-2 rounded border border-gray-300"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
          className="p-2 rounded border border-gray-300"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Check-in</label>
          <input
            type="date"
            value={form.checkInDate}
            onChange={(e) => update("checkInDate", e.target.value)}
            required
            className="p-2 rounded border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Check-out</label>
          <input
            type="date"
            value={form.checkOutDate}
            onChange={(e) => update("checkOutDate", e.target.value)}
            required
            className="p-2 rounded border border-gray-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">Guests</label>
        <input
          type="number"
          min={1}
          value={form.guests}
          onChange={(e) => update("guests", e.target.value)}
          required
          className="p-2 rounded border border-gray-300"
        />
      </div>
      <button
        type="submit"
        disabled={status.loading}
        className="p-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
      >
        {status.loading ? "Booking..." : "Book Now"}
      </button>
      {status.message && (
        <p className={status.error ? "text-red-600" : "text-green-700"}>
          {status.message}
        </p>
      )}
    </form>
  );
}
