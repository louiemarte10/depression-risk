import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Background decorative blur */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-30"></div>

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center px-6 text-center relative z-10">
        <div className="max-w-3xl">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Take Control of Your Mental Health <br />
            with{" "}
            <span className="text-[#27284D]">Depression Risk Management</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mb-10 text-lg md:text-xl leading-relaxed">
            A simple and educational screening tool to help you understand your
            potential risk level. Get started today — free, no registration
            needed.
          </p>

          {/* CTA Button */}
          {/* make button rounded */}
          <div className="flex justify-center">
            <Link
              to="/assessment"
              style={{
                backgroundColor: "#27284D",
                borderRadius: "9999px",
                padding: "12px 36px",
                fontWeight: "600",
                color: "white",
                textDecoration: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s ease",
              }}
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
