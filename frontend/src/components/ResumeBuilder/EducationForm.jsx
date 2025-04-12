//  resumebuilder/EdujcationForm.jsx 

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"; 
import { Trash, Plus } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const EducationForm = ({ data, updateData }) => {
  const [educations, setEducations] = useState(data);
  const [open, setOpen] = useState([]);
  const { toast } = useToast();

  const toggleCollapsible = (id) => {
    setOpen((prev) => 
      prev.includes(id) 
        ? prev.filter((itemId) => itemId !== id) 
        : [...prev, id]
    );
  };

  const handleAddEducation = () => {
    const newEducation = {
      id: uuidv4(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    
    setEducations([...educations, newEducation]);
    setOpen([...open, newEducation.id]);
  };

  const handleRemoveEducation = (id) => {
    setEducations(educations.filter((edu) => edu.id !== id));
    setOpen(open.filter((itemId) => itemId !== id));
  };

  const handleEducationChange = (id, field, value) => {
    setEducations((prevEducations) => 
      prevEducations.map((edu) => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(educations);
    toast({
      title: "Education saved",
      description: `${educations.length} education entries have been saved.`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education</h2>
        <Button 
          type="button" 
          onClick={handleAddEducation}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </div>
      
      {educations.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-md">
          <p className="text-gray-500">No education added yet.</p>
          <Button 
            type="button" 
            onClick={handleAddEducation}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((education) => (
            <Collapsible 
              key={education.id} 
              open={open.includes(education.id)}
              onOpenChange={() => toggleCollapsible(education.id)}
              className="border rounded-md"
            >
              <div className="flex justify-between items-center p-4 bg-gray-50">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                    <div className="text-left">
                      <h3 className="font-medium">
                        {education.degree || 'New Degree/Certification'} 
                      </h3>
                      <p className="text-sm text-gray-500">
                        {education.institution 
                          ? `${education.institution}${education.location ? `, ${education.location}` : ''}` 
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
                    handleRemoveEducation(education.id);
                  }}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              <CollapsibleContent className="p-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${education.id}`}>Degree/Certification</Label>
                    <Input 
                      id={`degree-${education.id}`} 
                      value={education.degree} 
                      onChange={(e) => handleEducationChange(education.id, 'degree', e.target.value)} 
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                    <Input 
                      id={`institution-${education.id}`} 
                      value={education.institution} 
                      onChange={(e) => handleEducationChange(education.id, 'institution', e.target.value)} 
                      placeholder="University of California, Berkeley"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`location-${education.id}`}>Location</Label>
                    <Input 
                      id={`location-${education.id}`} 
                      value={education.location} 
                      onChange={(e) => handleEducationChange(education.id, 'location', e.target.value)} 
                      placeholder="Berkeley, CA"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                    <Input 
                      id={`startDate-${education.id}`} 
                      value={education.startDate} 
                      onChange={(e) => handleEducationChange(education.id, 'startDate', e.target.value)} 
                      placeholder="September 2016"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                    <Input 
                      id={`endDate-${education.id}`} 
                      value={education.endDate} 
                      onChange={(e) => handleEducationChange(education.id, 'endDate', e.target.value)} 
                      placeholder="May 2020"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor={`description-${education.id}`}>Description (Optional)</Label>
                  <Textarea 
                    id={`description-${education.id}`}
                    value={education.description} 
                    onChange={(e) => handleEducationChange(education.id, 'description', e.target.value)} 
                    placeholder="Additional details about your education, such as relevant coursework, honors, or activities."
                    className="mt-1"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
      
      <div className="pt-4">
        <Button type="submit">Save Education</Button>
      </div>
    </form>
  );
};

export default EducationForm;
