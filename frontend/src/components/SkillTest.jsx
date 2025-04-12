import React from 'react';
import './skill-test.css';
import { useNavigate } from 'react-router-dom';
import { BarChart2, User, Settings } from 'lucide-react';

export default function SkillTest() {
  const navigate = useNavigate();

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
    </div>
  );
}
