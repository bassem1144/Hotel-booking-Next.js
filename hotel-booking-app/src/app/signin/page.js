"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const demoAccounts = [
  { email: "demo@guest.com", password: "demo123", role: "Guest", icon: "👤", color: "#10b981", desc: "Browse & book hotels" },
  { email: "demo@partner.com", password: "demo123", role: "Partner", icon: "🤝", color: "#8b5cf6", desc: "Manage your hotels" },
  { email: "demo@admin.com", password: "demo123", role: "Admin", icon: "👑", color: "#ef4444", desc: "Site management" },
];

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        
        if (session?.user?.role === "admin") {
          router.push("/admin");
        } else if (session?.user?.role === "partner") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (account) => {
    setDemoLoading(account.role);
    setError("");
    
    try {
      const result = await signIn("credentials", {
        email: account.email,
        password: account.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        
        if (session?.user?.role === "admin") {
          router.push("/admin");
        } else if (session?.user?.role === "partner") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div className="page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-hero)',
      padding: '24px',
      paddingTop: '100px',
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '24px', 
        alignItems: 'stretch',
        maxWidth: '800px',
        width: '100%',
      }}>
        {/* Sign In Form */}
        <div className="glass-card" style={{ 
          flex: 1,
          padding: '48px 40px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link href="/" style={{
              fontSize: '2rem',
              fontWeight: '800',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}>
              NextStay
            </Link>
            <h1 style={{ fontSize: '1.5rem', marginTop: '24px', marginBottom: '8px' }}>
              Welcome Back
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
                required
              />
            </div>

            {error && (
              <div style={{
                padding: '12px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: '#ef4444',
                fontSize: '0.9rem',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ 
            marginTop: '24px', 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
          }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Quick Sign-In Section */}
        <div style={{
          width: '220px',
          padding: '24px',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '16px',
          }}>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: '600',
              color: '#a5b4fc',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Demo Mode
            </span>
          </div>
          
          <p style={{ 
            textAlign: 'center', 
            fontSize: '0.75rem', 
            color: '#94a3b8',
            marginBottom: '20px',
            lineHeight: 1.4
          }}>
            Quick sign-in for demonstration
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            {demoAccounts.map((account) => (
              <button
                key={account.role}
                onClick={() => handleDemoLogin(account)}
                disabled={demoLoading !== null}
                style={{
                  padding: '14px 12px',
                  background: demoLoading === account.role ? account.color : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${account.color}`,
                  borderRadius: '12px',
                  cursor: demoLoading !== null ? 'wait' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: demoLoading !== null && demoLoading !== account.role ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{account.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: '600',
                    color: '#f1f5f9',
                    display: 'block'
                  }}>
                    {demoLoading === account.role ? "Signing in..." : account.role}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {account.desc}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
