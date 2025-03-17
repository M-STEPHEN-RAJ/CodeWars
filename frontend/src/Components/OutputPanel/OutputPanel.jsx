import React, { useEffect, useState } from "react";
import "./OutputPanel.css";

const OutputPanel = ({ expectedOutput, output, testCases, questionId }) => {
  const [staticExpectedOutput, setStaticExpectedOutput] = useState("");
  const [currentOutput, setCurrentOutput] = useState("");
  const [currentTestCases, setCurrentTestCases] = useState([]);

  // Update expected output and reset test cases + output when question changes
  useEffect(() => {
    if (testCases.length > 0) {
      setStaticExpectedOutput(testCases[0].expectedOutput);
    } else {
      setStaticExpectedOutput(expectedOutput);
    }
    
    // Reset output and test cases when switching to a new question
    setCurrentOutput("");
    setCurrentTestCases([]);
  }, [questionId, testCases, expectedOutput]); // Runs only when question changes

  // Update test cases and output only after running
  useEffect(() => {
    if (output) {
      setCurrentOutput(output);
      setCurrentTestCases(testCases);
    }
  }, [output, testCases]);

  return (
    <div className="output-panel">
      <h2 className="output-expected-title">Expected Output</h2>
      <div className="output-container">
        <pre className="output-content">
          {staticExpectedOutput ? staticExpectedOutput : "// No expected output available"}
        </pre>
      </div>

      {/* Show test cases **only after running** */}
      {currentOutput && currentTestCases.length > 0 && (
        <>
          <h2 className="output-title">Test Cases</h2>
          <div className="output-container">
            {currentTestCases.map((testCase, index) => (
              <div key={index} className="test-case">
                <p><strong>Input:</strong> {testCase.input}</p>
                <p><strong>Expected:</strong> {testCase.expectedOutput}</p><br/>
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className="output-title">Output</h2>
      <div className="output-container">
        <pre className="output-content">
          {currentOutput ? currentOutput : "// Output will appear here..."}
        </pre>
      </div>
    </div>
  );
};

export default OutputPanel;
