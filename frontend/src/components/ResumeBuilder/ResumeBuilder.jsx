import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Trash, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';
import ProgressTracker from './ProgressTracker';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import SkillsForm from './SkillsForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import ProjectsForm from './ProjectForm';
import ResumePreview from './ResumePreview';
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
  // const { user } = useContext(AuthContext);
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [activeTab, setActiveTab] = useState('personal-info');
  const [error, setError] = useState('');
  const { toast } = useToast();
  const pdfPreviewRef = useRef(null);

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
    if (!pdfPreviewRef.current) {
      toast({
        title: "Export Failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive"
      });
      return;
    }

    const element = pdfPreviewRef.current;
    const filename = `${resumeData.personalInfo.name || 'Resume'}_${new Date().toISOString().slice(0, 10)}.pdf`;

    const options = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    toast({
      title: "Generating PDF",
      description: "Your resume is being exported. Please wait...",
    });

    html2pdf().from(element).set(options).save().then(() => {
      toast({
        title: "PDF Export Complete",
        description: `Your resume has been exported as ${filename}`,
      });
    }).catch(error => {
      console.error('PDF export error:', error);
      toast({
        title: "Export Failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive"
      });
    });
  };

  const saveResume = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/resume`,
        resumeData,
        { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ0NDg1NjE0LCJleHAiOjE3NDQ0ODkyMTR9.2omVBE6s6DNCsaC-dMCahFk347y6ekwZXkLU0H4Nv68` } }
      );
      toast({
        title: "Resume Saved",
        description: "Your resume has been successfully saved.",
      });
    } catch (err) {
      setError('Failed to save resume');
      toast({
        title: "Save Failed",
        description: "Could not save your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="resume-builder-container">
      <h1>Resume Builder</h1>
      <p className="text-gray-600">Create a professional resume with ease.</p>
      {error && <p className="error">{error}</p>}

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
                <Button
                  onClick={saveResume}
                  className="button"
                >
                  <FileText size={16} />
                  Save Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resume Preview Section */}
        <div className="preview-section">
          <h2 className="preview-heading">Resume Preview</h2>
          <div className="pdf-preview">
            <div className="pdf-preview-content" ref={pdfPreviewRef}>
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;