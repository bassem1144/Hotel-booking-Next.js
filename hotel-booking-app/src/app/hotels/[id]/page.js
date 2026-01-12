import { notFound } from "next/navigation";
import Link from "next/link";
import BookingSection from "../BookingSection";
import prisma from "@/lib/prisma";

async function getHotel(id) {
  const hotel = await prisma.hotel.findUnique({
    where: { id },
  });
  return hotel;
}

export default async function HotelPage({ params }) {
  const resolvedParams = await params;
  const hotel = await getHotel(resolvedParams.id);
  
  if (!hotel) return notFound();

  // Parse amenities from comma-separated string
  const amenityIcons = {
    Pool: "🏊",
    WiFi: "📶",
    Parking: "🅿️",
    Breakfast: "🍳",
    AC: "❄️",
    Gym: "🏋️",
    Spa: "💆",
    "Beach Access": "🏖️",
    Fireplace: "🔥",
    "Ski Storage": "🎿",
    "Hot Tub": "🛁",
    Restaurant: "🍽️",
    "Room Service": "🛎️",
    Concierge: "👨‍💼",
    Bar: "🍸",
    "Private Villa": "🏡",
    "Butler Service": "🎩",
    "Golf Course": "⛳",
    "Private Beach": "🏝️",
  };

  const amenities = hotel.amenities.split(",").map((a) => ({
    name: a.trim(),
    icon: amenityIcons[a.trim()] || "✨",
  }));

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
              <span style={{ color: '#facc15', fontSize: '1.2rem' }}>
                {"★".repeat(Math.floor(hotel.rating))}
                {hotel.rating % 1 >= 0.5 ? "½" : ""}
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>{hotel.rating} (128 reviews)</span>
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
                {amenities.slice(0, 6).map((amenity, i) => (
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
                  <span style={{ color: '#16a34a' }}>Free up to 48h before</span>
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
            <BookingSection hotelId={hotel.id} price={hotel.price} />
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
