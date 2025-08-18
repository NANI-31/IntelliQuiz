import React from "react";

const steps = [
  {
    title: "Enter Your Topic",
    description:
      "Simply type in any subject you want to learn more about. Our AI accepts any topic, from broad categories to specific concepts.",
    image: "/TopicEnter.png",
  },
  {
    title: "Take the Quiz",
    description:
      "Answer a short quiz to help the system gauge your current understanding of the topic.",
    image: "/QuizImage.png",
  },
  {
    title: "Get Personalized Results",
    description:
      "Receive tailored learning materials and suggestions based on your quiz performance.",
    image: "/Analysis.png",
  },
];

export default function HowItWorks() {
  const activeIndex = 0; // Replace with dynamic state for sliding

  return (
    <div className="pt-3 mt-20" id="howitworks">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--primary-color)] text-center">
          How It Works
        </h2>
        <p className="w-full text-center sm:w-3/4 md:w-2/3 sm:text-lg">
          Go from topic to personalized learning in three simple steps
        </p>

        <div className="w-full sm:w-3/4 md:w-2/3 border-4 border-[var(--vivid-sky-blue)] rounded-lg overflow-hidden">
          {/* Image section */}
          <div className="relative h-64 overflow-hidden rounded-b-none">
            {steps.map((step, i) => (
              <img
                key={i}
                src={step.image}
                alt={step.title}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ${
                  i === activeIndex
                    ? "opacity-100 translate-x-0 z-10"
                    : "opacity-0 -translate-x-full z-0"
                }`}
              />
            ))}
          </div>

          {/* Text section */}
          <div className="bg-[var(--vivid-sky-blue)] text-center p-4 rounded-t-none">
            <h3 className="text-xl font-bold">{steps[activeIndex].title}</h3>
            <p className="w-4/5 mx-auto font-medium text-md">
              {steps[activeIndex].description}
            </p>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center w-full gap-2 mt-4 sm:w-3/4 md:w-2/3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-1/3 h-3 rounded-full bg-gray-400 overflow-hidden relative cursor-pointer`}
            >
              <div
                className={`absolute top-0 left-0 h-full transition-all duration-200 ${
                  i === activeIndex ? "bg-[var(--primary-color)] w-full" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
