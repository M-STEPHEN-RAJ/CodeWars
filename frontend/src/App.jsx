import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuestionProvider } from "./Context/QuestionContext";
import CodeEditor from "./Pages/CodeEditor/CodeEditor";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RulePage from "./Pages/RulePage/RulePage";

const App = () => {
  useEffect(() => {
    const enterFullScreen = () => {
      const elem = document.documentElement;
      if (!document.fullscreenElement) {
        elem.requestFullscreen().catch((err) => console.error("Fullscreen failed:", err));
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        document.addEventListener("click", enterFullScreen, { once: true });
      }
    };

    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "r") {
        event.preventDefault(); // Block normal reload
      }
    };

    document.addEventListener("click", enterFullScreen, { once: true });
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", enterFullScreen);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <QuestionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/rules" element={<RulePage />} />
          <Route path="/code-editor" element={<CodeEditor />} />
        </Routes>
      </Router>
    </QuestionProvider>
  );
};

export default App;
