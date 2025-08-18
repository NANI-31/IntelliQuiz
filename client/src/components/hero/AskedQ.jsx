import { FaPlus } from "react-icons/fa6";

const faqData = [
  {
    question: "What subjects and topics are supported?",
    answer:
      "Quizzify covers virtually any academic or professional topic. Our AI can generate quizzes on specific sub-topics or comprehensive assessments across broader subjects.",
  },
  {
    question: "In Free tier, do we get 1 quiz each month?",
    answer: "No, the 1 quiz is not on a monthly basis.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
];

function FAQItem({ question, answer }) {
  return (
    <div className="border-b border-gray-300">
      <button className="flex items-center justify-between w-full py-5">
        <span className="font-medium text-gray-800">{question}</span>
        <FaPlus className="text-gray-700 transition-transform duration-300" />
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0">
        <p className="pb-5 text-gray-600">{answer}</p>
      </div>
    </div>
  );
}

export default function AskedQ() {
  return (
    <section className="pt-2 mt-12 mb-2">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl text-cyan-700">
          Frequently Asked Questions
        </h2>
        <p className="w-[90%] sm:w-[70%] sm:text-lg text-gray-600">
          Find answers to common questions about Quizzify
        </p>
        <div className="w-[80%] sm:w-[70%] text-left">
          {faqData.map((faq, idx) => (
            <FAQItem key={idx} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
