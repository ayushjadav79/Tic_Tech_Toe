// src/components/skilltests/Result.jsx
import React from 'react';

export default function Result({ score, total }) {
  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
      <p className="text-lg">You scored {score} out of {total}</p>
      <p className="text-green-600 font-semibold mt-2">
        {score === total ? "Excellent!" : score >= total / 2 ? "Good job!" : "Keep practicing!"}
      </p>
    </div>
  );
}
