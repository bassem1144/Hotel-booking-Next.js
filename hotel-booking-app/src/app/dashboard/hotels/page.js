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
        <div className="hotels-grid">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
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

      <style jsx>{`
        .dashboard-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          padding-top: 6rem;
        }
        .loading {
          text-align: center;
          padding: 4rem;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
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
        .btn-primary {
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }
        .empty-state {
          text-align: center;
          padding: 4rem;
          background: white;
          border-radius: 16px;
        }
        .empty-state p {
          margin-bottom: 1rem;
          color: #6b7280;
        }
        .hotels-grid {
          display: grid;
          gap: 1rem;
        }
        .hotel-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgb(0 0 0 / 0.05);
        }
        .hotel-info h3 {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .location, .bookings {
          color: #6b7280;
          font-size: 0.875rem;
        }
        .price {
          color: #8b5cf6;
          font-weight: 600;
        }
        .btn-edit {
          padding: 0.5rem 1rem;
          background: #f3f4f6;
          border-radius: 6px;
          text-decoration: none;
          color: #374151;
          font-size: 0.875rem;
        }
        .btn-edit:hover {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
}
