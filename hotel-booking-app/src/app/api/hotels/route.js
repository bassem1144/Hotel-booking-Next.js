import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json({ hotels });
  } catch (error) {
    console.error("Failed to fetch hotels:", error);
    return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
  }
}
