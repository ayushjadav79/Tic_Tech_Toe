import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ExperienceForm = ({ data, updateData }) => {
  const [experiences, setExperiences] = useState(data);
  const [open, setOpen] = useState([]);
  const { toast } = useToast();

  const toggleCollapsible = (id) => {
    setOpen((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleAddExperience = () => {
    const newExperience = {
      id: uuidv4(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
    };

    setExperiences([...experiences, newExperience]);
    setOpen([...open, newExperience.id]);
  };

  const handleRemoveExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
    setOpen(open.filter((itemId) => itemId !== id));
  };

  const handleExperienceChange = (id, field, value) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const handleAddBulletPoint = (id) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === id ? { ...exp, description: [...exp.description, ''] } : exp
      )
    );
  };

  const handleBulletPointChange = (id, index, value) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              description: exp.description.map((item, i) =>
                i === index ? value : item
              ),
            }
          : exp
      )
    );
  };

  const handleRemoveBulletPoint = (id, index) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              description: exp.description.filter((_, i) => i !== index),
            }
          : exp
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(experiences);
    toast({
      title: "Work experience saved",
      description: `${experiences.length} work experience entries have been saved.`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Button
          type="button"
          onClick={handleAddExperience}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-md">
          <p className="text-gray-500">No work experience added yet.</p>
          <Button
            type="button"
            onClick={handleAddExperience}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <Collapsible
              key={experience.id}
              open={open.includes(experience.id)}
              onOpenChange={() => toggleCollapsible(experience.id)}
              className="border rounded-md"
            >
              <div className="flex justify-between items-center p-4 bg-gray-50">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                    <div className="text-left">
                      <h3 className="font-medium">
                        {experience.title || 'New Position'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {experience.company
                          ? `${experience.company}${experience.location ? `, ${experience.location}` : ''}`
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
                    handleRemoveExperience(experience.id);
                  }}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <CollapsibleContent className="p-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${experience.id}`}>Job Title</Label>
                    <Input
                      id={`title-${experience.id}`}
                      value={experience.title}
                      onChange={(e) => handleExperienceChange(experience.id, 'title', e.target.value)}
                      placeholder="Software Developer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`company-${experience.id}`}>Company</Label>
                    <Input
                      id={`company-${experience.id}`}
                      value={experience.company}
                      onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`location-${experience.id}`}>Location</Label>
                    <Input
                      id={`location-${experience.id}`}
                      value={experience.location}
                      onChange={(e) => handleExperienceChange(experience.id, 'location', e.target.value)}
                      placeholder="New York, NY"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${experience.id}`}
                      value={experience.startDate}
                      onChange={(e) => handleExperienceChange(experience.id, 'startDate', e.target.value)}
                      placeholder="January 2020"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${experience.id}`}
                      value={experience.endDate}
                      disabled={experience.current}
                      onChange={(e) => handleExperienceChange(experience.id, 'endDate', e.target.value)}
                      placeholder="Present"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id={`current-${experience.id}`}
                      checked={experience.current}
                      onCheckedChange={(checked) => {
                        handleExperienceChange(experience.id, 'current', !!checked);
                        if (checked) {
                          handleExperienceChange(experience.id, 'endDate', 'Present');
                        } else {
                          handleExperienceChange(experience.id, 'endDate', '');
                        }
                      }}
                    />
                    <Label htmlFor={`current-${experience.id}`} className="font-normal cursor-pointer">
                      I currently work here
                    </Label>
                  </div>
                </div>

                <div className="mt-4">
                  <Label className="mb-2 block">Responsibilities & Achievements</Label>

                  {experience.description.map((bullet, index) => (
                    <div key={index} className="flex items-start space-x-2 mb-2">
                      <Textarea
                        value={bullet}
                        onChange={(e) => handleBulletPointChange(experience.id, index, e.target.value)}
                        placeholder="Describe your responsibilities, achievements, or projects."
                        className="min-h-[80px]"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveBulletPoint(experience.id, index)}
                        disabled={experience.description.length <= 1}
                        className="mt-1"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddBulletPoint(experience.id)}
                    className="mt-2"
                  >
                    <Plus className="mr-1 h-4 w-4" /> Add Bullet Point
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}

      <div className="pt-4">
        <Button type="submit">Save Work Experience</Button>
      </div>
    </form>
  );
};

export default ExperienceForm;