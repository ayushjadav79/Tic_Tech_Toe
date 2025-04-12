import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus, X } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ProjectsForm = ({ data, updateData }) => {
  const [projects, setProjects] = useState(data);
  const [open, setOpen] = useState([]);
  const [newTech, setNewTech] = useState('');
  const { toast } = useToast();

  const toggleCollapsible = (id) => {
    setOpen(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const handleAddProject = () => {
    const newProject = {
      id: uuidv4(),
      title: '',
      description: '',
      technologies: [],
      link: ''
    };
    
    setProjects([...projects, newProject]);
    setOpen([...open, newProject.id]);
  };

  const handleRemoveProject = (id) => {
    setProjects(projects.filter(proj => proj.id !== id));
    setOpen(open.filter(itemId => itemId !== id));
  };

  const handleProjectChange = (id, field, value) => {
    setProjects(prevProjects => 
      prevProjects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  const handleAddTech = (id) => {
    if (newTech.trim() === '') return;
    
    setProjects(prevProjects => 
      prevProjects.map(proj => 
        proj.id === id 
          ? { 
              ...proj, 
              technologies: [...proj.technologies, newTech.trim()]
            } 
          : proj
      )
    );
    
    setNewTech('');
  };

  const handleRemoveTech = (id, techIndex) => {
    setProjects(prevProjects => 
      prevProjects.map(proj => 
        proj.id === id 
          ? { 
              ...proj, 
              technologies: proj.technologies.filter((_, i) => i !== techIndex)
            } 
          : proj
      )
    );
  };
  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(projects);
    toast({
      title: "Projects saved",
      description: `${projects.length} projects have been saved to your resume.`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button 
          type="button" 
          onClick={handleAddProject}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-md">
          <p className="text-gray-500">No projects added yet.</p>
          <Button 
            type="button" 
            onClick={handleAddProject}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Project
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Collapsible 
              key={project.id} 
              open={open.includes(project.id)}
              onOpenChange={() => toggleCollapsible(project.id)}
              className="border rounded-md"
            >
              <div className="flex justify-between items-center p-4 bg-gray-50">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                    <div className="text-left">
                      <h3 className="font-medium">
                        {project.title || 'New Project'} 
                      </h3>
                      <p className="text-sm text-gray-500">
                        {project.technologies.length > 0 
                          ? project.technologies.join(', ') 
                          : 'Click to edit details'}
                      </p>
                    </div>
                  </Button>
                </CollapsibleTrigger>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveProject(project.id);
                  }}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              <CollapsibleContent className="p-4 border-t">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                    <Input 
                      id={`title-${project.id}`} 
                      value={project.title} 
                      onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)} 
                      placeholder="E-commerce Website"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`link-${project.id}`}>Project Link (Optional)</Label>
                    <Input 
                      id={`link-${project.id}`} 
                      value={project.link} 
                      onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)} 
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`description-${project.id}`}>Project Description</Label>
                    <Textarea 
                      id={`description-${project.id}`}
                      value={project.description} 
                      onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)} 
                      placeholder="Describe the project, your role, and its impact."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Technologies Used</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, project.id)}
                        placeholder="Add a technology (e.g., React, Python)"
                      />
                      <Button 
                        type="button" 
                        onClick={() => handleAddTech(project.id)}
                        size="sm"
                        className="whitespace-nowrap"
                      >
                        Add
                      </Button>
                    </div>
                    
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, index) => (
                          <div 
                            key={index} 
                            className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                          >
                            {tech}
                            <button 
                              type="button"
                              onClick={() => handleRemoveTech(project.id, index)}
                              className="ml-1 text-primary hover:text-primary/80"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
      
      <div className="pt-4">
        <Button type="submit">Save Projects</Button>
      </div>
    </form>
  );
};

export default ProjectsForm;