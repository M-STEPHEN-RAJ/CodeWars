import React from 'react'
import './CodeEditor.css'
import { useState, useEffect } from 'react'; 
import { fetchQuestions } from '../../utils/api'; // Import function to fetch questions
import Navbar from '../../Components/Navbar/Navbar'
import QuestionPanel from '../../Components/QuestionPanel/QuestionPanel'
import Sidebar from '../../Components/Sidebar/Sidebar'

const CodeEditor = ({ setOutput }) => {

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
      const loadQuestions = async () => {
          try {
              const data = await fetchQuestions();
              console.log("Loaded Questions:", data); // Debugging
              
              if (!data || !Array.isArray(data)) {
                  console.error("Error: API did not return a valid array", data);
                  return;
              }
              setQuestions(data);
          } catch (error) {
              console.error("Failed to fetch questions:", error);
          }
      };
      loadQuestions();
  }, []);
  

  


  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <div className="content">
          <QuestionPanel setOutput={setOutput} selectedQuestion={selectedQuestion} /> {/* Pass setOutput */}
        </div>
        <Sidebar  setSelectedQuestion={setSelectedQuestion} questions={questions}  />
      </div>
    </div>
  )
}

export default CodeEditor