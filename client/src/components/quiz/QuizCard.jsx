import React, { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const QuizCard = ({ quizData, onSubmit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [open, setOpen] = useState(false);

  const [startTime, setStartTime] = useState(Date.now());
  const [timesPerQuestion, setTimesPerQuestion] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quizData.length).fill(null)
  );
  const isSubmitEnabled = selectedAnswers.every((ans) => ans !== null);

  const currentQuestion = quizData[currentIndex];
  useEffect(() => {
    setStartTime(Date.now());
  }, [currentIndex]);
  const recordTimeAndAnswer = () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    // setTimesPerQuestion((prev) => [...prev, duration]);
    setSelectedAnswers((prev) => [...prev, selectedIndex]);
  };
  const handleOptionClick = (index) => {
    if (hasSubmitted || selectedAnswers[currentIndex] !== null) return;
    if (selectedAnswers[currentIndex] === null) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[currentIndex] = index;
      setSelectedAnswers(updatedAnswers);
      setSelectedIndex(index);
      setShowAnswer(true);

      // Record time once per question
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const updatedTimes = [...timesPerQuestion];
      updatedTimes[currentIndex] = duration;
      setTimesPerQuestion(updatedTimes);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetState();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetState();
    }
  };

  const resetState = () => {
    setSelectedIndex(null);
    setShowAnswer(false);
    setOpen(false);
  };
  const handleSubmit = () => {
    recordTimeAndAnswer();
    if (hasSubmitted) return;
    setHasSubmitted(true);
    onSubmit({ timesPerQuestion, selectedAnswers });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-1 overflow-y-auto">
      <div className="relative flex flex-col items-center justify-center w-full h-full p-2 sm:w-3/5 sm:p-0">
        {/* Progress Bar */}
        <div className="flex items-center w-full gap-4">
          <div className="flex-grow h-full">
            <div className="flex items-center w-full gap-3">
              <div className="h-[7px] rounded-full flex-grow bg-gray-200">
                <div
                  className="h-full bg-[var(--secondary-color)] rounded-full"
                  style={{
                    width: `${((currentIndex + 1) / quizData.length) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="font-medium text-slate-700">
                {quizData.length - currentIndex - 1} left
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        {/* <div className="w-full flex items-center gap-4 max-h-[60vh] mt-3"> */}
        <div className="flex items-center justify-center w-full gap-4 mt-3 ">
          <div className="flex-grow h-full p-4 overflow-y-auto ring-2 ring-[var(--accent-color)]/50 rounded-xl">
            <div className="w-full text-xl font-bold text-black break-words sm:text-2xl">
              {currentQuestion.question}
            </div>

            {/* Options */}
            <div className="w-full mt-4 font-medium">
              {currentQuestion.choices.map((option, idx) => {
                const isCorrect = currentQuestion.answerIndex === idx;
                const isSelected = selectedAnswers[currentIndex] === idx;

                let bgColor =
                  "bg-[var(--non-photo-blue-2)] hover:bg-[var(--non-photo-blue)]";
                if (showAnswer && isSelected) {
                  bgColor = isCorrect
                    ? "bg-green-600 text-white"
                    : "bg-red-500 text-white";
                } else if (showAnswer && isCorrect) {
                  bgColor = "bg-green-600 text-white";
                }

                return (
                  <button
                    key={idx}
                    className={`w-full p-2 mt-3 text-left break-words transition-all rounded-lg hover:shadow-inner disabled:cursor-not-allowed ${bgColor}`}
                    disabled={showAnswer}
                    onClick={() => handleOptionClick(idx)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Explanation Toggle */}
        <div className="flex items-center w-full gap-4">
          <div
            className="flex-grow bg-slate-200 cursor-pointer p-2 rounded-lg mt-3 h-auto max-h-[20vh] overflow-y-auto"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="flex items-center justify-between font-medium">
              <div>Detailed Explanation</div>
              <div className="flex items-center">
                {open ? (
                  <IoIosArrowDown className="transition-transform duration-300" />
                ) : (
                  <IoIosArrowUp className="transition-transform duration-300" />
                )}
              </div>
            </div>
            <div
              className={`w-full overflow-hidden text-sm ease-in-out
                ${
                  open
                    ? "max-h-96 opacity-100 transition-all duration-800"
                    : "max-h-0 opacity-0 transition-all duration-500"
                }`}
            >
              {currentQuestion.explanation}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center w-full gap-4 mt-3">
          <button
            className="flex items-center p-2 px-4 text-white bg-[var(--primary-color)] rounded-lg w-max disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <FaChevronLeft />
            <span className="ml-2">Prev</span>
          </button>

          <button
            className="p-2 px-3 font-medium text-white bg-[var(--marian-blue)] rounded-full w-max disabled:opacity-80 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!isSubmitEnabled || hasSubmitted}
          >
            {hasSubmitted ? "Submitted" : "Submit Quiz"}
          </button>

          <button
            className="flex items-center p-2 px-4 text-white bg-[var(--primary-color)] rounded-lg w-max disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={currentIndex === quizData.length - 1}
          >
            <span className="mr-2">Next</span>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
