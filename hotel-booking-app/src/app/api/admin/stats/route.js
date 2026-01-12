import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [users, hotels, bookings] = await Promise.all([
      prisma.user.count(),
      prisma.hotel.count(),
      prisma.booking.findMany({
        include: { hotel: { select: { price: true } } },
      }),
    ]);

    const revenue = bookings.reduce((sum, b) => sum + (b.hotel?.price || 0), 0);

    return NextResponse.json({
      users,
      hotels,
      bookings: bookings.length,
      revenue,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
