import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../images/bg2.jpg"; // adjust path if needed

export default function LandingPage() {
  return (
    <div
      className="flex flex-col min-h-screen relative bg-gradient-to-br from-indigo-50 via-white to-blue-50"
      style={{
        // backgroundImage: `url(${bgImage})`,
        backgroundColor: "#faf8ff80",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Overlay with 60% opacity */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Hero Section */}
      <main
        className="flex flex-1 items-center justify-center px-6 text-center relative z-10 pt-20"
        style={{ textAlign: "center", paddingTop: "5rem" }}
      >
        {/* 👆 pt-20 offsets the fixed navbar height */}

        <div className="max-w-3xl mx-auto">
          {/* Section Label */}
          <h2 className="text-[#4F46E5] font-semibold mb-3 flex items-center justify-center space-x-2">
            <span role="img" aria-label="stethoscope">
              🩺
            </span>
            <span>Depression Risk Management</span>
          </h2>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-6 leading-tight">
            Take Control of Your Mental Health <br />
            with <span className="text-white">Depression Risk Management</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-200 mb-10 text-lg md:text-xl leading-relaxed">
            A simple and educational screening tool to help you understand your
            potential risk level. Get started today — free, no registration
            needed.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link
              to="/assessment"
              className="bg-[#27284D] rounded-full px-8 py-3 font-semibold text-white shadow-md hover:bg-[#1f213b] transition-colors"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
