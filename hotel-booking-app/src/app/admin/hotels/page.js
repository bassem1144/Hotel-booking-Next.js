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
          <div key={hotel.id} className="hotel-card">
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

      <style jsx>{`
        .admin-page { max-width: 1200px; margin: 0 auto; padding: 2rem; padding-top: 6rem; }
        .loading { text-align: center; padding: 4rem; }
        .page-header { margin-bottom: 2rem; }
        .back-link { color: #8b5cf6; text-decoration: none; font-size: 0.875rem; display: block; margin-bottom: 0.5rem; }
        .page-header h1 { font-size: 1.75rem; font-weight: 700; }
        .hotels-list { display: grid; gap: 1rem; }
        .hotel-card {
          background: white; border-radius: 12px; padding: 1.5rem;
          display: flex; justify-content: space-between; align-items: center;
          box-shadow: 0 2px 4px rgb(0 0 0 / 0.05);
        }
        .hotel-info h3 { font-weight: 600; margin-bottom: 0.25rem; }
        .location { color: #6b7280; font-size: 0.875rem; }
        .price { color: #8b5cf6; font-weight: 600; }
        .hotel-meta { text-align: right; }
        .owner { font-size: 0.875rem; color: #374151; }
        .bookings { font-size: 0.75rem; color: #6b7280; }
      `}</style>
    </div>
  );
}
