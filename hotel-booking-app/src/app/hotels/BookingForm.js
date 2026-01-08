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
    setStatus({ loading: true, message: "", error: false });

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
        message: "Booking confirmed! Check your email for details.",
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Name Field */}
      <div>
        <label className="label">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
          className="input"
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="label">Email</label>
        <input
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
          className="input"
        />
      </div>

      {/* Date Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label className="label">Check-in</label>
          <input
            type="date"
            value={form.checkInDate}
            onChange={(e) => update("checkInDate", e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Check-out</label>
          <input
            type="date"
            value={form.checkOutDate}
            onChange={(e) => update("checkOutDate", e.target.value)}
            required
            className="input"
          />
        </div>
      </div>

      {/* Guests Field */}
      <div>
        <label className="label">Guests</label>
        <input
          type="number"
          min={1}
          max={10}
          value={form.guests}
          onChange={(e) => update("guests", e.target.value)}
          required
          className="input"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status.loading}
        className="btn btn-primary"
        style={{ 
          width: '100%', 
          padding: '16px',
          marginTop: '8px',
          opacity: status.loading ? 0.7 : 1,
          cursor: status.loading ? 'not-allowed' : 'pointer'
        }}
      >
        {status.loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              width: '16px', 
              height: '16px', 
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: 'white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Processing...
          </span>
        ) : (
          "Book Now"
        )}
      </button>

      {/* Status Message */}
      {status.message && (
        <div style={{
          padding: '14px 16px',
          borderRadius: 'var(--radius-md)',
          background: status.error 
            ? 'rgba(239, 68, 68, 0.15)' 
            : 'rgba(34, 197, 94, 0.15)',
          border: `1px solid ${status.error ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
          color: status.error ? '#f87171' : '#4ade80',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>{status.error ? '❌' : '✓'}</span>
          {status.message}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
