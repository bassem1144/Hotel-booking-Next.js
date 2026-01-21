"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminHotelsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      if (session.user.role !== "admin") {
        router.push("/");
      } else {
        fetchHotels();
      }
    }
  }, [status, session, router]);

  const fetchHotels = async () => {
    try {
      const res = await fetch("/api/admin/hotels");
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
    <div className="admin-page">
      <div className="page-header">
        <Link href="/admin" className="back-link">← Back to Admin</Link>
        <h1>All Hotels</h1>
      </div>

      <div className="hotels-list">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-list-card">
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p className="location">{hotel.location}</p>
              <p className="price">${hotel.price}/night</p>
            </div>
            <div className="hotel-meta">
              <p className="owner">{hotel.owner?.name || "No owner"}</p>
              <p className="bookings">{hotel.bookings?.length || 0} bookings</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
