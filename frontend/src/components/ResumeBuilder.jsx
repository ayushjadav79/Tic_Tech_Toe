// All-in-one JSX Code Combining Resume Builder Components

import React, { useState } from 'react';

const PersonalInfoForm = ({ formData, setFormData }) => (
  <div>
    <h3>Personal Info</h3>
    <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
    <input placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
    <input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
  </div>
);

const EducationForm = ({ formData, setFormData }) => (
  <div>
    <h3>Education</h3>
    <textarea placeholder="Your Education..." value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })} />
  </div>
);

const ExperienceForm = ({ formData, setFormData }) => (
  <div>
    <h3>Experience</h3>
    <textarea placeholder="Your Experience..." value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
  </div>
);

const SkillsForm = ({ formData, setFormData }) => (
  <div>
    <h3>Skills</h3>
    <input placeholder="Skills (comma separated)" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
  </div>
);

const SummaryForm = ({ formData, setFormData }) => (
  <div>
    <h3>Summary</h3>
    <textarea placeholder="Your Professional Summary..." value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} />
  </div>
);

const ProjectsForm = ({ formData, setFormData }) => (
  <div>
    <h3>Projects</h3>
    <textarea placeholder="Your Projects..." value={formData.projects} onChange={(e) => setFormData({ ...formData, projects: e.target.value })} />
  </div>
);

const ProgressTracker = ({ step }) => (
  <div className="progress-tracker">Step {step} of 6</div>
);

const ResumePreview = ({ formData }) => (
  <div className="resume-preview">
    <h2>{formData.name}</h2>
    <p><strong>Email:</strong> {formData.email}</p>
    <p><strong>Phone:</strong> {formData.phone}</p>
    <p><strong>Summary:</strong> {formData.summary}</p>
    <p><strong>Skills:</strong> {formData.skills}</p>
    <p><strong>Education:</strong> {formData.education}</p>
    <p><strong>Experience:</strong> {formData.experience}</p>
    <p><strong>Projects:</strong> {formData.projects}</p>
  </div>
);

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', summary: '', skills: '', education: '', experience: '', projects: ''
  });
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="resume-builder">
      <ProgressTracker step={step} />

      {step === 1 && <PersonalInfoForm formData={formData} setFormData={setFormData} />}
      {step === 2 && <SummaryForm formData={formData} setFormData={setFormData} />}
      {step === 3 && <SkillsForm formData={formData} setFormData={setFormData} />}
      {step === 4 && <EducationForm formData={formData} setFormData={setFormData} />}
      {step === 5 && <ExperienceForm formData={formData} setFormData={setFormData} />}
      {step === 6 && <ProjectsForm formData={formData} setFormData={setFormData} />}
      {step === 7 && <ResumePreview formData={formData} />}

      <div className="navigation-buttons">
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < 7 && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
};

export default ResumeBuilder;
