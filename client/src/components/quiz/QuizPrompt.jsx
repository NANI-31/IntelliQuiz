// components/quiz/QuizPrompt.jsx

import React from "react";
import { GoArrowRight } from "react-icons/go";
import LoadingWrapper from "./LoadingWrapper";

export default function QuizPrompt({
  text,
  setText,
  level,
  setLevel,
  isDataLoading,
  handleSubmit,
}) {
  return (
    <div className="w-full overflow-y-auto md:w-[70%] lg:w-[80%]">
      <div className="flex flex-col items-center justify-center w-full h-screen p-1">
        <div className="p-2 mb-4 text-2xl font-bold text-center text-[var(--secondary-color)] sm:text-3xl">
          What topic would you like to be quizzed on?
        </div>

        <LoadingWrapper loading={isDataLoading} message="loading the Quiz..." />

        <div className="w-[90%] sm:w-3/4 max-w-[600px] shadow shadow-gray-200 border border-gray-300 rounded-xl p-2 relative">
          <textarea
            className="w-full p-2 outline-none resize-none rounded-xl"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="2"
            placeholder="Enter the topic"
          ></textarea>

          <div className="flex gap-2 mt-2 sm:justify-center">
            {["easy", "medium", "hard", "mix"].map((lvl) => (
              <div
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-1 text-sm sm:text-md sm:p-1 sm:px-3 rounded-full cursor-pointer ${
                  level === lvl
                    ? "bg-[var(--vivid-sky-blue)] text-white border-[var(--vivid-sky-blue)]"
                    : "bg-white text-black border border-gray-300 hover:border-[var(--vivid-sky-blue)] hover:text-[var(--primary-color)]"
                }`}
              >
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </div>
            ))}
          </div>

          <div className="absolute right-2 bottom-2">
            <button
              className="p-1 text-white bg-[var(--vivid-sky-blue)] rounded-full w-max disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={!text.trim()}
            >
              <GoArrowRight />
            </button>
          </div>
        </div>

        <button className="w-max bg-slate-200 max-w-[600px] mt-4 text-sm sm:text-md text-gray-700 p-2 rounded-lg font-medium disabled:cursor-not-allowed disabled:opacity-50">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <div>Upgrade to</div>
              <div className="px-1 text-white bg-[var(--vivid-sky-blue)] rounded">
                Pro
              </div>
            </div>
            <div className="bg-white text-[var(--vivid-sky-blue)] rounded-full w-[25px] h-[25px] flex items-center justify-center p-1">
              <GoArrowRight />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
