"use client";

import { useSession } from "next-auth/react";
import BookingForm from "./BookingForm";

export default function BookingSection({ hotelId, price }) {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const isStaff = role === "admin" || role === "partner";

  if (isStaff) {
    return (
      <div style={{
        padding: '32px',
        textAlign: 'center',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
      }}>
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>
          {role === "admin" ? "👑" : "🤝"}
        </span>
        <h3 style={{ marginBottom: '8px' }}>
          {role === "admin" ? "Admin View" : "Partner View"}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {role === "admin" 
            ? "Admins cannot make bookings. Go to Admin Dashboard to manage the site."
            : "Partners cannot book hotels. Go to your Dashboard to manage your properties."
          }
        </p>
      </div>
    );
  }

  return (
    <>
      <div style={{ 
        display: 'flex', 
        alignItems: 'baseline', 
        gap: '8px', 
        marginBottom: '24px' 
      }}>
        <span style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ${price}
        </span>
        <span style={{ color: 'var(--text-muted)' }}>/ night</span>
      </div>

      <BookingForm hotelId={hotelId} />

      <div style={{ 
        marginTop: '20px', 
        padding: '16px', 
        background: 'var(--bg-card)', 
        borderRadius: 'var(--radius-md)',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          🔒 Secure booking • Free cancellation
        </p>
      </div>
    </>
  );
}
