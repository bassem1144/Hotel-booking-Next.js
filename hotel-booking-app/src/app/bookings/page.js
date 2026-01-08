"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ marginBottom: '12px' }}>
            My <span className="text-gradient">Bookings</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            View and manage your hotel reservations
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ display: 'grid', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: '180px' }} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="glass-card" style={{ 
            padding: '32px', 
            textAlign: 'center',
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)'
          }}>
            <span style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}>😔</span>
            <h3 style={{ marginBottom: '8px', color: '#f87171' }}>Failed to load bookings</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && bookings.length === 0 && (
          <div className="glass-card" style={{ 
            padding: '60px 32px', 
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <span style={{ fontSize: '4rem', marginBottom: '24px', display: 'block' }}>🏨</span>
            <h3 style={{ marginBottom: '12px' }}>No bookings yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Start exploring our hotels and book your perfect getaway!
            </p>
            <Link href="/" className="btn btn-primary">
              Browse Hotels
            </Link>
          </div>
        )}

        {/* Bookings List */}
        {!loading && !error && bookings.length > 0 && (
          <div className="stagger-children" style={{ display: 'grid', gap: '20px' }}>
            {bookings.map((b) => (
              <article key={b.id} className="glass-card" style={{ 
                padding: '0',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
              }}>
                {/* Image placeholder */}
                <div style={{ 
                  background: 'var(--gradient-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '3rem', opacity: 0.5 }}>🏨</span>
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <h3 style={{ marginBottom: '4px' }}>{b.hotelName}</h3>
                      <span className="badge badge-success">Confirmed</span>
                    </div>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--text-muted)' 
                    }}>
                      Booked {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                    padding: '16px',
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <div>
                      <span style={{ 
                        display: 'block', 
                        fontSize: '0.75rem', 
                        color: 'var(--text-muted)',
                        marginBottom: '4px'
                      }}>Guest</span>
                      <span style={{ fontSize: '0.9rem' }}>{b.name}</span>
                    </div>
                    <div>
                      <span style={{ 
                        display: 'block', 
                        fontSize: '0.75rem', 
                        color: 'var(--text-muted)',
                        marginBottom: '4px'
                      }}>Check-in</span>
                      <span style={{ fontSize: '0.9rem' }}>{b.checkInDate}</span>
                    </div>
                    <div>
                      <span style={{ 
                        display: 'block', 
                        fontSize: '0.75rem', 
                        color: 'var(--text-muted)',
                        marginBottom: '4px'
                      }}>Check-out</span>
                      <span style={{ fontSize: '0.9rem' }}>{b.checkOutDate}</span>
                    </div>
                    <div>
                      <span style={{ 
                        display: 'block', 
                        fontSize: '0.75rem', 
                        color: 'var(--text-muted)',
                        marginBottom: '4px'
                      }}>Guests</span>
                      <span style={{ fontSize: '0.9rem' }}>{b.guests} {b.guests === 1 ? 'guest' : 'guests'}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
