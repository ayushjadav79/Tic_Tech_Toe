import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProgressTracker from './ProgressTracker';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import SkillsForm from './SkillsForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import ProjectsForm from './ProjectForm';
import { Button } from '@/components/ui/button';
import { Download, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import './styles.css';

const initialResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
  },
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: []
};

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [activeTab, setActiveTab] = useState('personal-info');
  const { toast } = useToast();

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const calculateProgress = () => {
    let total = 0;
    let completed = 0;

    const personalInfoFields = Object.values(resumeData.personalInfo).filter(val => val !== '').length;
    const requiredPersonalFields = 4;
    total += 1;
    completed += personalInfoFields >= requiredPersonalFields ? 1 : personalInfoFields / requiredPersonalFields;

    total += 1;
    completed += resumeData.summary.length > 0 ? 1 : 0;

    total += 1;
    completed += resumeData.skills.length > 0 ? 1 : 0;

    total += 1;
    completed += resumeData.experience.length > 0 ? 1 : 0;

    total += 1;
    completed += resumeData.education.length > 0 ? 1 : 0;

    total += 1;
    completed += resumeData.projects.length > 0 ? 1 : 0;

    return Math.floor((completed / total) * 100);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your resume? This cannot be undone.')) {
      setResumeData(initialResumeData);
      toast({
        title: "Resume reset",
        description: "Your resume has been reset to default.",
      });
    }
  };

  const handleExport = () => {
    toast({
      title: "PDF Export",
      description: "PDF export functionality will be implemented soon.",
    });
  };

  return (
    <div className="resume-builder-container">
      <h1>Resume Builder</h1>
      <p className="text-gray-600">Create a professional resume with ease.</p>

      <div className="grid">
        {/* Form Section */}
        <div className="form-section">
          <Card className="resume-card">
            <CardContent className="card-content">
              <ProgressTracker progress={calculateProgress()} />
              <Tabs value={activeTab} onValueChange={setActiveTab} className="tabs">
                <TabsList className="tabs-list">
                  <TabsTrigger value="personal-info" className="tabs-trigger">Personal</TabsTrigger>
                  <TabsTrigger value="summary" className="tabs-trigger">Summary</TabsTrigger>
                  <TabsTrigger value="skills" className="tabs-trigger">Skills</TabsTrigger>
                  <TabsTrigger value="experience" className="tabs-trigger">Experience</TabsTrigger>
                  <TabsTrigger value="education" className="tabs-trigger">Education</TabsTrigger>
                  <TabsTrigger value="projects" className="tabs-trigger">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="personal-info" className="tab-content">
                  <PersonalInfoForm
                    data={resumeData.personalInfo}
                    updateData={data => updateResumeData('personalInfo', data)}
                  />
                </TabsContent>

                <TabsContent value="summary" className="tab-content">
                  <SummaryForm
                    data={resumeData.summary}
                    updateData={data => updateResumeData('summary', data)}
                  />
                </TabsContent>

                <TabsContent value="skills" className="tab-content">
                  <SkillsForm
                    data={resumeData.skills}
                    updateData={data => updateResumeData('skills', data)}
                  />
                </TabsContent>

                <TabsContent value="experience" className="tab-content">
                  <ExperienceForm
                    data={resumeData.experience}
                    updateData={data => updateResumeData('experience', data)}
                  />
                </TabsContent>

                <TabsContent value="education" className="tab-content">
                  <EducationForm
                    data={resumeData.education}
                    updateData={data => updateResumeData('education', data)}
                  />
                </TabsContent>

                <TabsContent value="projects" className="tab-content">
                  <ProjectsForm
                    data={resumeData.projects}
                    updateData={data => updateResumeData('projects', data)}
                  />
                </TabsContent>
              </Tabs>

              <div className="button-group">
                <Button
                  variant="destructive"
                  onClick={handleReset}
                  className="button button-destructive"
                >
                  <Trash size={16} />
                  Reset Resume
                </Button>
                <Button
                  onClick={handleExport}
                  className="button"
                >
                  <Download size={16} />
                  Export PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resume Preview Section */}
        <div className="preview-section">
          <h2 className="preview-heading">Resume Preview</h2>
          <div className="preview-table-container">
            <table className="resume-preview-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Personal Info</td>
                  <td>
                    {resumeData.personalInfo.name && (
                      <div>
                        <strong>Name:</strong> {resumeData.personalInfo.name}<br />
                        <strong>Email:</strong> {resumeData.personalInfo.email || 'N/A'}<br />
                        <strong>Phone:</strong> {resumeData.personalInfo.phone || 'N/A'}<br />
                        <strong>Location:</strong> {resumeData.personalInfo.location || 'N/A'}<br />
                        <strong>LinkedIn:</strong> {resumeData.personalInfo.linkedin || 'N/A'}<br />
                        <strong>Website:</strong> {resumeData.personalInfo.website || 'N/A'}
                      </div>
                    )}
                    {!resumeData.personalInfo.name && 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td>Summary</td>
                  <td>{resumeData.summary || 'Not provided'}</td>
                </tr>
                <tr>
                  <td>Skills</td>
                  <td>
                    {resumeData.skills.length > 0 ? (
                      <ul>
                        {resumeData.skills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    ) : 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td>Experience</td>
                  <td>
                    {resumeData.experience.length > 0 ? (
                      <ul>
                        {resumeData.experience.map((exp, index) => (
                          <li key={index}>
                            <strong>{exp.title}</strong> at {exp.company} ({exp.startDate} - {exp.endDate || 'Present'})<br />
                            {exp.description}
                          </li>
                        ))}
                      </ul>
                    ) : 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td>Education</td>
                  <td>
                    {resumeData.education.length > 0 ? (
                      <ul>
                        {resumeData.education.map((edu, index) => (
                          <li key={index}>
                            <strong>{edu.degree}</strong>, {edu.institution} ({edu.startDate} - {edu.endDate || 'Present'})
                          </li>
                        ))}
                      </ul>
                    ) : 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td>Projects</td>
                  <td>
                    {resumeData.projects.length > 0 ? (
                      <ul>
                        {resumeData.projects.map((project, index) => (
                          <li key={index}>
                            <strong>{project.name}</strong><br />
                            {project.description}
                          </li>
                        ))}
                      </ul>
                    ) : 'Not provided'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;