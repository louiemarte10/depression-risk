import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <Link
          to="/"
          className="flex items-center space-x-2"
          style={{ textDecoration: "none" }}
        >
          <Stethoscope className="w-6 h-6 text-[#27284D]" />
          <h2 className="text-lg font-semibold text-[#27284D] m-0">
            Depression Risk Management
          </h2>
        </Link>
      </div>
    </nav>
  );
}
