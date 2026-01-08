import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "NextStay | Premium Hotel Booking",
  description: "Discover and book luxury hotels worldwide with NextStay",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="nav-container">
            <Link href="/" className="nav-logo">
              NextStay
            </Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/bookings" className="nav-link">
                My Bookings
              </Link>
              <Link href="/#hotels" className="btn btn-primary" style={{ marginLeft: '8px', padding: '10px 20px' }}>
                Book Now
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
