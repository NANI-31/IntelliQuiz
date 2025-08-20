import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import PrivacyPolicy from "./components/hero/PrivacyPolicy";
import TandC from "./components/hero/TandC";
import Signin from "./pages/Signin";
import Logout from "./components/Logout";

import SidebarLayout from "./components/SidebarLayout";
import Quiz from "./pages/Quiz";
import History from "./pages/History";
import QuizPrompt from "./components/quiz/QuizPrompt";
import Pricing from "./components/hero/Pricing";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/" element={<SidebarLayout />}>
            <Route path="/generate" element={<QuizPrompt />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/history" element={<History />} />
            <Route path="/pricing" element={<Pricing />} />
          </Route>
          {/* <Route path="/" element={<Sidebar />} /> */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-services" element={<TandC />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
