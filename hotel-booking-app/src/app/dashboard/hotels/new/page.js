"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewHotelPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    price: 199,
    amenities: "WiFi,Parking,Pool",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      if (session.user.role !== "partner" && session.user.role !== "admin") {
        router.push("/");
      }
    }
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dashboard/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/dashboard/hotels");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create hotel");
      }
    } catch (err) {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  if (status === "loading") {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="new-hotel-page">
      <div className="page-header">
        <Link href="/dashboard/hotels" className="back-link">← Back to Hotels</Link>
        <h1>Add New Hotel</h1>
      </div>

      <form onSubmit={handleSubmit} className="hotel-form">
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label>Hotel Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Grand Plaza Hotel"
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="New York, USA"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe your hotel..."
            rows={4}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price per Night ($)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
              min={1}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Amenities (comma-separated)</label>
          <input
            type="text"
            value={form.amenities}
            onChange={(e) => setForm({ ...form, amenities: e.target.value })}
            placeholder="WiFi,Pool,Gym,Parking"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Creating..." : "Create Hotel"}
        </button>
      </form>

      <style jsx>{`
        .new-hotel-page {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }
        .loading {
          text-align: center;
          padding: 4rem;
        }
        .page-header {
          margin-bottom: 2rem;
        }
        .back-link {
          color: #8b5cf6;
          text-decoration: none;
          font-size: 0.875rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        .page-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
        }
        .hotel-form {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .error {
          background: #fef2f2;
          color: #dc2626;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        label {
          display: block;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #374151;
        }
        input, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        .btn-submit {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-submit:hover {
          opacity: 0.9;
        }
        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
