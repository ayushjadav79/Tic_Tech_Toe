import React, { useState, useEffect } from 'react';
import { TrendingUp, BriefcaseIcon, GraduationCap, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './JobTrends.css';

// Mock data - In a real app, this would come from AI API calls
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

function App() {
  const [selectedTab, setSelectedTab] = useState('trends');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">JobTrends AI</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setSelectedTab('trends')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedTab === 'trends'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Trending Jobs
              </button>
              <button
                onClick={() => setSelectedTab('skills')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedTab === 'skills'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setSelectedTab('salaries')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedTab === 'salaries'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Salaries
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === 'trends' && (
          <div className="grid gap-6">
            <h2 className="text-xl font-semibold text-gray-900">Trending Tech Jobs - April 2025</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trendingJobs.map((job) => (
                <div key={job.title} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                    <div className="flex items-center text-green-600">
                      <span className="text-sm font-medium">+{job.trend}%</span>
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{job.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'skills' && (
          <div className="grid gap-6">
            <h2 className="text-xl font-semibold text-gray-900">In-Demand Skills</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {Object.entries(skillsByDemand).map(([level, skills]) => (
                <div key={level} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{level} Demand</h3>
                  <ul className="space-y-2">
                    {skills.map((skill) => (
                      <li key={skill} className="flex items-center text-gray-700">
                        <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'salaries' && (
          <div className="grid gap-6">
            <h2 className="text-xl font-semibold text-gray-900">Salary Insights</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mid Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Senior Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {salaryData.map((data) => (
                    <tr key={data.role}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{data.entry.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{data.mid.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{data.senior.toLocaleString()}</td>
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

export default App;