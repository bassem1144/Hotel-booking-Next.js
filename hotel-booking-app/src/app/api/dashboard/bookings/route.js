import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "partner" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = session.user.role === "admin";

    // Get hotels owned by this partner
    const hotels = await prisma.hotel.findMany({
      where: isAdmin ? {} : { ownerId: session.user.id },
      select: { id: true },
    });

    const hotelIds = hotels.map(h => h.id);

    // Get bookings for those hotels
    const bookings = await prisma.booking.findMany({
      where: {
        hotelId: { in: hotelIds },
      },
      include: {
        hotel: {
          select: { name: true, price: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Dashboard bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
