import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

const DepressionRiskAssessment = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [riskLevel, setRiskLevel] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Clinical information database based on NIH, WHO, and DSM-5 criteria
  const clinicalDatabase = {
    1: {
      source: "National Institute of Mental Health (NIMH)",
      description: "Persistent feelings of sadness, emptiness, or hopelessness that last most of the day, nearly every day. This is one of the two core symptoms required for a depression diagnosis.",
      impact: "Affects emotional regulation and overall quality of life, making it difficult to experience pleasure or maintain positive outlook.",
      prevalence: "Present in over 75% of individuals with major depressive disorder"
    },
    2: {
      source: "DSM-5 Diagnostic Criteria",
      description: "Markedly diminished interest or pleasure in all, or almost all, activities (anhedonia). This includes hobbies, social activities, or things that previously brought joy.",
      impact: "Can lead to social withdrawal, reduced productivity, and further worsening of mood symptoms.",
      prevalence: "One of the two core symptoms of depression, present in approximately 70% of cases"
    },
    3: {
      source: "Mayo Clinic / WHO",
      description: "Significant weight loss or gain (more than 5% of body weight in a month), or changes in appetite nearly every day. May manifest as eating much more or much less than usual.",
      impact: "Can indicate dysregulation of brain chemistry affecting appetite centers; may lead to nutritional deficiencies or health complications.",
      prevalence: "Occurs in 40-50% of people with depression"
    },
    4: {
      source: "National Sleep Foundation / NIMH",
      description: "Insomnia (difficulty falling or staying asleep) or hypersomnia (sleeping too much) nearly every day. Sleep architecture is often disrupted in depression.",
      impact: "Poor sleep worsens other depression symptoms, impairs cognitive function, and reduces emotional resilience.",
      prevalence: "Present in approximately 80% of individuals with major depression"
    },
    5: {
      source: "American Psychiatric Association",
      description: "Persistent fatigue, loss of energy, or feeling physically slowed down nearly every day, even without significant physical exertion.",
      impact: "Reduces ability to complete daily tasks, work responsibilities, and self-care activities.",
      prevalence: "Reported by 90% or more of people experiencing depression"
    },
    6: {
      source: "DSM-5 / Cognitive Theory of Depression",
      description: "Feelings of worthlessness or excessive/inappropriate guilt that may be delusional in severity. Not just self-reproach about being sick.",
      impact: "Can perpetuate depression through negative thought patterns; associated with increased risk of self-harm.",
      prevalence: "Present in 60-70% of depression cases"
    },
    7: {
      source: "Cognitive Neuroscience Research / NIH",
      description: "Diminished ability to think, concentrate, or make decisions nearly every day. Often described as 'brain fog' or slowed thinking.",
      impact: "Impairs work performance, academic functioning, and decision-making in daily life.",
      prevalence: "Affects approximately 75% of individuals with depression"
    },
    8: {
      source: "National Suicide Prevention / Crisis Resources",
      description: "Recurrent thoughts of death, suicidal ideation with or without a specific plan, or suicide attempt. This is a psychiatric emergency.",
      impact: "Indicates severe depression requiring immediate professional intervention. Significantly increases risk of suicide.",
      prevalence: "Suicidal thoughts occur in 50-60% of people with major depression; requires urgent care"
    }
  };

  const symptoms = [
    { 
      id: 1, 
      name: "Persistent sadness or low mood",
      category: "emotional",
      clinicalName: "Depressed mood"
    },
    { 
      id: 2, 
      name: "Loss of interest in activities you once enjoyed",
      category: "emotional",
      clinicalName: "Anhedonia"
    },
    { 
      id: 3, 
      name: "Significant changes in appetite or weight",
      category: "physical",
      clinicalName: "Appetite/weight changes"
    },
    { 
      id: 4, 
      name: "Sleep disturbances (insomnia or oversleeping)",
      category: "physical",
      clinicalName: "Sleep disturbances"
    },
    { 
      id: 5, 
      name: "Fatigue or loss of energy",
      category: "physical",
      clinicalName: "Fatigue"
    },
    { 
      id: 6, 
      name: "Feelings of worthlessness or excessive guilt",
      category: "cognitive",
      clinicalName: "Feelings of worthlessness/guilt"
    },
    { 
      id: 7, 
      name: "Difficulty concentrating or making decisions",
      category: "cognitive",
      clinicalName: "Concentration difficulties"
    },
    { 
      id: 8, 
      name: "Thoughts of death or suicide",
      category: "severe",
      clinicalName: "Suicidal ideation"
    },
  ];

  // Function to generate dynamic description based on selected symptoms
  const generateDynamicDescription = (riskLevel) => {
    const selectedSymptomsList = Object.entries(selectedSymptoms)
      .filter(([id, days]) => days > 0)
      .map(([id]) => symptoms.find(s => s.id === parseInt(id)));

    const symptomNames = selectedSymptomsList.map(s => s.name.toLowerCase());
    const categories = {
      emotional: selectedSymptomsList.filter(s => s.category === "emotional").length,
      physical: selectedSymptomsList.filter(s => s.category === "physical").length,
      cognitive: selectedSymptomsList.filter(s => s.category === "cognitive").length,
      severe: selectedSymptomsList.filter(s => s.category === "severe").length,
    };

    let description = "";
    const totalSymptoms = selectedSymptomsList.length;
    const avgDuration = Object.entries(selectedSymptoms)
      .filter(([, days]) => days > 0)
      .reduce((sum, [, days]) => sum + days, 0) / totalSymptoms;

    // Generate symptom-specific description
    if (riskLevel === "low") {
      description = `You reported ${totalSymptoms} symptom${totalSymptoms > 1 ? 's' : ''} `;
      if (symptomNames.length > 0) {
        description += `including ${symptomNames.slice(0, 2).join(" and ")}. `;
      }
      description += `These symptoms have been present for an average of ${Math.round(avgDuration)} days. This may be related to temporary stress or recent life changes.`;
    } else if (riskLevel === "moderate") {
      description = `You reported ${totalSymptoms} symptoms `;
      if (categories.emotional > 0) description += `affecting your mood and emotions, `;
      if (categories.physical > 0) description += `impacting your physical wellbeing, `;
      if (categories.cognitive > 0) description += `affecting your thinking and decision-making, `;
      description = description.replace(/, $/, ". ");
      description += `These symptoms have persisted for an average of ${Math.round(avgDuration)} days, which may indicate developing depression requiring attention.`;
    } else {
      description = `You reported ${totalSymptoms} significant symptoms `;
      if (categories.severe > 0) {
        description += `including thoughts of death or suicide, which is a serious concern. `;
      }
      if (categories.emotional > 0 && categories.physical > 0 && categories.cognitive > 0) {
        description += `Your symptoms span emotional, physical, and cognitive areas, `;
      }
      description += `and have been present for an average of ${Math.round(avgDuration)} days. This pattern strongly suggests clinical depression that is likely impacting your daily functioning.`;
    }

    return description;
  };

  // Generate symptom-specific recommendations
  const generateRecommendations = (riskLevel) => {
    const selectedSymptomsList = Object.entries(selectedSymptoms)
      .filter(([id, days]) => days > 0)
      .map(([id]) => symptoms.find(s => s.id === parseInt(id)));

    let recommendations = [];

    if (riskLevel === "low") {
      recommendations = [
        "Maintain healthy lifestyle habits including regular sleep and nutrition",
        "Practice stress management techniques like deep breathing or meditation",
      ];
      if (selectedSymptomsList.some(s => s.id === 4)) {
        recommendations.push("Establish a consistent sleep schedule to address sleep disturbances");
      }
      if (selectedSymptomsList.some(s => s.id === 5)) {
        recommendations.push("Engage in light physical activity to boost energy levels");
      }
      recommendations.push("Monitor your mood and seek help if symptoms worsen or persist");
    } else if (riskLevel === "moderate") {
      recommendations = [
        "Consider speaking with a mental health professional for evaluation",
        "Establish a regular daily routine and maintain social connections",
      ];
      if (selectedSymptomsList.some(s => s.id === 4)) {
        recommendations.push("Address sleep issues with good sleep hygiene practices");
      }
      if (selectedSymptomsList.some(s => s.id === 3)) {
        recommendations.push("Pay attention to nutrition and eating patterns");
      }
      if (selectedSymptomsList.some(s => s.id === 7)) {
        recommendations.push("Break tasks into smaller steps to manage concentration difficulties");
      }
      recommendations.push("Engage in regular physical activity and mindfulness practices");
      recommendations.push("Avoid alcohol and drugs as coping mechanisms");
    } else {
      recommendations = [
        "Seek immediate professional help from a mental health provider or your doctor",
      ];
      if (selectedSymptomsList.some(s => s.id === 8)) {
        recommendations.push("Contact a crisis helpline immediately if you have thoughts of self-harm (988 in US)");
      }
      recommendations.push("Don't isolate yourself - reach out to trusted friends or family members");
      recommendations.push("Consider both therapy (CBT, IPT) and medication options with a psychiatrist");
      if (selectedSymptomsList.some(s => s.id === 4 || s.id === 5)) {
        recommendations.push("Discuss sleep and energy issues with your provider as these can be treated");
      }
    }

    return recommendations;
  };

  const riskDescriptions = {
    low: {
      title: "Low Risk",
      color: "#16a34a",
      bgColor: "#dcfce7",
      borderColor: "#bbf7d0",
      icon: CheckCircle,
    },
    moderate: {
      title: "Moderate Risk",
      color: "#ca8a04",
      bgColor: "#fef3c7",
      borderColor: "#fde68a",
      icon: AlertTriangle,
    },
    high: {
      title: "High Risk",
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
                {generateDynamicDescription(riskLevel)}
              </p>

              {/* Display detected symptoms */}
              <div style={{ marginBottom: "20px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  Symptoms Detected:
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {Object.entries(selectedSymptoms)
                    .filter(([id, days]) => days > 0)
                    .map(([id, days]) => {
                      const symptom = symptoms.find(s => s.id === parseInt(id));
                      return (
                        <span
                          key={id}
                          style={{
                            fontSize: "13px",
                            padding: "4px 12px",
                            backgroundColor: "#e0e7ff",
                            color: "#4f46e5",
                            borderRadius: "12px",
                            border: "1px solid #c7d2fe",
                          }}
                        >
                          {symptom.clinicalName} ({days} day{days > 1 ? 's' : ''})
                        </span>
                      );
                    })}
                </div>
              </div>

              {/* Clinical Information Section */}
              <div style={{ 
                marginBottom: "20px",
                padding: "16px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0"
              }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  📚 Clinical Information About Your Symptoms
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {Object.entries(selectedSymptoms)
                    .filter(([id, days]) => days > 0)
                    .map(([id, days]) => {
                      const symptom = symptoms.find(s => s.id === parseInt(id));
                      const clinicalInfo = clinicalDatabase[parseInt(id)];
                      return (
                        <div
                          key={id}
                          style={{
                            padding: "12px",
                            backgroundColor: "#ffffff",
                            borderRadius: "6px",
                            border: "1px solid #e5e7eb",
                          }}
                        >
                          <h4 style={{ 
                            fontSize: "14px", 
                            fontWeight: 600, 
                            color: "#4f46e5",
                            marginBottom: "6px"
                          }}>
                            {symptom.name}
                          </h4>
                          <p style={{ 
                            fontSize: "13px", 
                            color: "#374151",
                            marginBottom: "4px",
                            lineHeight: "1.5"
                          }}>
                            {clinicalInfo.description}
                          </p>
                          <p style={{ 
                            fontSize: "12px", 
                            color: "#6b7280",
                            marginBottom: "4px",
                            fontStyle: "italic"
                          }}>
                            <strong>Impact:</strong> {clinicalInfo.impact}
                          </p>
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "6px",
                            paddingTop: "6px",
                            borderTop: "1px solid #f3f4f6"
                          }}>
                            <span style={{ 
                              fontSize: "11px", 
                              color: "#9ca3af"
                            }}>
                              Source: {clinicalInfo.source}
                            </span>
                            <span style={{ 
                              fontSize: "11px", 
                              color: "#6b7280",
                              backgroundColor: "#f3f4f6",
                              padding: "2px 8px",
                              borderRadius: "4px"
                            }}>
                              {clinicalInfo.prevalence}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

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
                  {generateRecommendations(riskLevel).map(
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

            {/* Professional Resources & References */}
            <div style={{
              marginTop: "20px",
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "8px"
              }}>
                📖 Clinical References
              </h3>
              <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px", lineHeight: "1.6" }}>
                The symptom information provided is based on clinical guidelines from:
              </p>
              <ul style={{ 
                fontSize: "12px", 
                color: "#6b7280", 
                paddingLeft: "20px",
                lineHeight: "1.8"
              }}>
                <li>National Institute of Mental Health (NIMH)</li>
                <li>DSM-5 Diagnostic Criteria (American Psychiatric Association)</li>
                <li>World Health Organization (WHO) ICD-11</li>
                <li>Mayo Clinic Depression Guidelines</li>
                <li>National Sleep Foundation</li>
              </ul>
              <p style={{ 
                fontSize: "11px", 
                color: "#9ca3af", 
                marginTop: "12px",
                fontStyle: "italic"
              }}>
                Last updated: February 2026 | For educational purposes only - not a substitute for professional medical advice
              </p>
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
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
