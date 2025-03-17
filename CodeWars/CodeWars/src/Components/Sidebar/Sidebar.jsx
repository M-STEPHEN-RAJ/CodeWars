import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setSelectedQuestion, questions }) => {

    const handleSelectQuestion = (question) => {
        if (setSelectedQuestion) {
            setSelectedQuestion(question);
        } else {
            console.error("setSelectedQuestion is not defined");
        }
    };

    return (
        <div className="sidebar">
            <h2 className='side-title'>Questions</h2>

            {/* Question Status Section */}
            <div className="mention-query-details">
                <div className="Completed">
                    <div className="color-details-1"></div>
                    <span className="text-details">Completed</span>
                </div>
                <div className="Review">
                    <div className="color-details-2"></div>
                    <span className="text-details">Review</span>
                </div>
                <div className="Unattempted">
                    <div className="color-details-3"></div>
                    <span className="text-details">Unattempted</span>
                </div>
            </div>

            {/* Dynamically Render Question Numbers with Status-Based Colors */}
            <div className="question-list">
                {questions.length > 0 ? (
                    questions.map((question, index) => {
                        // Determine the CSS class based on question status
                        let statusClass = "unattempted"; // Default
                        if (question.status === "Completed") {
                            statusClass = "completed";
                        } else if (question.status === "Review") {
                            statusClass = "review";
                        }

                        return (
                            <span
                                key={question._id || `question-${index}`} // Ensure unique keys
                                className={`question ${statusClass}`} 
                                onClick={() => handleSelectQuestion(question)}
                            >
                                {index + 1}
                            </span>
                        );
                    })
                ) : (
                    <p>No questions available</p> // Show message when empty
                )}
            </div>

            {/* Submit Button */}
            <button className="submit-btn">Submit</button>
        </div>
    );
};

export default Sidebar;
