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
    </div>
  );
}
