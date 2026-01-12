# NextStay - Hotel Booking Platform

A modern hotel booking application built with Next.js

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791)

🔗 **Live Demo**: [https://hotel-booking-next-js.vercel.app](https://hotel-booking-next-js.vercel.app)

## Features

### 🏨 Guest Experience
- Browse hotels with ratings and amenities
- Book accommodations with date selection
- View booking history

### 🤝 Partner Dashboard
- Manage owned hotels (add, edit, delete)
- View reservations for your properties
- Track booking statistics

### 👑 Admin Dashboard
- Site-wide user management
- Change user roles (guest, partner, admin)
- View all hotels and bookings

### 🔐 Authentication
- Email/password authentication with NextAuth.js
- Role-based access control
- Automatic redirects based on user rol

## Demo

Try the app with pre-configured demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Guest | `demo@guest.com` | `demo123` |
| Partner | `demo@partner.com` | `demo123` |
| Admin | `demo@admin.com` | `demo123` |

> 💡 **Quick Sign-In**: On the sign-in page, use the **Demo Mode** panel on the right to instantly log in as any role with one click!

## Tech Stack

- **Framework**: Next.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Hotel-booking-Next.js.git
cd Hotel-booking-Next.js/hotel-booking-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and NEXTAUTH_SECRET

# Run database migrations
npx prisma migrate dev

# Seed the database with demo data
node prisma/seed.js

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── dashboard/      # Partner dashboard pages
│   ├── hotels/         # Hotel listing and details
│   ├── api/            # API routes
│   └── components/     # Shared components
├── lib/
│   └── prisma.js       # Prisma client
└── middleware.js       # Route protection
```
