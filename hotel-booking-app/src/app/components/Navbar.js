"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = session?.user?.role;
  const isAdmin = role === "admin";
  const isPartner = role === "partner";

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Get navigation links based on role
  const getNavLinks = () => {
    if (isAdmin) {
      return [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/hotels", label: "Hotels" },
        { href: "/admin/bookings", label: "Bookings" },
      ];
    } else if (isPartner) {
      return [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/dashboard/hotels", label: "My Hotels" },
        { href: "/dashboard/bookings", label: "Reservations" },
      ];
    } else {
      const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
      ];
      if (session) {
        links.push({ href: "/bookings", label: "My Bookings" });
      }
      return links;
    }
  };

  const navLinks = getNavLinks();
  const homeLink = isAdmin ? "/admin" : isPartner ? "/dashboard" : "/";

  return (
    <>
      <nav className={`nav ${isAdmin ? 'nav-admin' : ''} ${isPartner ? 'nav-partner' : ''}`}>
        <div className="nav-container">
          <Link href={homeLink} className="nav-logo" onClick={closeMenu}>
            NextStay {isAdmin && <span className="role-badge admin">Admin</span>}
            {isPartner && <span className="role-badge partner">Partner</span>}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
            <div style={{ marginLeft: '8px' }}>
              <AuthButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className="mobile-menu-link"
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ marginTop: '16px', padding: '0 16px' }}>
          <AuthButton />
        </div>
      </div>
    </>
  );
}
