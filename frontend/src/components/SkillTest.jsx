import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BarChart2, User, Settings } from 'lucide-react';
import './skill-test.css';

export default function SkillTest() {
  const navigate = useNavigate();
  // const authContext = useContext(AuthContext);
  const [topic, setTopic] = useState('');
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');

  const skills = [
    {
      icon: <Settings size={32} />,
      title: "Technical Skills",
      description: "Assess your programming, data structures, algorithms, and development skills.",
      points: [
        "Programming Languages (Python, Java, C++)",
        "Data Structures & Algorithms",
        "Web Development",
        "Database Management",
        "Version Control (Git)",
      ],
      path: "/skill-test/technical",
    },
    {
      icon: <BarChart2 size={32} />,
      title: "Analytical Skills",
      description: "Test your logical reasoning, quantitative aptitude, and data interpretation abilities.",
      points: [
        "Logical Reasoning",
        "Quantitative Aptitude",
        "Data Interpretation",
        "Problem Analysis",
        "Critical Thinking",
      ],
      path: "/skill-test/analytical",
    },
    {
      icon: <User size={32} />,
      title: "Soft Skills",
      description: "Evaluate your communication, teamwork, leadership, and problem-solving skills.",
      points: [
        "Communication",
        "Teamwork & Leadership",
        "Problem Solving",
        "Decision Making",
        "Time Management",
      ],
      path: "/skill-test/soft",
    },
  ];

  const createAssessment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/assessments`,
        { title: `${topic} Test`, topic },
        { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ0NDg1NjE0LCJleHAiOjE3NDQ0ODkyMTR9.2omVBE6s6DNCsaC-dMCahFk347y6ekwZXkLU0H4Nv68` } }
      );
      setAssessment(response.data);
      setError('');
    } catch (err) {
      setError('Failed to create skill test');
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const submitTest = async () => {
    try {
      const score = calculateScore();
      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/results`,
        { assessmentId: assessment.id, score, answers },
        { headers: {  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ0NDg1NjE0LCJleHAiOjE3NDQ0ODkyMTR9.2omVBE6s6DNCsaC-dMCahFk347y6ekwZXkLU0H4Nv68` } }
      );
      alert('Test submitted!');
    } catch (err) {
      setError('Failed to submit test');
    }
  };

  const calculateScore = () => {
    let score = 0;
    assessment.questions.forEach((q) => {
      if (answers[q.id] === q.correct) score++;
    });
    return (score / assessment.questions.length) * 100;
  };

  return (
    <div className="skill-assessment-container">
      <h1 className="skill-title">Skill Assessment Platform</h1>
      <p className="skill-subtitle">
        Discover your strengths, identify areas for improvement, and find the perfect career path.
      </p>
      <div className="skill-card-wrapper">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <div className="skill-icon">{skill.icon}</div>
            <h2 className="skill-card-title">{skill.title}</h2>
            <p className="skill-card-description">{skill.description}</p>
            <ul className="skill-points">
              {skill.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <button onClick={() => navigate(skill.path)} className="skill-button">
              Start Assessment →
            </button>
          </div>
        ))}
      </div>
      {/* <div className="skill-test">
        <h2>Custom Skill Test</h2>
        {error && <p className="error">{error}</p>}
        {!assessment ? (
          <div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic (e.g., coding)"
            />
            <button onClick={createAssessment}>Start Test</button>
          </div>
        ) : (
          <div>
            <h3>{assessment.title}</h3>
            {assessment.questions.map((q) => (
              <div key={q.id}>
                <p>{q.question}</p>
                {q.options.map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      onChange={() => handleAnswer(q.id, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ))}
            <button onClick={submitTest}>Submit Test</button>
          </div>
        )}
      </div> */}
    </div>
  );
}
