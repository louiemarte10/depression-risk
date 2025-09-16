import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../images/bg2.jpg"; // adjust path if needed

export default function LandingPage() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation styles
  const overlayStyle = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    opacity: animate ? 1 : 0,
    transition: "opacity 1s ease-in-out",
  };

  const heroStyle = {
    maxWidth: "768px",
    margin: "0 auto",
    textAlign: "center",
    transform: animate ? "translateY(0)" : "translateY(40px)",
    opacity: animate ? 1 : 0,
    transition: "all 1s ease-in-out",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "1.5rem",
    lineHeight: "1.2",
    transform: animate ? "translateY(0)" : "translateY(20px)",
    opacity: animate ? 1 : 0,
    transition: "all 1s ease-in-out 0.3s", // delay for staggered effect
  };

  const subtitleStyle = {
    color: "#e5e7eb",
    fontSize: "1.125rem",
    marginBottom: "2.5rem",
    lineHeight: "1.6",
    transform: animate ? "translateY(0)" : "translateY(20px)",
    opacity: animate ? 1 : 0,
    transition: "all 1s ease-in-out 0.5s",
  };

  const buttonStyle = {
    backgroundColor: "#27284D",
    borderRadius: "9999px",
    padding: "0.75rem 2rem",
    fontWeight: 600,
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease-in-out",
    transform: animate ? "translateY(0)" : "translateY(20px)",
    opacity: animate ? 1 : 0,
    transitionDelay: "0.7s",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#faf8ff80",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div style={overlayStyle}></div>

      {/* Hero Section */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 1.5rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={heroStyle}>
          {/* Section Label */}
          <h2
            style={{
              color: "#b6b6baff",
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <span role="img" aria-label="stethoscope">
              🩺
            </span>
            Depression Risk Management
          </h2>

          {/* Title */}
          <h1 style={titleStyle}>
            Take Control of Your Mental Health <br />
            with{" "}
            <span style={{ color: "#ffffff" }}>Depression Risk Management</span>
          </h1>

          {/* Subtitle */}
          <p style={subtitleStyle}>
            A simple and educational screening tool to help you understand your
            potential risk level. Get started today — free, no registration
            needed.
          </p>

          {/* CTA Button */}
          <div>
            <Link to="/assessment" style={buttonStyle}>
              Start Assessment
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
