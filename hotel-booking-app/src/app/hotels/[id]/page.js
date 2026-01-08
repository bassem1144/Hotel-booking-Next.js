import { notFound } from "next/navigation";
import BookingForm from "../BookingForm";
import hotels from "../hotels";

// hotels imported from hotels.js

export default async function HotelPage({ params }) {
  const resolvedParams = await params;
  const hotel = hotels.find((h) => h.id === resolvedParams.id);
  if (!hotel) return notFound();

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{hotel.name}</h1>
      <p className="mb-2">
        <span className="font-semibold">Location:</span> {hotel.location}
      </p>
      <p className="mb-6 text-gray-600">{hotel.description}</p>
      <h2 className="text-lg font-semibold mb-4 mt-8">Book this hotel</h2>
      <BookingForm hotelId={hotel.id} />
    </main>
  );
}
