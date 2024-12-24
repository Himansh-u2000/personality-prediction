import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
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

const CandidateLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    studentId: "",
  });

  const departments = [
    "Computer Science",
    "Engineering",
    "Business",
    "Arts",
    "Science",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate form
    if (!formData.email || !formData.password) {
      setError(
        "Please fill in all required fields"
      );
      setLoading(false);
      return;
    }

    if (
      !isLogin &&
      (!formData.name ||
        !formData.department ||
        !formData.studentId)
    ) {
      setError(
        "Please fill in all required fields"
      );
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(
        "Please enter a valid email address"
      );
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      // Here you would typically make your actual API call
      // const response = await fetch('/api/auth', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      

      // Redirect to personality test
      console.log("Login successful:", formData);

      window.location.href = "/tests";
    } catch (err) {
      setError(
        "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#DFF2EB" }}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle
            className="text-2xl font-bold text-center"
            style={{ color: "#4A628A" }}
          >
            {isLogin
              ? "Welcome Back!"
              : "Create Account"}
          </CardTitle>
          <p className="text-center text-gray-500">
            {isLogin
              ? "Sign in to take your personality test"
              : "Register to begin your personality assessment"}
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {!isLogin && (
              <div className="space-y-4">
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="relative">
                  <select
                    name="department"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="">
                      Select Department
                    </option>
                    {departments.map((dept) => (
                      <option
                        key={dept}
                        value={dept}
                      >
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="studentId"
                    placeholder="Student ID"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.studentId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg text-white flex items-center justify-center space-x-2 disabled:opacity-50"
              style={{
                backgroundColor: "#4A628A",
              }}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>
                    {isLogin
                      ? "Sign In"
                      : "Create Account"}
                  </span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    department: "",
                    studentId: "",
                  });
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateLogin;
