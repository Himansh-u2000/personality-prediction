import React, {
  useEffect,
  useState,
} from "react";
import {
  FileText,
  Upload,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { pdfjs, Document, Page } from "react-pdf";

// Configure PDF.js worker
// pdfjsLib.GlobalWorkerOptions.workerSrc =
//   pdfjsWorker;

const PDFAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [extractedText, setExtractedText] =
    useState("");

  // const extractTextFromPDF = async (pdfFile) => {
  //   try {
  //     const arrayBuffer =
  //       await pdfFile.arrayBuffer();
  //     const pdf = await pdfjsLib.getDocument({
  //       data: arrayBuffer,
  //     }).promise;
  //     let text = "";

  //     for (let i = 1; i <= pdf.numPages; i++) {
  //       const page = await pdf.getPage(i);
  //       const content =
  //         await page.getTextContent();
  //       text +=
  //         content.items
  //           .map((item) => item.str)
  //           .join(" ") + "\n";
  //     }

  //     console.log("Extracted Text:", text);
  //     return text;
  //   } catch (err) {
  //     throw new Error(
  //       "Failed to extract text from PDF"
  //     );
  //   }
  // };

  const analyzeText = async (
    text = `Adarsh Chaudhary
LINKEDIN -https://www.linkedin.com/in/adarsh-chaudhary-912329173/
Codechef: https://www.codechef.com/users/adarshch18
Codeforces: https://codeforces.com/prole/KRISH_FOUSC
Mobile:
+91 - 9528286663
Email:
akulchaudhary786@gmail.com
EXPERIENCE
Naya Savera Parivar, Jharkhand — Intern
December 2023 - January 2024
During my internship at Naya Savera Paivar, I played a pivotal role in the development of their
website using the MERN stack (MongoDB, Express.js, React.js, Node.js). I was responsible for both
the frontend and backend development, ensuring a seamless and ecient user experience. On the
frontend, I designed and implemented a responsive and intuitive user interface, while on the
backend, I developed robust APIs and integrated them with the database to manage and process data
eectively.
My work contributed to the successful launch of the website, which enhanced the organization’s
digital presence and streamlined their operations. This experience honed my skills in full-stack
development and reinforced my ability to deliver high-quality, scalable web solutions.
EDUCATION
Quantum University, Roorkee — B. Tech
September 2021 - August 2025
8.6 CGPA
Adarsh Public School, Kota—Class XII
April 2020 - March 2021
84% in PCM
Keshav Madhav S.V.M, Bulandshahr— Class X
April 2018 - March 219
93.2 % in Academics. Gold Medalist in karate in state Level
PROJECTS
Mental Health Companion App — Mobile Application
Developed an application to connect patients with doctors online and provide a chatbot
for patient queries. Designed and implemented user-friendly interfaces and integrated
real-time communication features. Built a robust backend to ensure secure and ecient
data handling. Enhanced patient access to healthcare and provided immediate support
through the chatbot.
SKILLS
Algorithm Design and Analysis
Problem Decomposition and
Creative Solution.
MERN Stack
(MongoDB, Express Js,React, Node
js)
AWARDS
Runner Up Inter College
Hackathon
Developed and implemented a
comprehensive tourism management
system using Node Js, MySQL, and
JavaScript, leading to a 35% increase
in booking eciency..
Codechef: Rating 5 star
Global Rank 39/30000 @ codechef
Global Rank 27 in Div2 @ codechef
Winner of Intra College
Hackathon
Ledger Book Application - Mobile
App
Developed a comprehensive application
`
  ) => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Analyze this text and provide a summary: ${text}`,
                  },
                ],
              },
            ],
            key: "AIzaSyAy_iW2jpiMW1UgjUyjqlMaHxXdLmRmj0I",
          }),
        }
      );

      const data = await response.json();
      console.log(
        data.candidates[0].content.parts[0].text
      );
      return data.candidates[0].content.parts[0]
        .text;
    } catch (err) {
      throw new Error("Failed to analyze text");
    }
  };

  useEffect(() => {
    analyzeText();
  }, []);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(
        "File size must be less than 10MB"
      );
      return;
    }

    setFile(selectedFile);
    setLoading(true);
    setError(null);

    try {
      // Extract text from PDF
      // const text = await extractTextFromPDF(
      //   selectedFile
      // );

      setExtractedText(text);

      // Analyze text using Gemini API
      const analysisResult = await analyzeText(
        text
      );
      setAnalysis(analysisResult);
    } catch (err) {
      setError(
        err.message || "Failed to process PDF"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6"
      style={{ backgroundColor: "#DFF2EB" }}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: "#4A628A" }}
          >
            PDF Text Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <label
              htmlFor="pdf-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
              style={{ borderColor: "#4A628A" }}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload
                  className="w-8 h-8 mb-2"
                  style={{ color: "#4A628A" }}
                />
                <p className="text-sm text-gray-500">
                  {file ? (
                    <FileText className="w-4 h-4 inline mr-2" />
                  ) : null}
                  {file
                    ? file.name
                    : "Click to upload PDF (max 10MB)"}
                </p>
              </div>
              <input
                id="pdf-upload"
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {loading && (
            <div className="text-center p-4">
              <div
                className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2"
                style={{ borderColor: "#4A628A" }}
              ></div>
              <p className="text-gray-600">
                Processing PDF...
              </p>
            </div>
          )}

          {error && (
            <Alert
              variant="destructive"
              className="mb-4"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {extractedText && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle
              className="text-xl font-bold"
              style={{ color: "#4A628A" }}
            >
              Extracted Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-60 overflow-y-auto p-4 bg-white rounded border">
              {extractedText}
            </div>
          </CardContent>
        </Card>
      )}

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle
              className="text-xl font-bold"
              style={{ color: "#4A628A" }}
            >
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded border">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                <span className="font-semibold">
                  Analysis Complete
                </span>
              </div>
              <p className="whitespace-pre-line">
                {analysis}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PDFAnalyzer;
