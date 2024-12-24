import "@radix-ui/themes/styles.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AdminDashboard } from "./components/AdminDashboard";
import CandidateLogin from "./components/CandidateLogin";
import GeminiChat from "./components/GeminiChat";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import PDFAnalyzer from "./components/PDFAnalyzer";
import PersonalityTest from "./components/PersonalityTest";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import StudentResults from "./components/StudentResults";

function App() {
  return (
    <Router>
      <Header />
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
  );
}

export default App;
