import { notFound } from "next/navigation";
import Link from "next/link";
import BookingForm from "../BookingForm";
import hotels from "../hotels";

export default async function HotelPage({ params }) {
  const resolvedParams = await params;
  const hotel = hotels.find((h) => h.id === resolvedParams.id);
  if (!hotel) return notFound();

  const amenities = [
    { icon: "🏊", name: "Pool" },
    { icon: "📶", name: "Free WiFi" },
    { icon: "🅿️", name: "Parking" },
    { icon: "🍳", name: "Breakfast" },
    { icon: "❄️", name: "AC" },
    { icon: "🏋️", name: "Gym" },
  ];

  return (
    <div className="page">
      {/* Hero Image Section */}
      <div style={{
        height: '400px',
        background: 'var(--gradient-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 'var(--nav-height)'
      }}>
        <span style={{ fontSize: '8rem', opacity: 0.3 }}>🏨</span>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(to top, var(--bg-primary), transparent)'
        }} />
      </div>

      {/* Content */}
      <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(0, 1fr) 400px', 
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Left Column - Hotel Info */}
          <div>
            <span className="badge badge-info" style={{ marginBottom: '16px' }}>
              📍 {hotel.location}
            </span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{hotel.name}</h1>
            
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ color: '#facc15', fontSize: '1.2rem' }}>★★★★★</span>
              <span style={{ color: 'var(--text-secondary)' }}>5.0 (128 reviews)</span>
            </div>

            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.1rem', 
              lineHeight: 1.8,
              marginBottom: '32px' 
            }}>
              {hotel.description} Experience world-class hospitality with stunning views, 
              exceptional dining, and personalized service. Our dedicated staff ensures 
              every moment of your stay is memorable.
            </p>

            {/* Amenities */}
            <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '20px' }}>Amenities</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '16px' 
              }}>
                {amenities.map((amenity, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    padding: '12px',
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>{amenity.icon}</span>
                    <span style={{ fontSize: '0.9rem' }}>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '20px' }}>Policies</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Check-in</span>
                  <span>3:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Check-out</span>
                  <span>11:00 AM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Cancellation</span>
                  <span style={{ color: '#4ade80' }}>Free up to 48h before</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="glass-card" style={{ 
            padding: '32px', 
            position: 'sticky', 
            top: 'calc(var(--nav-height) + 24px)' 
          }}>
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
                $199
              </span>
              <span style={{ color: 'var(--text-muted)' }}>/ night</span>
            </div>

            <BookingForm hotelId={hotel.id} />

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
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: '60px', paddingBottom: '60px' }}>
          <Link href="/" className="btn btn-ghost">
            ← Back to all hotels
          </Link>
        </div>
      </div>
    </div>
  );
}
