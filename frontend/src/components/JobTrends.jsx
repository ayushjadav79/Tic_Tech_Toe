import React, { useState } from 'react';
import { TrendingUp, GraduationCap, ArrowUpRight } from 'lucide-react';
import './JobTrends.css';

// Mock data
const trendingJobs = [
  {
    title: 'AI Engineer',
    trend: 45,
    reason: 'Growing demand for AI/ML solutions across industries',
  },
  {
    title: 'Cloud Architect',
    trend: 35,
    reason: 'Continued cloud adoption and multi-cloud strategies',
  },
  {
    title: 'Cybersecurity Analyst',
    trend: 40,
    reason: 'Rising cyber threats and regulatory requirements',
  },
  {
    title: 'Data Scientist',
    trend: 30,
    reason: 'Increasing focus on data-driven decision making',
  },
  {
    title: 'DevOps Engineer',
    trend: 25,
    reason: 'Automation and CI/CD pipeline optimization',
  },
];

const skillsByDemand = {
  'Very High': ['Machine Learning', 'Cloud Architecture', 'Python', 'Data Analysis'],
  'High': ['Kubernetes', 'React', 'Node.js', 'AWS'],
  'Medium': ['Docker', 'TypeScript', 'CI/CD', 'GraphQL'],
};

const salaryData = [
  {
    role: 'Software Engineer',
    entry: 85000,
    mid: 120000,
    senior: 160000,
  },
  {
    role: 'Data Scientist',
    entry: 95000,
    mid: 130000,
    senior: 175000,
  },
  {
    role: 'DevOps Engineer',
    entry: 90000,
    mid: 125000,
    senior: 165000,
  },
];

function JobTrends() {
  const [selectedTab, setSelectedTab] = useState('trends');

  return (
    <div className="job-trends-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <TrendingUp className="header-icon" />
            <h1>JobTrends AI</h1>
          </div>
          <nav className="header-nav">
            <button
              onClick={() => setSelectedTab('trends')}
              className={`nav-button ${selectedTab === 'trends' ? 'active' : ''}`}
            >
              Trending Jobs
            </button>
            <button
              onClick={() => setSelectedTab('skills')}
              className={`nav-button ${selectedTab === 'skills' ? 'active' : ''}`}
            >
              Skills
            </button>
            <button
              onClick={() => setSelectedTab('salaries')}
              className={`nav-button ${selectedTab === 'salaries' ? 'active' : ''}`}
            >
              Salaries
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {selectedTab === 'trends' && (
          <div className="section">
            <h2 className="section-heading">Trending Tech Jobs - April 2025</h2>
            <div className="card-grid">
              {trendingJobs.map((job) => (
                <div key={job.title} className="job-trends-card">
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="card-title">{job.title}</h3>
                      <div className="trend-info">
                        <span className="trend-percentage">+{job.trend}%</span>
                        <ArrowUpRight className="trend-icon" />
                      </div>
                    </div>
                    <p className="card-description">{job.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'skills' && (
          <div className="section">
            <h2 className="section-heading">In-Demand Skills</h2>
            <div className="card-grid">
              {Object.entries(skillsByDemand).map(([level, skills]) => (
                <div key={level} className="job-trends-card">
                  <div className="card-content">
                    <h3 className="card-title">{level} Demand</h3>
                    <ul className="skills-list">
                      {skills.map((skill) => (
                        <li key={skill} className="skill-item">
                          <GraduationCap className="skill-icon" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'salaries' && (
          <div className="section">
            <h2 className="section-heading">Salary Insights</h2>
            <div className="table-container">
              <table className="job-trends-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Entry Level</th>
                    <th>Mid Level</th>
                    <th>Senior Level</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.map((data) => (
                    <tr key={data.role}>
                      <td>{data.role}</td>
                      <td>₹{data.entry.toLocaleString()}</td>
                      <td>₹{data.mid.toLocaleString()}</td>
                      <td>₹{data.senior.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default JobTrends;