import React from "react";
import { GiGraduateCap } from "react-icons/gi";
import { FiPieChart } from "react-icons/fi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { ImEqualizer2 } from "react-icons/im";

const featuresData = [
  {
    icon: <GiGraduateCap />,
    title: "AI - Generated Quizzes",
    description:
      "Our advanced AI creates personalized quizzes on any topic you choose. Perfect for testing knowledge or preparing for exams.",
  },
  {
    icon: <FiPieChart />,
    title: "Detailed Analytics",
    description:
      "Track your performance with comprehensive statistics. Identify strengths and areas for improvement at a glance.",
  },
  {
    icon: <AiOutlineThunderbolt />,
    title: "Instant Feedback",
    description:
      "Receive immediate answers and explanations after each question. Understand why your answers were right or wrong.",
  },
  {
    icon: <ImEqualizer2 />,
    title: "Customizable Difficulty",
    description:
      "Set your preferred difficulty level from easy to hard or mix of all. Gradually increase challenge as your knowledge improves.",
  },
];

export default function Features() {
  return (
    <section className="mt-[50px] pt-[10px]" id="features">
      <div className="flex flex-col items-center gap-4">
        <div className="text-3xl sm:text-4xl text-center font-bold text-[var(--primary-color)]">
          Features
        </div>
        <div className="w-[90%] sm:w-[70%] text-center sm:text-lg text-balance">
          Our AI-powered quiz platform enhances your learning experience with
          personalized assessments and insightful analytics.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-[var(--vivid-sky-blue)] rounded-lg p-4 w-full"
            >
              <div className="bg-[var(--text-light)] rounded-xl p-2 w-max text-xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mt-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
