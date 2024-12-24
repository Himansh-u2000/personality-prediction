import React, {
  useState,
  useEffect,
} from "react";
import { Upload, FileText } from "lucide-react";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY =
    "AIzaSyAy_iW2jpiMW1UgjUyjqlMaHxXdLmRmj0I";
  const [pdfjs, setPdfjs] = useState(null);

  useEffect(() => {
    import("pdfjs-dist").then(async (pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      setPdfjs(pdfjs);
    });
  }, []);

  const validateFile = (file) => {
    if (file.type !== "application/pdf") {
      throw new Error(
        "Please upload only PDF files"
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error(
        "File size must be less than 5MB"
      );
    }
  };

  const extractTextFromPDF = async (file) => {
    if (!pdfjs) {
      throw new Error(
        "PDF.js is not initialized yet. Please try again."
      );
    }

    try {
      // Convert file to ArrayBuffer
      const buffer = await file.arrayBuffer();
      // Load PDF document
      const pdf = await pdfjs.getDocument({
        data: buffer,
      }).promise;
      let fullText = "";

      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const textContent =
            await page.getTextContent();
          const pageText = textContent.items
            .map((item) => item.str)
            .join(" ");
          fullText += pageText + " ";
        } catch (pageError) {
          console.error(
            `Error extracting text from page ${i}:`,
            pageError
          );
        }
      }

      if (!fullText.trim()) {
        throw new Error(
          "No readable text found in the PDF. Please ensure the PDF contains selectable text."
        );
      }

      return fullText.trim();
    } catch (error) {
      console.error(
        "PDF extraction error:",
        error
      );
      throw new Error(
        "Failed to extract text from PDF. Please ensure the file is not corrupted and contains selectable text."
      );
    }
  };

  const analyzeResume = async (resumeText) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
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
                    text: `Analyze this resume text and provide a single number from 0-100 based on these criteria:
                - Leadership qualities (30 points)
                - Communication skills (30 points)
                - Career progression (20 points)
                - Technical skills (20 points)
                
                Resume text: ${resumeText}
                
                Respond with ONLY a number between 0-100, no other text.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `API error: ${response.status}`
        );
      }

      const data = await response.json();
      if (
        !data.candidates?.[0]?.content?.parts?.[0]
          ?.text
      ) {
        throw new Error("Invalid API response");
      }

      const scoreText =
        data.candidates[0].content.parts[0].text;
      const scoreMatch = scoreText.match(/\d+/);
      return scoreMatch
        ? Math.min(100, parseInt(scoreMatch[0]))
        : 75;
    } catch (err) {
      console.error("Analysis error:", err);
      throw new Error(
        "Failed to analyze resume. Please try again."
      );
    }
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      validateFile(selectedFile);
      setFile(selectedFile);
      setLoading(true);
      setError(null);

      console.log("Extracting text from PDF...");
      const resumeText = await extractTextFromPDF(
        selectedFile
      );
      console.log(
        "Extracted text length:",
        resumeText.length
      );

      if (!resumeText || resumeText.length < 50) {
        throw new Error(
          "Not enough text extracted from the PDF. Please ensure the PDF contains selectable text."
        );
      }

      console.log("Analyzing resume...");
      const personalityScore =
        await analyzeResume(resumeText);
      setScore(personalityScore);
    } catch (err) {
      console.error("Processing error:", err);
      setError(
        err.message ||
          "Failed to process resume. Please try again."
      );
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg bg-gray-50">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2 text-blue-600">
          Resume Personality Analyzer
        </h2>
        <p className="text-gray-600">
          Upload your resume (PDF format only)
        </p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="resume-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 border-blue-300"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {file ? (
              <div className="flex items-center">
                <FileText className="w-8 h-8 mr-2 text-blue-500" />
                <span className="text-sm text-gray-500">
                  {file.name}
                </span>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2 text-blue-500" />
                <p className="text-sm text-gray-500">
                  Click to upload resume (PDF
                  only, max 5MB)
                </p>
              </>
            )}
          </div>
          <input
            id="resume-upload"
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          <p className="flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </p>
        </div>
      )}

      {loading && (
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">
            Processing resume...
          </p>
        </div>
      )}

      {score !== null && !loading && (
        <div className="text-center p-6 rounded-lg bg-blue-600">
          <div className="flex items-center justify-center mb-2">
            <span className="text-xl font-bold text-white">
              Analysis Complete ✓
            </span>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {score}/100
          </div>
          <p className="text-white text-sm">
            Personality Score
          </p>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
