import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-[90%] mx-auto bg-brand-dark">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-[var(--secondary-color)]">
          quizzify
        </h1>
        <ul className="hidden sm:flex gap-6 text-black">
          {["Features", "How It Works", "Pricing"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.replace(/\s+/g, "").toLowerCase()}`}
                className="hover:text-[var(--secondary-color)]"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="px-4 py-2 bg-[var(--accent-color)] text-white rounded-full"
          onClick={() => navigate("/signin")}
        >
          Sign in
        </button>
      </div>
    </nav>
  );
}
