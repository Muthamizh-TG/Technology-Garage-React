import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import LearnAi from "./pages/learn-ai";
import About from "./pages/about";
import Courses from "./pages/courses";
import Footer from "./components/footer";

export default function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn-ai" element={<LearnAi />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
