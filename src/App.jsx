import React from "react";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import { AdminDashboard } from "./components/AdminDashboard";
import PersonalityTest from "./components/PersonalityTest";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PDFAnalyzer from "./components/PDFAnalyzer";
import Header from "./components/Header/Header";
function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ResumeAnalyzer />}
          />
          <Route
            path="/dashboard"
            element={<AdminDashboard />}
          />
          <Route
            path="/tests"
            element={<PersonalityTest />}
          />
          <Route
            path="/Pdf-to-text"
            element={<PDFAnalyzer />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
