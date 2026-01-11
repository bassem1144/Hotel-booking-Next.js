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

      <style jsx>{`
        .dashboard-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .loading {
          text-align: center;
          padding: 4rem;
        }
        .page-header {
          margin-bottom: 2rem;
        }
        .back-link {
          color: #8b5cf6;
          text-decoration: none;
          font-size: 0.875rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        .page-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
        }
        .empty-state {
          text-align: center;
          padding: 4rem;
          background: white;
          border-radius: 16px;
          color: #6b7280;
        }
        .bookings-list {
          display: grid;
          gap: 1rem;
        }
        .booking-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgb(0 0 0 / 0.05);
        }
        .booking-main h3 {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .email {
          color: #6b7280;
          font-size: 0.875rem;
        }
        .booking-details {
          text-align: right;
        }
        .hotel {
          font-weight: 500;
          color: #8b5cf6;
        }
        .dates, .guests {
          color: #6b7280;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
