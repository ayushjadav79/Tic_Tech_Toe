import React, { useState } from 'react';

const CreateAssessmentForm = () => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have the JWT token available in localStorage or state
    const token = localStorage.getItem('jwt_token'); // or get from context/state

    const response = await fetch('http://localhost:5000/api/assessments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        topic: topic,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setResponseMessage('Assessment created successfully!');
    } else {
      setResponseMessage(`Error: ${data.error}`);
    }
  };

  return (
    <div>
      <h2>Create New Assessment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Assessment</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default CreateAssessmentForm;
