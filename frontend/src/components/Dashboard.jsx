import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { UserButton, SignedIn, SignOutButton } from '@clerk/clerk-react';
import './dashboard.css';
import botImage from '../assets/suit_logo.png'; // Relative path
import ParticlesComponent from './Particles'; // Import ParticlesComponent

const Card = ({ title, description, buttonText, redirectTo }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <button className="card-button" onClick={() => (window.location.href = redirectTo)}>
        {buttonText} <span className="arrow">→</span>
      </button>
    </div>
  );
};

export default function CareerCompassDashboard() {
  const authContext = useContext(AuthContext);

  const user = authContext?.user;
  const logout = authContext?.logout;

  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/resume`, {
          headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ0NDg1NjE0LCJleHAiOjE3NDQ0ODkyMTR9.2omVBE6s6DNCsaC-dMCahFk347y6ekwZXkLU0H4Nv68` },
        });
        setResume(response.data);
      } catch (err) {
        setError('No resume found');
      }
    };
    if (user) fetchResume();
  }, [user]);

  return (
    <div className="dashboard-container">
      <ParticlesComponent id="tsparticles" />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-title-container">
            <div className="logo-title-row">
              <img src={botImage} alt="CareerCompass AI Bot" className="dashboard-bot" />
              <h1 className="dashboard-title">CareerCraft</h1>
            </div>
            <p className="dashboard-subtitle">Reflects the process of crafting a career path.</p>
          </div>
          <SignedIn>
            <div className="dashboard-auth">
              <UserButton afterSignOutUrl="/" />
              <SignOutButton>
                <button className="signout-button">Sign Out</button>
              </SignOutButton>
            </div>
          </SignedIn>
        </div>
        <div className="card-section">
          <div className="card-grid">
            <Card 
              title="Skill Assessment" 
              description="AI-driven tool to analyze your skills. Discover your strengths and weaknesses through interactive tests." 
              buttonText="Start Assessment" 
              redirectTo="/skill-test"
            />
            <Card 
              title="Career Suggestions" 
              description="Explore potential career paths based on your skills and interests using AI-powered insights." 
              buttonText="Get Suggestions" 
              redirectTo="/career-suggestion"
            />
            <Card 
              title="Resume Builder" 
              description="Build a standout resume using our template-based builder and AI-powered writing tips." 
              buttonText="Build Resume" 
              redirectTo="/resume-builder"
            />
            <Card 
              title="Job Market Data" 
              description="Stay informed with the latest job market trends and networking events curated by AI." 
              buttonText="View Data" 
              redirectTo="/job-trends"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
