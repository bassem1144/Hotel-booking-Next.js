"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          NextStay
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          {session && (
            <Link href="/bookings" className="nav-link">
              My Bookings
            </Link>
          )}
          <div style={{ marginLeft: '8px' }}>
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
