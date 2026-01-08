import { NextResponse } from "next/server";
import hotels from "../../hotels/hotels";

const bookings = [];

export async function GET() {
  return NextResponse.json({ bookings });
}

export async function POST(request) {
  try {
    const { name, email, checkInDate, checkOutDate, guests, hotelId } =
      await request.json();

    if (
      !name ||
      !email ||
      !checkInDate ||
      !checkOutDate ||
      !guests ||
      !hotelId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const guestsNumber = Number(guests);
    if (!Number.isInteger(guestsNumber) || guestsNumber <= 0) {
      return NextResponse.json(
        { error: "Guests must be a positive integer" },
        { status: 400 }
      );
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      return NextResponse.json(
        { error: "Check-out must be after check-in" },
        { status: 400 }
      );
    }

    // get hotel name by id
    const hotel = hotels.find((h) => h.id === hotelId);
    if (!hotel) {
      return NextResponse.json({ error: "Invalid hotel ID" }, { status: 400 });
    }

    const booking = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      email,
      checkInDate,
      checkOutDate,
      guests: guestsNumber,
      hotelId,
      hotelName: hotel.name,
      createdAt: new Date().toISOString(),
    };
    bookings.push(booking);

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
