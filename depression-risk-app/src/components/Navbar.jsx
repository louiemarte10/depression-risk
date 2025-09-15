import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-[#27284D] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left section: Logo + Title */}
        <div className="flex items-center">
          <Stethoscope className="w-6 h-6 mr-2" />
          <Link
            to="/"
            className="text-lg font-semibold no-underline hover:no-underline"
          >
            Depression Risk Management
          </Link>
        </div>
      </div>
    </nav>
  );
}
