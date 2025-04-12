import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressTracker from './ProgressTracker';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import SkillsForm from './SkillsForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import ProjectsForm from './ProjectForm';
import ResumePreview from './ResumePreview';
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

    // Personal Info
    const personalInfoFields = Object.values(resumeData.personalInfo).filter(val => val !== '').length;
    const requiredPersonalFields = 4;
    total += 1;
    completed += personalInfoFields >= requiredPersonalFields ? 1 : personalInfoFields / requiredPersonalFields;

    // Summary
    total += 1;
    completed += resumeData.summary.length > 0 ? 1 : 0;

    // Skills
    total += 1;
    completed += resumeData.skills.length > 0 ? 1 : 0;

    // Experience
    total += 1;
    completed += resumeData.experience.length > 0 ? 1 : 0;

    // Education
    total += 1;
    completed += resumeData.education.length > 0 ? 1 : 0;

    // Projects
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
            <ProgressTracker progress={calculateProgress()} />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                <TabsTrigger value="personal-info">Personal</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="personal-info">
                <PersonalInfoForm
                  data={resumeData.personalInfo}
                  updateData={data => updateResumeData('personalInfo', data)}
                />
              </TabsContent>

              <TabsContent value="summary">
                <SummaryForm
                  data={resumeData.summary}
                  updateData={data => updateResumeData('summary', data)}
                />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsForm
                  data={resumeData.skills}
                  updateData={data => updateResumeData('skills', data)}
                />
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceForm
                  data={resumeData.experience}
                  updateData={data => updateResumeData('experience', data)}
                />
              </TabsContent>

              <TabsContent value="education">
                <EducationForm
                  data={resumeData.education}
                  updateData={data => updateResumeData('education', data)}
                />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectsForm
                  data={resumeData.projects}
                  updateData={data => updateResumeData('projects', data)}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-6">
              <Button
                variant="destructive"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <Trash size={16} />
                Reset Resume
              </Button>

              <Button
                onClick={handleExport}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
            <ResumePreview data={resumeData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
