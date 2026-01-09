const { PrismaClient } = require("@prisma/client");

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

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.hotel.deleteMany();

  // Create hotels
  for (const hotel of hotels) {
    await prisma.hotel.create({
      data: hotel,
    });
  }

  console.log(`✅ Created ${hotels.length} hotels`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
