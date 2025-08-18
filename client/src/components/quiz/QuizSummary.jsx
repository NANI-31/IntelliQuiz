import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const QuizSummary = ({ timesPerQuestion, selectedAnswers, quizData }) => {
  const totalSecs = timesPerQuestion.reduce((a, b) => a + b, 0);
  const avgSecs = Math.round(totalSecs / timesPerQuestion.length);

  const labels = timesPerQuestion.map((_, i) => `Q${i + 1}`);
  const data = {
    labels,
    datasets: [
      {
        label: "Time Taken",
        data: timesPerQuestion,
        fill: false,
        backgroundColor: "#4E79A7",
        borderColor: "#4E79A7",
        tension: 0.2,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `Time Taken: ${context.parsed.y} seconds`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value} s`;
          },
        },
      },
    },
  };

  const correctCount = selectedAnswers.filter((sel, idx) => {
    console.log(sel, idx);
    // const returnsel = sel === null ? -1 : sel;
    return sel === quizData[idx].answerIndex;
  }).length;
  const incorrectCount = quizData.length - correctCount;

  return (
    <div className="w-full mb-10 sm:w-3/4 sm:p-0">
      <div className="text-2xl font-bold text-center">Analytics</div>
      {/* Card layout */}
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        <div className="bg-white p-4 rounded-lg shadow shadow-purple-100 ring-2 ring-[var(--accent-color)]/50">
          <div className="text-gray-500">Total Time Taken</div>
          <div className="font-bold">
            {Math.floor(totalSecs / 60)}m {totalSecs % 60}s
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow shadow-purple-100 ring-2 ring-[var(--accent-color)]/50">
          <div className="text-gray-500">Average Time Spent per question</div>
          <div className="font-bold">
            {Math.floor(avgSecs / 60)}m {avgSecs % 60}s
          </div>
        </div>

        <div className="w-full p-4 min-w-0 min-h-0 md:col-span-2 rounded-lg h-80 ring-2 ring-[var(--accent-color)]/50">
          <div className="text-gray-500">Time Spent on each question</div>
          <div className="h-full py-4">
            <Line data={data} options={options} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow shadow-purple-100 ring-2 ring-[var(--accent-color)]/50">
          <div className="text-gray-500">Correct Answers</div>
          <div className="font-bold">
            {correctCount} / {quizData.length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow shadow-purple-100 ring-2 ring-[var(--accent-color)]/50">
          <div className="text-gray-500">Incorrect Answers</div>
          <div className="font-bold">
            {incorrectCount} / {quizData.length}
          </div>
        </div>
      </div>

      {/* Optionally list answers with review */}
    </div>
  );
};

export default QuizSummary;
