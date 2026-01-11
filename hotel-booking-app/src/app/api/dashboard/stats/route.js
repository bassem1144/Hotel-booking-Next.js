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

    // Get hotels (all for admin, owned for partner)
    const hotels = await prisma.hotel.findMany({
      where: isAdmin ? {} : { ownerId: session.user.id },
      include: {
        bookings: true,
      },
    });

    const totalBookings = hotels.reduce((sum, hotel) => sum + hotel.bookings.length, 0);
    const revenue = hotels.reduce((sum, hotel) => {
      return sum + hotel.bookings.length * hotel.price;
    }, 0);

    return NextResponse.json({
      hotels: hotels.length,
      bookings: totalBookings,
      revenue,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
