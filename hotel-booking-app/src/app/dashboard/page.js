"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ hotels: 0, bookings: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      if (session.user.role !== "partner" && session.user.role !== "admin") {
        router.push("/");
      } else {
        fetchStats();
      }
    }
  }, [status, session, router]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats");
    }
    setLoading(false);
  };

  if (status === "loading" || loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!session || (session.user.role !== "partner" && session.user.role !== "admin")) {
    return null;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Partner Dashboard</h1>
        <p>Welcome back, {session.user.name}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏨</div>
          <div className="stat-info">
            <h3>{stats.hotels}</h3>
            <p>My Hotels</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.bookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${stats.revenue.toLocaleString()}</h3>
            <p>Revenue</p>
          </div>
        </div>
      </div>

      <div className="dashboard-nav">
        <Link href="/dashboard/hotels" className="dashboard-link">
          <span>🏨</span>
          <div>
            <h3>My Hotels</h3>
            <p>Manage your properties</p>
          </div>
        </Link>
        <Link href="/dashboard/bookings" className="dashboard-link">
          <span>📋</span>
          <div>
            <h3>Reservations</h3>
            <p>View guest bookings</p>
          </div>
        </Link>
      </div>

      <style jsx>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .dashboard-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          gap: 1rem;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5e7eb;
          border-top-color: #8b5cf6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .dashboard-header {
          margin-bottom: 2rem;
        }
        .dashboard-header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .dashboard-header p {
          color: #6b7280;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .stat-icon {
          font-size: 2rem;
        }
        .stat-info h3 {
          font-size: 1.5rem;
          font-weight: 700;
        }
        .stat-info p {
          color: #6b7280;
          font-size: 0.875rem;
        }
        .dashboard-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }
        .dashboard-link {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .dashboard-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
        .dashboard-link span {
          font-size: 2rem;
        }
        .dashboard-link h3 {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .dashboard-link p {
          color: #6b7280;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
