import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { QuestionContext } from "../../Context/QuestionContext";


const Navbar = () => {
    const { teamName } = useContext(QuestionContext);
  const [timeLeft, setTimeLeft] = useState(getTimeUntilTarget());

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop countdown when time reaches 0

    const interval = setInterval(() => {
      const remainingTime = getTimeUntilTarget();
      setTimeLeft(remainingTime);
      if (remainingTime <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  function getTimeUntilTarget() {
    const now = new Date();
    const target = new Date(2025, 2, 26, 12, 0, 0);

    const diffInSeconds = Math.max(Math.floor((target - now) / 1000), 0); // Ensure non-negative
    return diffInSeconds;
  }

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(days).padStart(2, "0")} : ${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`;
  };

  return (
    <div>
      <nav className="navbar">
        <div className="team-name">{teamName}</div>
        <div className="timer">
          {timeLeft > 0 ? <span>Time Left &nbsp; {formatTime(timeLeft)}</span> : <span>Time Over !&nbsp;&nbsp;</span>}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
