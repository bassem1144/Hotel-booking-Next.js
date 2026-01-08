import Link from "next/link";

export default function About() {
  const stats = [
    { value: "10K+", label: "Happy Guests" },
    { value: "500+", label: "Premium Hotels" },
    { value: "50+", label: "Countries" },
    { value: "24/7", label: "Support" },
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", emoji: "👩‍💼" },
    { name: "Michael Chen", role: "Head of Operations", emoji: "👨‍💻" },
    { name: "Emily Williams", role: "Customer Success", emoji: "👩‍🎨" },
  ];

  return (
    <div className="page">
      {/* Hero Section */}
      <section style={{
        padding: 'calc(var(--nav-height) + 80px) 24px 80px',
        textAlign: 'center',
        background: 'var(--gradient-hero)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="badge badge-info" style={{ marginBottom: '24px' }}>About Us</span>
          <h1 style={{ marginBottom: '24px' }}>
            We're on a Mission to Make Travel <span className="text-gradient">Unforgettable</span>
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.2rem',
            lineHeight: 1.7
          }}>
            NextStay was founded with a simple belief: everyone deserves access to 
            exceptional travel experiences. We partner with the finest hotels worldwide 
            to bring you luxury at the best prices.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ 
        padding: '60px 24px',
        background: 'var(--bg-secondary)'
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800',
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px'
                }}>
                  {stat.value}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>
            Our <span className="text-gradient">Story</span>
          </h2>
          <div className="glass-card" style={{ padding: '40px' }}>
            <p style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: 1.8, 
              marginBottom: '20px' 
            }}>
              Founded in 2024, NextStay emerged from a passion for travel and a 
              frustration with the booking experience. Our founders, avid travelers 
              themselves, believed there had to be a better way to discover and book 
              premium hotels.
            </p>
            <p style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: 1.8, 
              marginBottom: '20px' 
            }}>
              Today, we've grown to serve thousands of travelers worldwide, partnering 
              with over 500 carefully selected hotels across 50+ countries. But our 
              mission remains the same: to make luxury travel accessible and booking 
              effortless.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Every hotel in our collection is personally vetted by our team. We don't 
              just list any property—we choose partners who share our commitment to 
              exceptional guest experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ 
        padding: '80px 24px',
        background: 'var(--bg-secondary)'
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '48px', textAlign: 'center' }}>
            Meet the <span className="text-gradient">Team</span>
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {team.map((member, i) => (
              <div key={i} className="glass-card" style={{ 
                padding: '40px 24px', 
                textAlign: 'center' 
              }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--gradient-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '2.5rem'
                }}>
                  {member.emoji}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ 
        padding: '100px 24px',
        textAlign: 'center',
        background: 'var(--gradient-card)'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '16px' }}>
            Ready to Start Your <span className="text-gradient">Journey?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Browse our curated collection of premium hotels and find your perfect stay.
          </p>
          <Link href="/" className="btn btn-primary" style={{ padding: '16px 32px' }}>
            Explore Hotels
          </Link>
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
