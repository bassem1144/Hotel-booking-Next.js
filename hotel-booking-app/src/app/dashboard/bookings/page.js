"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      if (session.user.role !== "partner" && session.user.role !== "admin") {
        router.push("/");
      } else {
        fetchBookings();
      }
    }
  }, [status, session, router]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/dashboard/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings");
    }
    setLoading(false);
  };

  if (status === "loading" || loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <Link href="/dashboard" className="back-link">← Back to Dashboard</Link>
          <h1>Reservations</h1>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>No bookings yet.</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-main">
                <h3>{booking.guestName}</h3>
                <p className="email">{booking.guestEmail}</p>
              </div>
              <div className="booking-details">
                <p className="hotel">{booking.hotel?.name}</p>
                <p className="dates">
                  {booking.checkInDate} → {booking.checkOutDate}
                </p>
                <p className="guests">{booking.guests} guests</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
