import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // If logged in, only show user's bookings
    const whereClause = session?.user?.id 
      ? { userId: session.user.id }
      : {};

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        hotel: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const bookingsWithHotelName = bookings.map((booking) => ({
      ...booking,
      hotelName: booking.hotel.name,
    }));

    return NextResponse.json({ bookings: bookingsWithHotelName });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
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

    // Verify hotel exists
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      return NextResponse.json({ error: "Invalid hotel ID" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        guestName: name,
        guestEmail: email,
        checkInDate,
        checkOutDate,
        guests: guestsNumber,
        hotelId,
        userId: session?.user?.id || null,
      },
      include: {
        hotel: true,
      },
    });

    return NextResponse.json({
      success: true,
      booking: {
        ...booking,
        hotelName: booking.hotel.name,
      },
    });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
