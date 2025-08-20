import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const features = {
  free: ["1 Quiz Included", "Detailed explanations", "Detailed analytics"],
  pro: ["300 Quizzes per month", "Detailed explanations", "Detailed analytics"],
};

function FeatureList({ items }) {
  return (
    <div className="mt-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 my-1">
          <FaCheck className="text-green-500" />
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
}

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section className="w-full pt-2 border" id="pricing">
      <div className="flex flex-col items-center gap-4 mt-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--primary-color)]">
          Pricing
        </h2>
        <p className="w-[90%] sm:w-[70%] sm:text-lg">
          Simple, transparent pricing. Choose the plan that works for your
          learning needs.
        </p>
      </div>

      {/* <div className="flex grid-cols-1 gap-5 mx-auto mt-6 border gridd md:grid-cols-4 "> */}
      <div className="flex justify-center gap-5 mx-auto mt-6 ">
        {/* Free Plan */}
        <div className="bg-[var(--text-light)] border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-bold">Free</h3>
          <p>Basic learning tools for casual users</p>
          <div className="flex items-center gap-1 my-2">
            <span className="text-3xl font-bold text-[var(--secondary-color)]">
              ₹0
            </span>
            <span className="font-bold">/lifetime</span>
          </div>
          <div className="text-center">
            <button
              className="w-3/4 border border-[var(--secondary-color)] p-2 rounded-lg text-[var(--secondary-color)] bg-white hover:bg-[var(--non-photo-blue)] transition"
              onClick={() => navigate("/signin")}
            >
              Get Started
            </button>
          </div>
          <FeatureList items={features.free} />
        </div>

        {/* Pro Plan */}
        <div className="bg-[var(--text-light)] rounded-lg p-6 ring-2 ring-[var(--secondary-color)]">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">Pro</h3>
            <span className="bg-[var(--accent-color)] text-white rounded-full px-2 text-sm">
              Popular
            </span>
          </div>
          <p>Enhanced features for serious learners</p>
          <div className="flex items-center gap-1 my-2">
            <span className="text-3xl font-bold text-[var(--secondary-color)]">
              ₹500
            </span>
            <span className="font-bold">/month</span>
          </div>
          <div className="text-center">
            <button
              className="w-3/4 bg-[var(--secondary-color)] p-2 rounded-lg text-white hover:bg-[var(--accent-color)] transition"
              onClick={() => navigate("/signin")}
            >
              Get Started
            </button>
          </div>
          <FeatureList items={features.pro} />
        </div>
        <div className="bg-[var(--text-light)] rounded-lg p-6 ring-2 ring-[var(--secondary-color)]">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">Pro</h3>
            <span className="bg-[var(--accent-color)] text-white rounded-full px-2 text-sm">
              Popular
            </span>
          </div>
          <p>Enhanced features for serious learners</p>
          <div className="flex items-center gap-1 my-2">
            <span className="text-3xl font-bold text-[var(--secondary-color)]">
              ₹700
            </span>
            <span className="font-bold">/month</span>
          </div>
          <div className="text-center">
            <button
              className="w-3/4 bg-[var(--secondary-color)] p-2 rounded-lg text-white hover:bg-[var(--accent-color)] transition"
              onClick={() => navigate("/signin")}
            >
              Get Started
            </button>
          </div>
          <FeatureList items={features.pro} />
        </div>
      </div>
    </section>
  );
}
