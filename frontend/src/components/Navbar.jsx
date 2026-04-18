import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/analyzer", label: "Analyzer" },
  { to: "/history", label: "History" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="glass sticky top-4 z-50 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'DM Serif Display', serif", color: "#00ff9d" }}>
            SentiScope
          </span>
          <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(0,255,157,0.12)", color: "#00ff9d", border: "1px solid rgba(0,255,157,0.3)" }}>
            NLP
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium pb-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[#00ff9d] border-b-2 border-[#00ff9d]"
                    : "text-gray-400 hover:text-white border-b-2 border-transparent"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <span className="block w-5 h-0.5 bg-gray-400 transition-all duration-200" style={{ transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
          <span className="block w-5 h-0.5 bg-gray-400 transition-all duration-200" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-0.5 bg-gray-400 transition-all duration-200" style={{ transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden glass border-t px-4 pb-4 flex flex-col gap-3" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                  isActive ? "bg-[rgba(0,255,157,0.1)] text-[#00ff9d]" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
