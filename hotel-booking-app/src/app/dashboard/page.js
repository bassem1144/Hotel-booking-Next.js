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
    </div>
  );
}
