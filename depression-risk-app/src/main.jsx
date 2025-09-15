import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import DepressionRiskAssessment from "./pages/DepressionRiskAssessment";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="assessment" element={<DepressionRiskAssessment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
