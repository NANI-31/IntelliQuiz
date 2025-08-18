import React, { useState } from "react";
import QuizCard from "./QuizCard";
import QuizSummary from "./QuizSummary";

export default function QuizInterface({ quizData, onNewQuiz }) {
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState({
    timesPerQuestion: [],
    selectedAnswers: [],
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleNewQuiz = () => {
    setShowConfirmModal(true);
  };

  const confirmNewQuiz = () => {
    setShowConfirmModal(false);
    setSubmitted(false);
    setSummary({
      timesPerQuestion: [],
      selectedAnswers: [],
    });

    onNewQuiz(); // Notify parent to switch back to prompt screen
  };

  return (
    <>
      <QuizCard
        quizData={quizData.questions}
        onSubmit={(data) => {
          setSummary(data);
          setSubmitted(true);
        }}
      />

      {submitted && (
        <QuizSummary {...summary} quizData={quizData.questions} />

        // <div className="flex flex-col items-center justify-center">
        //   <button
        //     onClick={handleNewQuiz}
        //     className="mt-4 px-6 py-2 bg-[var(--vivid-sky-blue)] text-white font-medium rounded-lg"
        //   >
        //     New Quiz
        //   </button>
        // </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl text-center">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to create a new quiz?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmNewQuiz}
                className="px-4 py-2 text-white bg-red-500 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
