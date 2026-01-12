"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ users: 0, hotels: 0, bookings: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      if (session.user.role !== "admin") {
        router.push("/");
      } else {
        fetchStats();
      }
    }
  }, [status, session, router]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
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
    return <div className="loading">Loading...</div>;
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Site-wide management</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.users}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏨</div>
          <div className="stat-info">
            <h3>{stats.hotels}</h3>
            <p>Hotels</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.bookings}</h3>
            <p>Bookings</p>
          </div>
        </div>
      </div>

      <div className="admin-nav">
        <Link href="/admin/users" className="admin-link">
          <span>👥</span>
          <div>
            <h3>Users</h3>
            <p>Manage users and roles</p>
          </div>
        </Link>
        <Link href="/admin/hotels" className="admin-link">
          <span>🏨</span>
          <div>
            <h3>Hotels</h3>
            <p>View all hotels</p>
          </div>
        </Link>
        <Link href="/admin/bookings" className="admin-link">
          <span>📋</span>
          <div>
            <h3>Bookings</h3>
            <p>View all reservations</p>
          </div>
        </Link>
      </div>

      <style jsx>{`
        .admin { max-width: 1200px; margin: 0 auto; padding: 2rem; padding-top: 6rem; }
        .loading { text-align: center; padding: 4rem; }
        .admin-header { margin-bottom: 2rem; }
        .admin-header h1 { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; }
        .admin-header p { color: #6b7280; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
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
        .stat-icon { font-size: 2rem; }
        .stat-info h3 { font-size: 1.5rem; font-weight: 700; }
        .stat-info p { color: #6b7280; font-size: 0.875rem; }
        .admin-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }
        .admin-link {
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
        .admin-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
        .admin-link span { font-size: 2rem; }
        .admin-link h3 { font-weight: 600; margin-bottom: 0.25rem; }
        .admin-link p { color: #6b7280; font-size: 0.875rem; }
      `}</style>
    </div>
  );
}
