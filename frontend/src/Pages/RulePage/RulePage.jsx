import React from "react";
import { Link } from "react-router-dom";
import "./RulePage.css";

const RulePage = () => {

  const eventInfo = [
    "Participants can choose their own desired question to solve first.",
    "Duration Time: 1 hr",
    "Questions: 15",
    "Question Types: Easy, Medium, Hard.",
    "Jury’s decision will be taken as the final decision.",
  ];

  const rules = [
    "Use of Mobile is Prohibited.",
    "Switching Window is Prohibited.",
    "The winners will be shortlisted by Points.",
    "Violation of any rule can result in elimination.",
  ];

  return (
    <div className="rule-main-container">
      <div className="rule-container">
        <h1>
          <span className="title-cursive">CODE</span> WARS
        </h1>

        <div className="details">
          <h3>Event Information</h3>
          {eventInfo.map((info, index) => (
            <p key={index}>{info}</p>
          ))}
        </div>

        <div className="rules">
          <h3>Rules</h3>
          {rules.map((rule, index) => (
            <p key={index}>{rule}</p>
          ))}
        </div>

        <Link to="/code-editor">
          <button className="cta">Start</button>
        </Link>
      </div>
    </div>
  );
};

export default RulePage;
