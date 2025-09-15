import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react"; // Example Lucide icon

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-gray-50">
      {/* Navbar */}

      {/* Body */}
      <main className="flex flex-1 items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Depression Risk Management
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            A simple screening tool to help you understand potential depression
            risk level. This tool is educational and not a substitute for a
            clinical diagnosis.
          </p>

          <Link
            to="/assessment"
            className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Take Assessment
          </Link>
        </div>
      </main>
    </div>
  );
}
