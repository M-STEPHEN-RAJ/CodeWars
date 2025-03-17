import React, { useContext } from "react";
import { QuestionContext } from "../../context/QuestionContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { questions, setSelectedQuestion } = useContext(QuestionContext);

  return (
    <div className="sidebar">
      <h2 className="side-title">Questions</h2>

      <div className="mention-query-details">
        <div className="Completed"><div className="color-details-1"></div><span>Completed</span></div>
        <div className="Review"><div className="color-details-2"></div><span>Review</span></div>
        <div className="Unattempted"><div className="color-details-3"></div><span>Unattempted</span></div>
      </div>

      <div className="question-list">
        {questions.length > 0 ? (
          questions.map((question, index) => {
            const statusClass = question.status.toLowerCase(); // "completed", "review", "unattempted"

            return (
              <span
                key={question._id}
                className={`question ${statusClass}`}
                onClick={() => setSelectedQuestion(question)}
              >
                {index + 1}
              </span>
            );
          })
        ) : (
          <p>No questions available</p>
        )}
      </div>

      <button className="submit-btn">Submit</button>
    </div>
  );
};

export default Sidebar;
