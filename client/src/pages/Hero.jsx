import React from "react";
import Navbar from "../components/Navbar";
import Features from "../components/hero/Features";
import HowItWorks from "../components/hero/HowItWorks";
import Pricing from "../components/hero/Pricing";
import AskedQ from "../components/hero/AskedQ";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    // <div className="bg-gradient-to-r from-white via-[var(--non-photo-blue)] to-white items-center h-full ">
    <div className="items-center h-full bg-gradient-to-r from-white via-sky-100 to-white ">
      <div className="w-[90%] sm:w-[80%] mx-auto">
        <Navbar />
        <div className="mt-[80px]">
          <div className="flex flex-col items-center gap-6">
            {/* <div className="flex text-white items-center gap-2 rounded-full bg-gradient-to-r from-[var(--marian-blue)] to-[var(--pacific-cyan)] w-max p-2 px-3"> */}
            <div className="flex items-center gap-2 p-2 px-3 text-white rounded-full bg-gradient-to-r from-blue-800 to-cyan-500 w-max">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sparkles"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
              </div>
              <div className="font-medium">AI - Powered Learning</div>
            </div>
            <div className="text-4xl font-bold text-center sm:text-5xl text-sky-600">
              Quizzify Your Learning
            </div>
            <div className="w-[90%] sm:w-[70%] text-center sm:text-lg text-balance">
              Enter any topic and get instant, personalized quizzes and receive
              detailed analytics to enhance your learning.
            </div>
            <div>
              <button
                className="px-4 py-2 text-white transition-colors duration-300 rounded-full bg-cyan-600 hover:bg-cyan-700"
                onClick={() => navigate("/signin")}
              >
                Get Started
              </button>
            </div>
            <div className="h-[400px] flex justify-center items-center w-[90%] sm:w-[50%] relative overflow-hidden rounded-xl">
              <div>
                <video
                  src="/demo.mp4"
                  muted=""
                  className="object-cover w-full h-full rounded-xl"
                ></video>
              </div>
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full p-4 transition-all duration-300 cursor-pointer group hover:bg-black/20">
                <div className="flex items-center justify-center p-3 text-white transition-all duration-300 rounded-full shadow bg-gradient-to-r from-blue-700 to-cyan-500 w-max shadow-black group-hover:scale-125">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-play"
                  >
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Features />
          <HowItWorks />
          <Pricing />
          <AskedQ />
        </div>
        <div className="w-full mt-[20px]">
          <div className="p-3 py-5 text-center rounded-tl-lg rounded-tr-lg">
            <div className="text-2xl font-bold sm:text-3xl">
              Ready to Boost Your Learning Journey ?
            </div>
            <div className="my-2">
              <button
                className="px-6 py-2.5 text-white transition-colors duration-300 rounded-full shadow-md hover:shadow-lg bg-cyan-500 hover:bg-cyan-600"
                onClick={() => navigate("/signin")}
              >
                Get Started
              </button>
            </div>
            <div className="mt-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-full text-center">
                  <div className="text-xl font-bold">IntelliQuiz</div>
                  <div className="my-1 text-sm text-gray-600">
                    Copyright © 2025 - All rights reserved
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 text-gray-600 sm:flex-row">
                  <div className="text-sm hover:underline">
                    <a href="/signin">Login</a>
                  </div>
                  <div className="text-sm hover:underline">
                    <a href="#features">Features</a>
                  </div>
                  <div className="text-sm hover:underline">
                    <a href="#howitworks">How It Works</a>
                  </div>
                  <div className="text-sm hover:underline">
                    <a href="#pricing">Pricing</a>
                  </div>
                  <div className="text-sm hover:underline">
                    <a href="/terms-of-services">Terms of services</a>
                  </div>
                  <div className="text-sm hover:underline">
                    <a href="/privacy-policy">Privacy policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
