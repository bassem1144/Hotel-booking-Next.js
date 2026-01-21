"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardHotelsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      if (session.user.role !== "partner" && session.user.role !== "admin") {
        router.push("/");
      } else {
        fetchHotels();
      }
    }
  }, [status, session, router]);

  const fetchHotels = async () => {
    try {
      const res = await fetch("/api/dashboard/hotels");
      if (res.ok) {
        const data = await res.json();
        setHotels(data);
      }
    } catch (error) {
      console.error("Failed to fetch hotels");
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
          <h1>My Hotels</h1>
        </div>
        <button className="btn-primary" onClick={() => router.push("/dashboard/hotels/new")}>
          + Add Hotel
        </button>
      </div>

      {hotels.length === 0 ? (
        <div className="empty-state">
          <p>You don't have any hotels yet.</p>
          <button className="btn-primary" onClick={() => router.push("/dashboard/hotels/new")}>
            Add Your First Hotel
          </button>
        </div>
      ) : (
        <div className="hotels-list">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-list-card">
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p className="location">{hotel.location}</p>
                <p className="price">${hotel.price}/night</p>
                <p className="bookings">{hotel.bookings?.length || 0} bookings</p>
              </div>
              <div className="hotel-actions">
                <Link href={`/dashboard/hotels/${hotel.id}`} className="btn-edit">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
