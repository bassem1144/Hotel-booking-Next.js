import Link from "next/link";
import hotels from "./hotels/hotels";

export default function Home() {
  return (
    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">
            Find Your Perfect <span className="text-gradient">Escape</span>
          </h1>
          <p className="hero-subtitle">
            Discover handpicked luxury hotels and resorts worldwide. 
            Book your dream getaway with exclusive deals and premium service.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#hotels" className="btn btn-primary">
              Explore Hotels
            </a>
            <Link href="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section id="hotels" style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px' }}>
              Featured <span className="text-gradient">Hotels</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              Explore our curated selection of premium accommodations
            </p>
          </div>
          
          <div className="hotels-grid stagger-children">
            {hotels.map((hotel) => (
              <article key={hotel.id} className="hotel-card">
                <div className="hotel-card-image">
                  {/* Gradient placeholder with emoji - replace with real images later */}
                </div>
                <div className="hotel-card-content">
                  <span className="hotel-card-location">
                    📍 {hotel.location}
                  </span>
                  <h3 className="hotel-card-name">{hotel.name}</h3>
                  <p className="hotel-card-description">{hotel.description}</p>
                  <div className="hotel-card-footer">
                    <div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>From</span>
                      <span style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700', 
                        marginLeft: '8px',
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        $199
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/night</span>
                    </div>
                    <Link href={`/hotels/${hotel.id}`} className="btn btn-primary" style={{ padding: '10px 20px' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ marginBottom: '16px' }}>
              Why Choose <span className="text-gradient">NextStay</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              We make booking your dream vacation effortless
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {[
              { icon: '✨', title: 'Premium Selection', desc: 'Hand-picked luxury hotels vetted for quality' },
              { icon: '💰', title: 'Best Price Guarantee', desc: 'We match any lower price you find' },
              { icon: '🛡️', title: 'Secure Booking', desc: 'Your payments and data are always protected' },
              { icon: '🎯', title: 'Instant Confirmation', desc: 'Get your booking confirmed in seconds' },
              { icon: '💬', title: '24/7 Support', desc: 'Our team is here to help anytime' },
              { icon: '🎁', title: 'Loyalty Rewards', desc: 'Earn points on every booking' },
            ].map((feature, i) => (
              <div key={i} className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '100px 24px', 
        background: 'var(--gradient-card)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '16px' }}>
            Ready to Book Your <span className="text-gradient">Adventure?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Join thousands of travelers who trust NextStay for their perfect getaway
          </p>
          <a href="#hotels" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Start Exploring
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '40px 24px', 
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          © 2026 NextStay. All rights reserved. Built with Next.js
        </p>
      </footer>
    </div>
  );
}
