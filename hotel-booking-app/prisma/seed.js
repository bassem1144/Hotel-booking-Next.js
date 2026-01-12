const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const hotels = [
  {
    name: "Seaside Resort",
    location: "Miami Beach",
    description: "A beautiful seaside hotel with ocean views and pristine beaches.",
    price: 299,
    rating: 4.8,
    amenities: "Pool,WiFi,Parking,Breakfast,AC,Gym,Spa,Beach Access",
  },
  {
    name: "Mountain Lodge",
    location: "Aspen",
    description: "Cozy lodge in the mountains, perfect for skiing and winter adventures.",
    price: 349,
    rating: 4.9,
    amenities: "WiFi,Parking,Breakfast,Fireplace,Ski Storage,Hot Tub",
  },
  {
    name: "City Center Inn",
    location: "New York",
    description: "Stay in the heart of the city with all amenities and easy access to attractions.",
    price: 199,
    rating: 4.5,
    amenities: "WiFi,AC,Gym,Restaurant,Room Service,Concierge",
  },
  {
    name: "Tropical Paradise",
    location: "Bali",
    description: "Escape to paradise with stunning villas surrounded by lush tropical gardens.",
    price: 449,
    rating: 5.0,
    amenities: "Pool,WiFi,Breakfast,Spa,Beach Access,Private Villa,Butler Service",
  },
  {
    name: "Historic Grand Hotel",
    location: "Paris",
    description: "Experience old-world charm in this beautifully restored historic landmark.",
    price: 399,
    rating: 4.7,
    amenities: "WiFi,Breakfast,Restaurant,Bar,Concierge,Room Service",
  },
  {
    name: "Desert Oasis Resort",
    location: "Dubai",
    description: "Luxury resort in the desert with world-class amenities and stunning views.",
    price: 599,
    rating: 4.9,
    amenities: "Pool,WiFi,Parking,Spa,Gym,Restaurant,Golf Course,Private Beach",
  },
];

// Demo accounts
const demoUsers = [
  {
    name: "Demo Guest",
    email: "demo@guest.com",
    password: "demo123",
    role: "user",
  },
  {
    name: "Demo Partner",
    email: "demo@partner.com",
    password: "demo123",
    role: "partner",
  },
  {
    name: "Demo Admin",
    email: "demo@admin.com",
    password: "demo123",
    role: "admin",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.user.deleteMany();

  // Create demo users
  const createdUsers = [];
  for (const user of demoUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const created = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      },
    });
    createdUsers.push(created);
  }
  console.log(`✅ Created ${demoUsers.length} demo users`);

  // Get the partner user to assign hotels
  const partner = createdUsers.find(u => u.role === "partner");
  const guest = createdUsers.find(u => u.role === "user");

  // Create hotels (first 3 owned by demo partner account)
  const createdHotels = [];
  for (let i = 0; i < hotels.length; i++) {
    let ownerId = null;
    
    if (i < 3) {
      ownerId = partner.id;
    }

    const hotel = await prisma.hotel.create({
      data: {
        ...hotels[i],
        ownerId: ownerId,
      },
    });
    createdHotels.push(hotel);
  }

  console.log(`✅ Created ${hotels.length} hotels (3 owned by demo partner)`);

  // Create demo bookings
  const demoBookings = [
    {
      guestName: "John Smith",
      guestEmail: "john@example.com",
      checkInDate: "2026-01-15",
      checkOutDate: "2026-01-18",
      guests: 2,
      hotelId: createdHotels[0].id,
      userId: guest.id,
    },
    {
      guestName: "Sarah Johnson",
      guestEmail: "sarah@example.com",
      checkInDate: "2026-01-20",
      checkOutDate: "2026-01-25",
      guests: 3,
      hotelId: createdHotels[0].id,
      userId: guest.id,
    },
    {
      guestName: "Mike Wilson",
      guestEmail: "mike@example.com",
      checkInDate: "2026-02-01",
      checkOutDate: "2026-02-05",
      guests: 1,
      hotelId: createdHotels[1].id,
      userId: guest.id,
    },
    {
      guestName: "Emma Davis",
      guestEmail: "emma@example.com",
      checkInDate: "2026-02-10",
      checkOutDate: "2026-02-14",
      guests: 2,
      hotelId: createdHotels[2].id,
      userId: guest.id,
    },
    {
      guestName: "Alex Brown",
      guestEmail: "alex@example.com",
      checkInDate: "2026-03-01",
      checkOutDate: "2026-03-03",
      guests: 4,
      hotelId: createdHotels[3].id,
      userId: null,
    },
  ];

  for (const booking of demoBookings) {
    await prisma.booking.create({ data: booking });
  }

  console.log(`✅ Created ${demoBookings.length} demo bookings`);
  console.log("");
  console.log("📧 Demo Accounts:");
  console.log("   Guest:   demo@guest.com / demo123");
  console.log("   Partner: demo@partner.com / demo123");
  console.log("   Admin:   demo@admin.com / demo123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
