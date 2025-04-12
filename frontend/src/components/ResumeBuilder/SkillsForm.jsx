import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SkillsForm = ({ data, updateData }) => {
  const [skills, setSkills] = useState(data);
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(skills);
    toast({
      title: "Skills saved",
      description: `${skills.length} skills have been saved to your resume.`,
    });
  };

  const skillCategories = {
    "Technical": ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS", "TypeScript", "Git", "Docker", "HTML", "CSS", "MongoDB"],
    "Design": ["UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator", "User Research", "Wireframing", "Prototyping"],
    "Marketing": ["SEO", "Content Marketing", "Social Media", "Email Marketing", "Google Analytics", "PPC", "Market Research", "Brand Strategy"],
    "Soft Skills": ["Communication", "Teamwork", "Problem Solving", "Leadership", "Time Management", "Adaptability", "Critical Thinking", "Creativity"],
    "Data Analysis": ["Data Visualization", "Statistical Analysis", "Excel", "Python", "R", "Tableau", "Power BI", "SQL", "Machine Learning"]
  };

  const addSkillFromCategory = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>

      <p className="text-sm text-gray-500 mb-4">
        Add your relevant skills. These should include technical skills, soft skills, and any other abilities relevant to your target role.
      </p>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          type="button"
          onClick={handleAddSkill}
          size="sm"
          className="whitespace-nowrap"
        >
          <Plus className="mr-1 h-4 w-4" /> Add Skill
        </Button>
      </div>

      {skills.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Your Skills:</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-1 text-primary hover:text-primary/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Common Skills by Category (click to add):</h3>
        <div className="space-y-4">
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-gray-600 mb-1">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <div
                    key={skill}
                    onClick={() => addSkillFromCategory(skill)}
                    className={`text-sm px-3 py-1 rounded-full cursor-pointer transition ${
                      skills.includes(skill)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit">Save Skills</Button>
      </div>
    </form>
  );
};

export default SkillsForm;
