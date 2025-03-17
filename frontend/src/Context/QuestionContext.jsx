import React, { createContext, useState, useEffect } from "react";
import { fetchQuestions } from "../utils/api"; 

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const data = await fetchQuestions();
                if (!data || !Array.isArray(data)) {
                    console.error("Invalid question data:", data);
                    return;
                }

                const updatedQuestions = data.map(q => ({ ...q, status: q.status || "Unattempted" }));
                setQuestions(updatedQuestions);

                // Automatically select the first question
                if (updatedQuestions.length > 0) {
                    setSelectedQuestion(updatedQuestions[0]);
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        loadQuestions();
    }, []);

    const updateQuestionStatus = (id, newStatus) => {
        setQuestions(prevQuestions => 
            prevQuestions.map(q => (q._id === id ? { ...q, status: newStatus } : q))
        );
    };

    const selectQuestion = (question) => {
        setSelectedQuestion(question);
    };

    return (
        <QuestionContext.Provider value={{ questions, selectedQuestion, setSelectedQuestion: selectQuestion, updateQuestionStatus }}>
            {children}
        </QuestionContext.Provider>
    );
};
