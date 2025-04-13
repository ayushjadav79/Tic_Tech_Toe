import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

// Components
import Dashboard from './components/Dashboard';
import SkillTest from './components/SkillTest';
import TechnicalTest from './components/skilltests/TechnicalTest';
import AnalyticalTest from './components/skilltests/AnalyticalTest';
import SoftSkillTest from './components/skilltests/SoftSkillTest';
import JobTrends from './components/JobTrends';
import CareerSuggestions from './components/CareerSuggestions';
import EducationForm from './components/ResumeBuilder/EducationForm';
import ExperienceForm from './components/ResumeBuilder/ExperienceForm';
import PersonalInfoForm from './components/ResumeBuilder/PersonalInfoForm';
import ProgressTracker from './components/ResumeBuilder/ProgressTracker';
import ProjectForm from './components/ResumeBuilder/ProjectForm';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import SkillsForm from './components/ResumeBuilder/SkillsForm';
import ResumePreview from './components/ResumeBuilder/ResumePreview';
import SummaryForm from './components/ResumeBuilder/SummaryForm';
import ParticlesComponent from './components/Particles';
import CreateAssessmentForm from 'D:/Coding/React programs/Hacktastic/frontend/src/CreateAssessmentForm.jsx';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <ParticlesComponent id="particles" />
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route path="/skill-test" element={<SkillTest />} />
      <Route path="/skill-test/technical" element={<TechnicalTest />} />
      <Route path="/skill-test/analytical" element={<AnalyticalTest />} />
      <Route path="/skill-test/soft" element={<SoftSkillTest />} />
      <Route path="/job-trends" element={<JobTrends />} />
      <Route path="/career-suggestion" element={<CareerSuggestions />} />
      <Route path="/education-form" element={<EducationForm />} />
      <Route path="/experience-form" element={<ExperienceForm />} />
      <Route path="/personal-info-form" element={<PersonalInfoForm />} />
      <Route path="/progress-tracker" element={<ProgressTracker />} />
      <Route path="/project-form" element={<ProjectForm />} />
      <Route path="/resume-builder" element={<ResumeBuilder />} />
      <Route path="/resume-preview" element={<ResumePreview />} />
      <Route path="/skills-form" element={<SkillsForm />} />
      <Route path="/summary-form" element={<SummaryForm />} />
      <Route
        path="/create-assessment"
        element={
          <div>
            <h1>Welcome to the Assessment System</h1>
            <CreateAssessmentForm />
          </div>
        }
      />
    </Routes>
  );
}

export default App;