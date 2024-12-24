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
import StudentResults from "./components/StudentResults";
import GeminiChat from "./components/GeminiChat";
import CandidateLogin from "./components/CandidateLogin";
import Hero from "./components/Hero/Hero";
function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Hero />}
          />
          <Route
          path="/resume-analyzer"
          element={<ResumeAnalyzer />}
          />
          <Route
            path="/questions"
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
          <Route
            path="/candidate-login"
            element={<CandidateLogin />}
          />
          <Route
            path="/dashboard"
            element={<StudentResults />}
          />
          <Route
            path="/gemini-chat"
            element={<GeminiChat />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
