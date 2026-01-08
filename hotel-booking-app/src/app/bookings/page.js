"use client";

import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Bookings</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && bookings.length === 0 && (
        <p className="text-gray-600">No bookings yet.</p>
      )}
      <ul className="mt-4 space-y-4">
        {bookings.map((b) => (
          <li
            key={b.id}
            className="border border-gray-200 rounded p-4 bg-white"
          >
            <p className="font-semibold">Hotel: {b.hotelName}</p>
            <p>Name: {b.name}</p>
            <p>Email: {b.email}</p>
            <p>Check-in: {b.checkInDate}</p>
            <p>Check-out: {b.checkOutDate}</p>
            <p>Guests: {b.guests}</p>
            <p className="text-sm text-gray-500">
              Created: {new Date(b.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
