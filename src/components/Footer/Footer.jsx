import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          {/* Project Name and Motto */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Personality Detection AI
            </h2>
            <p className="text-gray-700 font-medium">
              Discover Your True Self with Our
              Personality Detection
            </p>
            <p className="text-gray-600">
              Unlock the Secrets of Your
              Personality
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-sm leading-relaxed">
              Our advanced personality detection
              tool uses cutting-edge algorithms to
              analyze your responses and provide
              deep insights into your unique
              personality traits. Whether you're
              looking to understand yourself
              better, improve your relationships,
              or enhance your career, our tool
              offers valuable information to help
              you achieve your goals. Discover the
              strengths and areas for growth that
              make you who you are, and take the
              first step towards a more self-aware
              and fulfilling life.
            </p>
          </div>

          {/* Team Section */}
          <div className="pt-6">
            <h3 className="text-gray-800 font-semibold mb-3">
              Our Team
            </h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <span className="text-gray-600">
                Himanshu Haldar
              </span>
              <span className="text-gray-600">
                Shanvi Deep
              </span>
              <span className="text-gray-600">
                Adarsh Tripathi
              </span>
              <span className="text-gray-600">
                Vikas Kashyap
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 text-sm text-gray-600">
            © 2024 Personality Detection AI. All
            rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
