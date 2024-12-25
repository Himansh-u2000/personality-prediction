import React, { useState } from "react";
import { Send, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PDFAnalyzer = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalScore, setTotalScore] = useState("");
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyAy_iW2jpiMW1UgjUyjqlMaHxXdLmRmj0I";

  const analyzeText = async (text) => {
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }
    
    setLoading(true);
    setError(null);
    
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
                    text: `Analyze this text and provide a score from 1 to 100 (Numeric only): ${text}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const pdfScore = data.candidates[0].content.parts[0].text;
        localStorage.setItem("pdfScore", pdfScore);
        const storedScore = localStorage.getItem("candidateScore") || "0";
        const result = parseInt(pdfScore) + parseInt(storedScore);
        setTotalScore(result);
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (err) {
      setError(err.message || "Failed to analyze text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Premium Text Analyzer
              </CardTitle>
            </div>
            <p className="text-slate-500">Enter your text below for instant analysis and scoring</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write something here..."
                className="w-full h-48 p-4 rounded-lg border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
              />
              <div className="absolute bottom-4 right-4 text-slate-400 text-sm">
                {text.length} characters
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => analyzeText(text)}
                disabled={loading}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Analyze Text</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-600">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {totalScore && (
              <div className="mt-6 p-6 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-slate-700">Analysis Complete</h3>
                    <p className="text-slate-500">Your text has been analyzed successfully</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {totalScore}
                    </div>
                    <div className="text-sm text-slate-500">Total Score</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PDFAnalyzer;