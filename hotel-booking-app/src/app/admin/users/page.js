"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      if (session.user.role !== "admin") {
        router.push("/");
      } else {
        fetchUsers();
      }
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users");
    }
    setLoading(false);
  };

  const changeRole = async (userId, newRole) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to update role");
    }
  };

  if (status === "loading" || loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <Link href="/admin" className="back-link">← Back to Admin</Link>
        <h1>User Management</h1>
      </div>

      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <div className="user-role">
              <select
                value={user.role}
                onChange={(e) => changeRole(user.id, e.target.value)}
                className="role-select"
              >
                <option value="user">User</option>
                <option value="partner">Partner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .admin-page { max-width: 1200px; margin: 0 auto; padding: 2rem; padding-top: 6rem; }
        .loading { text-align: center; padding: 4rem; }
        .page-header { margin-bottom: 2rem; }
        .back-link {
          color: #8b5cf6;
          text-decoration: none;
          font-size: 0.875rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        .page-header h1 { font-size: 1.75rem; font-weight: 700; }
        .users-list { display: grid; gap: 1rem; }
        .user-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgb(0 0 0 / 0.05);
        }
        .user-info h3 { font-weight: 600; margin-bottom: 0.25rem; }
        .user-info p { color: #6b7280; font-size: 0.875rem; }
        .role-select {
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          cursor: pointer;
        }
        .role-select:focus {
          outline: none;
          border-color: #8b5cf6;
        }
      `}</style>
    </div>
  );
}
