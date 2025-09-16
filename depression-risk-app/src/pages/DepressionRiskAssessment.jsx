import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

const DepressionRiskAssessment = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [riskLevel, setRiskLevel] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const symptoms = [
    { id: 1, name: "Persistent sadness or low mood" },
    { id: 2, name: "Loss of interest in activities you once enjoyed" },
    { id: 3, name: "Significant changes in appetite or weight" },
    { id: 4, name: "Sleep disturbances (insomnia or oversleeping)" },
    { id: 5, name: "Fatigue or loss of energy" },
    { id: 6, name: "Feelings of worthlessness or excessive guilt" },
    { id: 7, name: "Difficulty concentrating or making decisions" },
    { id: 8, name: "Thoughts of death or suicide" },
  ];

  const riskDescriptions = {
    low: {
      title: "Low Risk",
      description:
        "Minimal symptoms that may be related to temporary stress or life changes.",
      recommendations: [
        "Maintain healthy lifestyle habits",
        "Practice stress management techniques",
        "Stay connected with supportive friends and family",
        "Monitor your mood and seek help if symptoms worsen",
      ],
      color: "#16a34a",
      bgColor: "#dcfce7",
      borderColor: "#bbf7d0",
      icon: CheckCircle,
    },
    moderate: {
      title: "Moderate Risk",
      description:
        "You're experiencing several symptoms that may indicate developing depression.",
      recommendations: [
        "Consider speaking with a mental health professional",
        "Establish a regular routine and maintain social connections",
        "Engage in regular physical activity and mindfulness practices",
        "Avoid alcohol and drugs as coping mechanisms",
      ],
      color: "#ca8a04",
      bgColor: "#fef3c7",
      borderColor: "#fde68a",
      icon: AlertTriangle,
    },
    high: {
      title: "High Risk",
      description:
        "Strong symptoms that suggest clinical depression. This likely impacts daily functioning.",
      recommendations: [
        "Seek immediate professional help",
        "Contact your doctor or a crisis helpline if you have thoughts of self-harm",
        "Don't isolate yourself - reach out to trusted friends or family",
        "Consider therapy and medication options",
      ],
      color: "#dc2626",
      bgColor: "#fee2e2",
      borderColor: "#fecaca",
      icon: XCircle,
    },
  };

  const handleSymptomChange = (symptomId, days) => {
    setSelectedSymptoms((prev) => ({
      ...prev,
      [symptomId]: parseInt(days) || 0,
    }));
  };

  const calculateRisk = () => {
    const symptomEntries = Object.entries(selectedSymptoms).filter(
      ([, days]) => days > 0
    );
    const totalSymptoms = symptomEntries.length;
    const avgDuration =
      symptomEntries.reduce((sum, [, days]) => sum + days, 0) / totalSymptoms ||
      0;

    const hasHighRiskSymptom = selectedSymptoms[8] > 0;

    let risk;
    if (hasHighRiskSymptom || (totalSymptoms >= 5 && avgDuration >= 14)) {
      risk = "high";
    } else if (totalSymptoms >= 3 && avgDuration >= 7) {
      risk = "moderate";
    } else {
      risk = "low";
    }

    setRiskLevel(risk);
    setShowResult(true);
  };

  const reset = () => {
    setSelectedSymptoms({});
    setRiskLevel(null);
    setShowResult(false);
  };

  const IconComponent = riskLevel ? riskDescriptions[riskLevel].icon : Info;
  const allZero =
    Object.values(selectedSymptoms).reduce((sum, val) => sum + val, 0) === 0;

  // Manual grid and card styles
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  };

  const cardStyle = {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };

  const buttonStyle = (disabled = false) => ({
    padding: "12px 32px",
    fontWeight: 600,
    borderRadius: "8px",
    cursor: disabled ? "not-allowed" : "pointer",
    backgroundColor: disabled ? "#d1d5db" : "#2563eb",
    color: disabled ? "#4b5563" : "#ffffff",
    border: "none",
    transition: "background-color 0.2s",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #e0e7ff, #ffffff, #bfdbfe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h2
              style={{ fontSize: "28px", fontWeight: "bold", color: "#4f46e5" }}
            >
              🩺 Depression Risk Assessment
            </h2>
          </Link>

          <p style={{ color: "#4b5563", marginTop: "8px" }}>
            Select the symptoms you've experienced and indicate how many days
          </p>
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              backgroundColor: "#dbeafe",
              border: "1px solid #bfdbfe",
              borderRadius: "12px",
            }}
          >
            <p style={{ color: "#1e40af", fontSize: "14px" }}>
              <strong>Disclaimer:</strong> This is not a diagnostic tool. Please
              consult a healthcare professional for proper evaluation and
              treatment.
            </p>
          </div>
        </div>

        {!showResult ? (
          <div>
            <div style={gridStyle}>
              {symptoms.map((symptom) => (
                <div key={symptom.id} style={cardStyle}>
                  <label
                    style={{
                      fontWeight: 500,
                      marginBottom: "12px",
                      color: "#111827",
                    }}
                  >
                    {symptom.name}
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>
                      Days:
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="365"
                      placeholder="0"
                      value={selectedSymptoms[symptom.id] || ""}
                      onChange={(e) =>
                        handleSymptomChange(symptom.id, e.target.value)
                      }
                      style={{
                        width: "60px",
                        padding: "6px 8px",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button
                onClick={calculateRisk}
                disabled={allZero}
                style={buttonStyle(allZero)}
              >
                Assess Risk Level
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                padding: "24px",
                borderRadius: "12px",
                border: `2px solid ${riskDescriptions[riskLevel].borderColor}`,
                backgroundColor: riskDescriptions[riskLevel].bgColor,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <IconComponent
                  size={36}
                  color={riskDescriptions[riskLevel].color}
                  style={{ marginRight: "12px" }}
                />
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: riskDescriptions[riskLevel].color,
                  }}
                >
                  {riskDescriptions[riskLevel].title}
                </h2>
              </div>

              <p
                style={{
                  fontSize: "16px",
                  color: "#374151",
                  marginBottom: "16px",
                }}
              >
                {riskDescriptions[riskLevel].description}
              </p>

              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: "12px",
                  }}
                >
                  Recommendations:
                </h3>
                <ul style={{ paddingLeft: "16px", listStyleType: "disc" }}>
                  {riskDescriptions[riskLevel].recommendations.map(
                    (rec, index) => (
                      <li
                        key={index}
                        style={{ marginBottom: "6px", color: "#374151" }}
                      >
                        {rec}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {riskLevel === "high" && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#fee2e2",
                    border: "1px solid #fecaca",
                  }}
                >
                  <p style={{ fontWeight: 600, color: "#b91c1c" }}>
                    🚨 If you're having thoughts of self-harm, please contact:
                  </p>
                  <p style={{ marginTop: "4px", color: "#dc2626" }}>
                    National Suicide Prevention Lifeline: 988 (US) | Emergency:
                    911
                  </p>
                </div>
              )}
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={reset}
                style={{
                  padding: "12px 32px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "#4b5563",
                  color: "#ffffff",
                  border: "none",
                }}
              >
                Take Assessment Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepressionRiskAssessment;
