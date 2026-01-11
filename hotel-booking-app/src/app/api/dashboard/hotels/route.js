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

    const hotels = await prisma.hotel.findMany({
      where: isAdmin ? {} : { ownerId: session.user.id },
      include: {
        bookings: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(hotels);
  } catch (error) {
    console.error("Dashboard hotels error:", error);
    return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "partner" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, location, description, price, amenities } = body;

    if (!name || !location || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const hotel = await prisma.hotel.create({
      data: {
        name,
        location,
        description,
        price: price || 199,
        amenities: amenities || "WiFi,Parking",
        ownerId: session.user.id,
      },
    });

    return NextResponse.json(hotel, { status: 201 });
  } catch (error) {
    console.error("Create hotel error:", error);
    return NextResponse.json({ error: "Failed to create hotel" }, { status: 500 });
  }
}
