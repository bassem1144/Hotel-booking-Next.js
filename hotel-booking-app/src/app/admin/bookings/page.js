"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      if (session.user.role !== "admin") {
        router.push("/");
      } else {
        fetchBookings();
      }
    }
  }, [status, session, router]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
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
    <div className="admin-page">
      <div className="page-header">
        <Link href="/admin" className="back-link">← Back to Admin</Link>
        <h1>All Bookings</h1>
      </div>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-main">
              <h3>{booking.guestName}</h3>
              <p className="email">{booking.guestEmail}</p>
            </div>
            <div className="booking-hotel">
              <p>{booking.hotel?.name}</p>
            </div>
            <div className="booking-dates">
              <p>{booking.checkInDate} → {booking.checkOutDate}</p>
              <p className="guests">{booking.guests} guests</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
