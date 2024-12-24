import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import {
  Send,
  User,
  Bot,
  Loader,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGeminiAPI = async (message) => {
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
                    text: message,
                  },
                ],
              },
            ],
            key: "AIzaSyAy_iW2jpiMW1UgjUyjqlMaHxXdLmRmj0I",
          }),
        }
      );

      const data = await response.json();
      return data.candidates[0].content.parts[0]
        .text;
    } catch (error) {
      console.error("Error:", error);
      return "Sorry, I encountered an error. Please try again.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage("");
    setMessages((prev) => [
      ...prev,
      { text: userMessage, isUser: true },
    ]);
    setIsLoading(true);

    const response = await callGeminiAPI(
      userMessage
    );
    setIsLoading(false);
    setMessages((prev) => [
      ...prev,
      { text: response, isUser: false },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle
            className="text-xl font-bold"
            style={{ color: "#4A628A" }}
          >
            Chat with Gemini
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.isUser
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.isUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="min-w-[24px] mt-1">
                        {message.isUser ? (
                          <User className="w-5 h-5" />
                        ) : (
                          <Bot className="w-5 h-5" />
                        )}
                      </div>
                      <p className="whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <div className="p-4 border-t">
          <form
            onSubmit={handleSendMessage}
            className="flex space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) =>
                setInputMessage(e.target.value)
              }
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white flex items-center space-x-2 disabled:opacity-50"
              style={{
                backgroundColor: "#4A628A",
              }}
              disabled={
                isLoading || !inputMessage.trim()
              }
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default GeminiChat;
