import React from 'react';
import { UserButton, SignedIn, SignOutButton } from '@clerk/clerk-react';
import './dashboard.css';
import botImage from 'D:/Coding/React programs/Hacktastic/frontend/src/assets/logo-removebg-preview.png';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, buttonText, redirectTo }) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <button className="card-button" onClick={() => navigate(redirectTo)}>
        {buttonText} <span className="arrow">→</span>
      </button>
    </div>
  );
};

export default function CareerCompassDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title-container">
          <img src={botImage} alt="CareerCompass AI Bot" className="dashboard-bot" />
          <h1 className="dashboard-title">CareerCraft</h1>
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
        {/* <Card 
          title="Interview Preparation" 
          description="Practice with AI and get feedback on your responses through simulated interview scenarios." 
          buttonText="Start Preparing" 
          redirectTo="/interviewprep"
        /> */}
        <Card 
          title="Job Market Data" 
          description="Stay informed with the latest job market trends and networking events curated by AI." 
          buttonText="View Data" 
          redirectTo="/job-trends"
        />
      </div>
    </div>
  );
}