// src/components/skilltests/QuestionCard.jsx
import React from 'react';

export default function QuestionCard({ question, selectedOption, onOptionSelect }) {
  return (
    <div className="question-card">
      <h2>{question.question}</h2>
      {question.options.map((option, index) => (
        <label
          key={index}
          className={`option ${selectedOption === index ? 'selected' : ''}`}
        >
          <input
            type="radio"
            name="option"
            value={index}
            checked={selectedOption === index}
            onChange={() => onOptionSelect(index)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
