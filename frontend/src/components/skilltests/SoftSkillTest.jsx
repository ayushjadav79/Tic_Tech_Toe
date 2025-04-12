// src/components/skilltests/TechnicalTest.jsx
import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import Result from './Result';
import './technical-skills.css';

const questions = [
  {
    question: "What does 'OOP' stand for in programming?",
    options: ["Object-Oriented Programming", "Operational Overhead Protocol", "Optional Output Processing", "Overload Operator Practice"],
    correct: 0,
  },
  {
    question: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1,
  },
  // Add more as needed...
];

export default function TechnicalTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    const updated = [...selectedOptions];
    updated[currentIndex] = optionIndex;
    setSelectedOptions(updated);
  };

  const handleNext = () => setCurrentIndex((i) => i + 1);
  const handlePrev = () => setCurrentIndex((i) => i - 1);
  const handleSubmit = () => setShowResult(true);

  const calculateScore = () =>
    selectedOptions.reduce((score, answer, index) =>
      answer === questions[index].correct ? score + 1 : score, 0
    );

  if (showResult) {
    return <Result score={calculateScore()} total={questions.length} />;
  }

  return (
    <div className="technical-test-container max-w-3xl mx-auto p-6">
      <Timer duration={120} />
      <QuestionCard
        question={questions[currentIndex]}
        selectedOption={selectedOptions[currentIndex]}
        onOptionSelect={handleOptionSelect}
      />
      <div className="nav-buttons">
        <button onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );  
}
