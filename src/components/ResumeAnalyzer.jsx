import React, { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    // Check file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
    ];
    if (!validTypes.includes(file.type)) {
      throw new Error(
        "Please upload only JPG/JPEG files"
      );
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error(
        "File size must be less than 5MB"
      );
    }
  };

  const analyzeResume = async (imageData) => {
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
                    text: `Analyze this resume image and provide a personality score from 0-100 based on achievements, leadership qualities, and communication skills: ${imageData}`,
                  },
                ],
              },
            ],
            key: "AIzaSyAy_iW2jpiMW1UgjUyjqlMaHxXdLmRmj0I",
          }),
        }
      );

      const data = await response.json();
      // Extract numeric score from response
      const scoreMatch =
        data.candidates[0].content.parts[0].text.match(
          /\d+/
        );
      return scoreMatch
        ? parseInt(scoreMatch[0])
        : 75; // Default score if parsing fails
    } catch (err) {
      throw new Error("Failed to analyze resume");
    }
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      // Validate file
      validateFile(selectedFile);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      setFile(selectedFile);
      setLoading(true);
      setError(null);

      // Convert image to base64 for API
      const base64Image = await new Promise(
        (resolve) => {
          const reader = new FileReader();
          reader.onloadend = () =>
            resolve(reader.result);
          reader.readAsDataURL(selectedFile);
        }
      );

      const personalityScore =
        await analyzeResume(base64Image);
      setScore(personalityScore);
    } catch (err) {
      setError(
        err.message ||
          "Failed to analyze resume. Please try again."
      );
      setFile(null);
      setImagePreview(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-md mx-auto p-6 rounded-lg"
      style={{ backgroundColor: "#DFF2EB" }}
    >
      <div className="mb-8 text-center">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: "#4A628A" }}
        >
          Resume Analyzer
        </h2>
        <p className="text-gray-600">
          Upload your resume (JPG format only)
        </p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="resume-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
          style={{ borderColor: "#4A628A" }}
        >
          {imagePreview ? (
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Resume preview"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload
                className="w-8 h-8 mb-2"
                style={{ color: "#4A628A" }}
              />
              <p className="text-sm text-gray-500">
                {file ? (
                  <ImageIcon className="w-4 h-4 inline mr-2" />
                ) : null}
                {file
                  ? file.name
                  : "Click to upload resume (JPG only, max 5MB)"}
              </p>
            </div>
          )}
          <input
            id="resume-upload"
            type="file"
            className="hidden"
            accept="image/jpeg,image/jpg"
            onChange={handleFileUpload}
          />
        </label>

        <input type="text" />
      </div>

      {loading && (
        <div className="text-center p-4">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2"
            style={{ borderColor: "#4A628A" }}
          ></div>
          <p className="text-gray-600">
            Analyzing resume...
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

      {score !== null && !loading && (
        <div
          className="text-center p-6 rounded-lg"
          style={{ backgroundColor: "#4A628A" }}
        >
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-6 h-6 text-white mr-2" />
            <h3 className="text-xl font-bold text-white">
              Analysis Complete
            </h3>
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
