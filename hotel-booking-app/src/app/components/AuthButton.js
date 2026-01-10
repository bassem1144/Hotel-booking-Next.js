"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  if (status === "loading") {
    return (
      <div style={{ 
        width: '80px', 
        height: '40px', 
        background: 'var(--bg-card)', 
        borderRadius: 'var(--radius-md)',
        animation: 'pulse 1.5s infinite'
      }} />
    );
  }

  if (session) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontWeight: '500',
          }}
        >
          <span style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.8rem',
            fontWeight: '600',
          }}>
            {session.user?.name?.charAt(0).toUpperCase() || 'U'}
          </span>
          {session.user?.name?.split(' ')[0] || 'User'}
          <span style={{ fontSize: '0.7rem' }}>▼</span>
        </button>

        {showDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            minWidth: '200px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 100,
            overflow: 'hidden',
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <p style={{ fontWeight: '600', marginBottom: '4px' }}>{session.user?.name}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{session.user?.email}</p>
            </div>
            <Link
              href="/bookings"
              onClick={() => setShowDropdown(false)}
              style={{
                display: 'block',
                padding: '12px 16px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              📋 My Bookings
            </Link>
            <button
              onClick={() => signOut()}
              style={{
                width: '100%',
                padding: '12px 16px',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ef4444',
                fontSize: '1rem',
                borderTop: '1px solid var(--border-color)',
              }}
            >
              🚪 Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Link
        href="/signin"
        className="btn btn-ghost"
        style={{ padding: '8px 16px' }}
      >
        Sign In
      </Link>
      <Link
        href="/register"
        className="btn btn-primary"
        style={{ padding: '8px 16px' }}
      >
        Sign Up
      </Link>
    </div>
  );
}
