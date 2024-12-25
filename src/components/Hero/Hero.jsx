import React from "react";
import newScroll1 from "../../assets/scroll1.png";
import newScroll2 from "../../assets/scroll2.png";
import newScroll3 from "../../assets/scroll3.png";
import newScroll4 from "../../assets/scroll4.png";
import scroll1 from "../../assets/newScroll1.png";
import scroll2 from "../../assets/2.png";
import scroll3 from "../../assets/3.png";
import scroll4 from "../../assets/4.png";
import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="bg-green-50 flex md:flex-row flex-col justify-center items-center px-4 md:px-8 lg:gap-32 lg:min-h-[calc(100vh-96px)] md:gap-4 bg-bg-primary text-black py-4">
      {/* #ddebf9 */}
      <div className="flex gap-2 scale-90 sm:scale-100 lg:scale-150 flex-nowrap p-4 md:p-8">
        {/* Section for animation */}
        <div
          id="scroll-container"
          className=" w-20"
        >
          <div className="scroll-text delay-0">
            <img
              src={scroll1}
              alt="Scroll 1"
            />
          </div>
        </div>
        <div
          id="scroll-container"
          className=" w-20"
        >
          <div className="scroll-text delay-1">
            <img
              src={scroll2}
              alt="Scroll 2"
            />
          </div>
        </div>
        <div
          id="scroll-container"
          className=" w-20"
        >
          <div className="scroll-text delay-2">
            <img
              src={scroll3}
              alt="Scroll 3"
            />
          </div>
        </div>
        <div
          id="scroll-container"
          className=" w-20"
        >
          <div className="scroll-text delay-3">
            <img
              src={scroll4}
              alt="Scroll 4"
            />
          </div>
        </div>
        {/* section for animation ends */}
      </div>

      {/* section for text */}
      <div className="flex flex-col md:items-start items-center text-center md:text-start gap-4 scale-75 md:scale-90 lg:scale-105">
        <h1 className="text-[#15415c] font-bold text-justify text-3xl ">
          Discover Your True Self
          <br className="md:block hidden"/>
          with Our Personality Detection
        </h1>
        <h2 className="my-2  text-lg font-semibold w-[32ch]">
          Unlock the Secrets of Your Personality
        </h2>

        <p className="text-w text-sm text-justify max-w-[50ch]">
          Our advanced personality detection tool
          uses cutting-edge algorithms to analyze
          your responses and provide deep insights
          into your unique personality traits.
          Whether you're looking to understand
          yourself better, improve your
          relationships, or enhance your career,
          our tool offers valuable information to
          help you achieve your goals. Discover
          the strengths and areas for growth that
          make you who you are, and take the first
          step towards a more self-aware and
          fulfilling life.
        </p>

        <button className="bg-[#235a7c] w-44 text-white hover:scale-110 duration-300 px-4 py-2 rounded-lg">
          <Link to="/candidate-login">
            Get Started
          </Link>
        </button>
      </div>
    </div>
  );
}
