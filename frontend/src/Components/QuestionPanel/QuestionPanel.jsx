import React, { useState, useEffect, useContext } from "react";
import MonacoEditor from "@monaco-editor/react";
import OutputPanel from "../../Components/OutputPanel/OutputPanel";
import { QuestionContext } from "../../Context/QuestionContext";
import "./QuestionPanel.css";

const QuestionPanel = ({ setOutput }) => {
  const { questions, selectedQuestion, setSelectedQuestion, updateQuestionStatus } = useContext(QuestionContext);
  const [language, setLanguage] = useState("c");
  const [predefinedCode, setPredefinedCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [defaultExpectedOutput, setDefaultExpectedOutput] = useState("");

  // Load first question on mount and set expected output
  useEffect(() => {
    if (questions.length > 0 && !selectedQuestion) {
      setSelectedQuestion(questions[0]);
      if (questions[0].testCases.length > 0) {
        setDefaultExpectedOutput(questions[0].testCases[0].expectedOutput);
      }
    }
  }, [questions, selectedQuestion, setSelectedQuestion]);

  // Load predefined code & user code only once when the question changes
  useEffect(() => {
    if (selectedQuestion) {
      const predefined = selectedQuestion.predefinedCode[language] || "";
      setPredefinedCode(predefined);
      const savedCode = localStorage.getItem(`savedCode_${selectedQuestion._id}_${language}`) || "";
      setUserCode(savedCode || ""); 
    }
  }, [selectedQuestion, language]);

  // Handle Code Change (modifies only userCode)
  const handleCodeChange = (value) => {
    setUserCode(value);
    if (selectedQuestion) {
      localStorage.setItem(`savedCode_${selectedQuestion._id}_${language}`, value);
    }
  };

  const handleReset = () => {
    if (selectedQuestion) {
      const predefined = selectedQuestion.predefinedCode[language] || "";
      setUserCode(predefined);
      localStorage.setItem(`savedCode_${selectedQuestion._id}_${language}`, predefined);
    }
  };

  const handleSaveCode = () => {
    updateQuestionStatus(selectedQuestion._id, "Review"); // Change status to "Review"
  };

  // Handle Run Code
  const handleRunCode = async () => {
    if (!selectedQuestion) return;

    updateQuestionStatus(selectedQuestion._id, "Completed");

    try {
      let results = [];
      for (let testCase of selectedQuestion.testCases) {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language,
            version: "*",
            files: [{ content: userCode }],
            stdin: testCase.input,
          }),
        });

        const result = await response.json();
        results.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result.run?.output?.trim() || "No output",
        });
      }

      setTestResults(results);
      setOutput(results.map(res => res.actualOutput).join("\n"));
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error executing code.");
    }
  };

  return (
    <div className="main-content">
      {selectedQuestion ? (
        <>
          <div className="difficulty-details">
            <p>{selectedQuestion.difficulty} : {selectedQuestion.points}</p>
          </div>
          <h2 className="question-title">{selectedQuestion.title}</h2>
          <p className="question-description">{selectedQuestion.description}</p>
        </>
      ) : (
        <p className="placeholder-text">Select a question to start coding.</p>
      )}

      <div className="code-aspect">
        <div className="select-lan">
          <label className="select-lan-label">Select Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {[
              { value: "c", label: "C" },
              { value: "java", label: "Java" },
              { value: "python", label: "Python" }
            ].map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <p onClick={handleReset}>&#8634;&nbsp;Reset</p>
      </div>

      {/* 🚀 Monaco Editor with copy-paste disabled */}
      <MonacoEditor
        height="380px"
        width="100%"
        language={language}
        theme="vs-dark"
        value={userCode}  // 🚀 Only user-written code is editable!
        onChange={handleCodeChange}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          readOnly: false,
          lineNumbers: "on",
          contextmenu: false, // Disable right-click menu
        }}
        onMount={(editor) => {
          // Disable CTRL+C, CTRL+V, CTRL+X
          editor.onKeyDown((e) => {
            if (
              (e.ctrlKey || e.metaKey) &&
              (e.code === "KeyC" || e.code === "KeyV" || e.code === "KeyX")
            ) {
              e.preventDefault();
              e.stopPropagation();
              alert("Copy-Paste is disabled for this challenge!");
            }
          });

          // Optional: Block mouse right-click copy/paste
          editor.getDomNode().addEventListener("copy", (e) => e.preventDefault());
          editor.getDomNode().addEventListener("paste", (e) => e.preventDefault());
          editor.getDomNode().addEventListener("cut", (e) => e.preventDefault());
        }}
      />

      <div className="button-group">
        <button className="run-btn" onClick={handleRunCode}>Run</button>
        <button className="save-btn" onClick={handleSaveCode}>Save</button>
      </div>

      <OutputPanel 
        testCases={testResults.length > 0 ? testResults : selectedQuestion?.testCases || []} 
        output={testResults.map(res => res.actualOutput).join("\n")}
        expectedOutput={defaultExpectedOutput}
      />
    </div>
  );
};

export default QuestionPanel;
