import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

import Dashboard from './components/Dashboard';
import SkillTest from './components/SkillTest';
import TechnicalTest from './components/skilltests/TechnicalTest';
import AnalyticalTest from './components/skilltests/AnalyticalTest';
import SoftSkillTest from './components/skilltests/SoftSkillTest';
// import InterviewSim from './components/InterviewSim';
import JobTrends from './components/JobTrends';
import CareerSuggestions from './components/CareerSuggestions';
// import Roadmap from './components/Roadmap';
// import Certification from './components/Certification';
// import CommunityDashboard from './components/CommunityDashboard';
import EducationForm from './components/ResumeBuilder/EducationForm';
import ExperienceForm from './components/ResumeBuilder/ExperienceForm';
import PersonalInfoForm from './components/ResumeBuilder/PersonalInfoForm';
import ProgressTracker from './components/ResumeBuilder/ProgressTracker';
import ProjectForm from './components/ResumeBuilder/ProjectForm';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import SkillsForm from './components/ResumeBuilder/SkillsForm';
import ResumePreview from './components/ResumeBuilder/ResumePreview';
import SummaryForm from './components/ResumeBuilder/SummaryForm';
// import CareerChatBot from './components/CareerChatBot';
// import ProgressDashboard from './components/ProgressDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <React.Fragment>
          <SignedIn><Dashboard /></SignedIn>
          <SignedOut><RedirectToSignIn /></SignedOut>
        </React.Fragment>
      } />
      <Route path="/skill-test" element={<SkillTest />} />
      <Route path="/skill-test/technical" element={<TechnicalTest />} />
      <Route path="/skill-test/analytical" element={<AnalyticalTest />} />
      <Route path="/skill-test/soft" element={<SoftSkillTest />} />
      {/* <Route path="/interview-sim" element={<InterviewSim />} /> */}
      <Route path="/job-trends" element={<JobTrends />} />
      <Route path="/career-suggestion" element={<CareerSuggestions />} />
      {/* <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/certification" element={<Certification />} />
      <Route path="/community" element={<CommunityDashboard />} /> */}
      <Route path="/education-form" element={<EducationForm />} />
      <Route path="/experience-form" element={<ExperienceForm />} />
      <Route path="/personal-info-form" element={<PersonalInfoForm />} />
      <Route path="/progress-tracker" element={<ProgressTracker />} />
      <Route path="/project-form" element={<ProjectForm />} />
      <Route path="/resume-builder" element={<ResumeBuilder />} />
      <Route path="/resume-preview" element={<ResumePreview />} />
      <Route path="/skills-form" element={<SkillsForm />} />
      <Route path="/summary-form" element={<SummaryForm />} />
      {/* <Route path="/chatbot" element={<CareerChatBot />} />
      <Route path="/progress" element={<ProgressDashboard />} /> */}
    </Routes>
  );
}

export default App;
