"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const isAdmin = role === "admin";
  const isPartner = role === "partner";
  const isStaff = isAdmin || isPartner;

  return (
    <nav className={`nav ${isAdmin ? 'nav-admin' : ''} ${isPartner ? 'nav-partner' : ''}`}>
      <div className="nav-container">
        <Link href={isAdmin ? "/admin" : isPartner ? "/dashboard" : "/"} className="nav-logo">
          NextStay {isAdmin && <span className="role-badge admin">Admin</span>}
          {isPartner && <span className="role-badge partner">Partner</span>}
        </Link>
        <div className="nav-links">
          {isAdmin ? (
            <>
              <Link href="/admin" className="nav-link">Dashboard</Link>
              <Link href="/admin/users" className="nav-link">Users</Link>
              <Link href="/admin/hotels" className="nav-link">Hotels</Link>
              <Link href="/admin/bookings" className="nav-link">Bookings</Link>
            </>
          ) : isPartner ? (
            <>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/dashboard/hotels" className="nav-link">My Hotels</Link>
              <Link href="/dashboard/bookings" className="nav-link">Reservations</Link>
            </>
          ) : (
            <>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/about" className="nav-link">About</Link>
              {session && (
                <Link href="/bookings" className="nav-link">My Bookings</Link>
              )}
            </>
          )}
          <div style={{ marginLeft: '8px' }}>
            <AuthButton />
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-admin {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
          border-bottom: 2px solid #6366f1 !important;
        }
        .nav-partner {
          background: linear-gradient(135deg, #1e3a5f 0%, #0c2340 100%) !important;
          border-bottom: 2px solid #8b5cf6 !important;
        }
        .role-badge {
          font-size: 0.65rem;
          padding: 2px 8px;
          border-radius: 12px;
          margin-left: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .role-badge.admin {
          background: #ef4444;
          color: white;
        }
        .role-badge.partner {
          background: #8b5cf6;
          color: white;
        }
      `}</style>
    </nav>
  );
}
