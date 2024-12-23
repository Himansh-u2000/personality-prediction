import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

const PersonalityTest = () => {
  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [questions, setQuestions] = useState([]);
  // In real app, fetch from backend
  useEffect(() => {
    const savedQuestions =
      localStorage.getItem("questions");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (
      currentQuestionIndex <
      questions.length - 1
    ) {
      setCurrentQuestionIndex(
        currentQuestionIndex + 1
      );
    } else {
      // Calculate final score
      const totalScore = newAnswers.reduce(
        (sum, answerIndex, questionIndex) => {
          return (
            sum +
            questions[questionIndex].options[
              answerIndex
            ].score
          );
        },
        0
      );
      const averageScore = Math.round(
        totalScore / questions.length
      );
      setScore(averageScore);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center p-6">
        No questions available. Please contact the
        administrator.
      </div>
    );
  }

  if (score !== null) {
    return (
      <Card className="max-w-md mx-auto p-6 text-center">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: "#4A628A" }}
          >
            Your Personality Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-4">
            {score}/100
          </div>
          <p className="text-gray-600">
            Thank you for completing the
            personality test!
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion =
    questions[currentQuestionIndex];

  return (
    <div
      className="max-w-2xl mx-auto p-6"
      style={{ backgroundColor: "#DFF2EB" }}
    >
      <Card>
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: "#4A628A" }}
          >
            Personality Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-4">
              {currentQuestion.question}
            </h3>
            <div className="space-y-2">
              {currentQuestion.options.map(
                (option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(index)
                    }
                    className="w-full p-3 text-left rounded hover:bg-gray-100 border"
                  >
                    {option.text}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of{" "}
            {questions.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalityTest;
