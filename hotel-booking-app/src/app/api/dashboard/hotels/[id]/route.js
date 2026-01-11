import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "partner" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    // Check ownership (admin can access all)
    if (session.user.role !== "admin" && hotel.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("Get hotel error:", error);
    return NextResponse.json({ error: "Failed to fetch hotel" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "partner" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, location, description, price, amenities } = body;

    // Check ownership first
    const existing = await prisma.hotel.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }
    if (session.user.role !== "admin" && existing.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hotel = await prisma.hotel.update({
      where: { id },
      data: { name, location, description, price, amenities },
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("Update hotel error:", error);
    return NextResponse.json({ error: "Failed to update hotel" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "partner" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check ownership
    const existing = await prisma.hotel.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }
    if (session.user.role !== "admin" && existing.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.hotel.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete hotel error:", error);
    return NextResponse.json({ error: "Failed to delete hotel" }, { status: 500 });
  }
}
