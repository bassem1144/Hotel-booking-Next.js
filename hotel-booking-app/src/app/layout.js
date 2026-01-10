import Link from "next/link";
import "./globals.css";
import Providers from "./providers";
import AuthButton from "./components/AuthButton";

export const metadata = {
  title: "NextStay | Premium Hotel Booking",
  description: "Discover and book luxury hotels worldwide with NextStay",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
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
                <div style={{ marginLeft: '8px' }}>
                  <AuthButton />
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
