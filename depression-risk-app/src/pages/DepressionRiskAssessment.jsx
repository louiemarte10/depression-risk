import React, { useState } from "react";
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
        "You're experiencing minimal symptoms that may be related to temporary stress or life changes. Your symptoms are manageable and don't significantly impact daily functioning.",
      recommendations: [
        "Maintain healthy lifestyle habits (regular exercise, balanced diet, adequate sleep)",
        "Practice stress management techniques like meditation or deep breathing",
        "Stay connected with supportive friends and family",
        "Monitor your mood and seek help if symptoms worsen",
      ],
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: CheckCircle,
    },
    moderate: {
      title: "Moderate Risk",
      description:
        "You're experiencing several symptoms that may indicate developing depression. These symptoms are beginning to interfere with your daily life and relationships.",
      recommendations: [
        "Consider speaking with a mental health professional or your primary care doctor",
        "Establish a regular routine and maintain social connections",
        "Engage in regular physical activity and mindfulness practices",
        "Avoid alcohol and drugs as coping mechanisms",
        "Keep track of your symptoms and triggers",
      ],
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: AlertTriangle,
    },
    high: {
      title: "High Risk",
      description:
        "You're experiencing significant symptoms that strongly suggest clinical depression. These symptoms are likely severely impacting your daily functioning and quality of life.",
      recommendations: [
        "Seek immediate professional help from a mental health provider",
        "Contact your doctor or a crisis helpline if you have thoughts of self-harm",
        "Don't isolate yourself - reach out to trusted friends or family",
        "Consider both therapy and medication options with professional guidance",
        "Create a safety plan and remove any means of self-harm",
      ],
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
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
      ([_, days]) => days > 0
    );
    const totalSymptoms = symptomEntries.length;
    const avgDuration =
      symptomEntries.reduce((sum, [_, days]) => sum + days, 0) /
        totalSymptoms || 0;

    // Check for high-risk symptom (thoughts of death/suicide)
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Depression Risk Assessment
        </h1>
        <p className="text-gray-600">
          Select symptoms you've experienced and indicate how many days
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Disclaimer:</strong> This is not a diagnostic tool. Please
            consult a healthcare professional for proper evaluation and
            treatment.
          </p>
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-6">
          <div className="grid gap-4">
            {symptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <label className="flex-1 text-gray-700 font-medium">
                  {symptom.name}
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Days:</span>
                  <input
                    type="number"
                    min="0"
                    max="365"
                    placeholder="0"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      handleSymptomChange(symptom.id, e.target.value)
                    }
                    value={selectedSymptoms[symptom.id] || ""}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={calculateRisk}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Assess Risk Level
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div
            className={`p-6 border-2 rounded-lg ${riskDescriptions[riskLevel].bgColor} ${riskDescriptions[riskLevel].borderColor}`}
          >
            <div className="flex items-center mb-4">
              <IconComponent
                className={`w-8 h-8 ${riskDescriptions[riskLevel].color} mr-3`}
              />
              <h2
                className={`text-2xl font-bold ${riskDescriptions[riskLevel].color}`}
              >
                {riskDescriptions[riskLevel].title}
              </h2>
            </div>

            <p className="text-gray-700 mb-6 text-lg">
              {riskDescriptions[riskLevel].description}
            </p>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Recommendations:
              </h3>
              <ul className="space-y-2">
                {riskDescriptions[riskLevel].recommendations.map(
                  (rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {riskLevel === "high" && (
              <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-red-800 font-semibold">
                  🚨 If you're having thoughts of self-harm, please contact:
                </p>
                <p className="text-red-700 mt-1">
                  National Suicide Prevention Lifeline: 988 (US) | Emergency:
                  911
                </p>
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={reset}
              className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Take Assessment Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepressionRiskAssessment;
