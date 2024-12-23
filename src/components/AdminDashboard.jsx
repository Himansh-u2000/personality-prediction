import React, {
  useEffect,
  useState,
} from "react";
import {
  Plus,
  Save,
  Trash2,
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

// Admin Dashboard Component
const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] =
    useState("");
  const [options, setOptions] = useState([
    "",
    "",
    "",
    "",
  ]);
  const [scores, setScores] = useState([
    0, 0, 0, 0,
  ]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedQuestions =
      localStorage.getItem("questions");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const handleAddQuestion = () => {
    if (
      !currentQuestion ||
      options.some((opt) => !opt) ||
      scores.some((score) => score === "")
    ) {
      return;
    }

    const newQuestion = {
      id: Date.now(),
      question: currentQuestion,
      options: options.map((option, index) => ({
        text: option,
        score: parseInt(scores[index]),
      })),
    };

    localStorage.setItem(
      "questions",
      JSON.stringify([...questions, newQuestion])
    );

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion("");
    setOptions(["", "", "", ""]);
    setScores([0, 0, 0, 0]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(
      questions.filter((q) => q.id !== id)
    );
    localStorage.removeItem("questions");
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6"
      style={{ backgroundColor: "#DFF2EB" }}
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: "#4A628A" }}
          >
            Personality Test Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Question
              </label>
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) =>
                  setCurrentQuestion(
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded"
                placeholder="Enter question"
              />
            </div>

            {options.map((option, index) => (
              <div
                key={index}
                className="flex gap-4"
              >
                <div className="flex-grow">
                  <label className="block text-sm font-medium mb-1">
                    Option {index + 1}
                  </label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [
                        ...options,
                      ];
                      newOptions[index] =
                        e.target.value;
                      setOptions(newOptions);
                    }}
                    className="w-full p-2 border rounded"
                    placeholder={`Enter option ${
                      index + 1
                    }`}
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium mb-1">
                    Score
                  </label>
                  <input
                    type="number"
                    value={scores[index]}
                    onChange={(e) => {
                      const newScores = [
                        ...scores,
                      ];
                      newScores[index] =
                        e.target.value;
                      setScores(newScores);
                    }}
                    className="w-full p-2 border rounded"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={handleAddQuestion}
              className="flex items-center px-4 py-2 rounded text-white"
              style={{
                backgroundColor: "#4A628A",
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </button>
          </div>

          {saved && (
            <Alert className="mt-4 bg-green-100">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Question saved successfully!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {questions.map((q) => (
          <Card
            key={q.id}
            className="p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold mb-2">
                  {q.question}
                </h3>
                <ul className="space-y-1">
                  {q.options.map((opt, index) => (
                    <li key={index}>
                      {opt.text} (Score:{" "}
                      {opt.score})
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() =>
                  handleDeleteQuestion(q.id)
                }
                className="text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// User Personality Test Component

export { AdminDashboard };
