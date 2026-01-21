"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EditHotelPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const hotelId = params.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    price: 199,
    amenities: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      if (session.user.role !== "partner" && session.user.role !== "admin") {
        router.push("/");
      } else {
        fetchHotel();
      }
    }
  }, [status, session, router]);

  const fetchHotel = async () => {
    try {
      const res = await fetch(`/api/dashboard/hotels/${hotelId}`);
      if (res.ok) {
        const hotel = await res.json();
        setForm({
          name: hotel.name,
          location: hotel.location,
          description: hotel.description,
          price: hotel.price,
          amenities: hotel.amenities,
        });
      } else {
        setError("Hotel not found");
      }
    } catch (err) {
      setError("Failed to load hotel");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/dashboard/hotels/${hotelId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/dashboard/hotels");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update hotel");
      }
    } catch (err) {
      setError("Something went wrong");
    }
    setSaving(false);
  };

  if (status === "loading" || loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-hotel-page">
      <div className="page-header">
        <Link href="/dashboard/hotels" className="back-link">← Back to Hotels</Link>
        <h1>Edit Hotel</h1>
      </div>

      <form onSubmit={handleSubmit} className="hotel-form">
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label>Hotel Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            required
          />
        </div>

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

        <div className="form-group">
          <label>Amenities (comma-separated)</label>
          <input
            type="text"
            value={form.amenities}
            onChange={(e) => setForm({ ...form, amenities: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
