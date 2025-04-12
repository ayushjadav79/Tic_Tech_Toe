import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ResumePreview = ({ data }) => {
  const isEmpty =
    Object.values(data.personalInfo).every(val => val === '') &&
    data.summary === '' &&
    data.skills.length === 0 &&
    data.experience.length === 0 &&
    data.education.length === 0 &&
    data.projects.length === 0;

  if (isEmpty) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
        <div className="mt-6">
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-1" />
          <Skeleton className="h-4 w-5/6 mt-1" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-sm">
      {/* Personal Info */}
      {data.personalInfo.name && (
        <div className="text-center pb-2 border-b">
          <h2 className="text-xl font-bold">{data.personalInfo.name}</h2>
          <div className="mt-1 text-gray-600 flex flex-wrap justify-center gap-x-4">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
          <div className="mt-1 text-gray-600 flex flex-wrap justify-center gap-x-4">
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div className="pb-2">
          <h3 className="text-md font-semibold border-b pb-1 mb-2">PROFESSIONAL SUMMARY</h3>
          <p className="text-sm text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="pb-2">
          <h3 className="text-md font-semibold border-b pb-1 mb-2">SKILLS</h3>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="pb-2">
          <h3 className="text-md font-semibold border-b pb-1 mb-2">EXPERIENCE</h3>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id} className="text-sm">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{exp.title}</h4>
                    <p className="text-xs text-gray-600">
                      {exp.company}{exp.location ? `, ${exp.location}` : ''}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                <ul className="mt-1 list-disc pl-5 text-xs text-gray-700 space-y-1">
                  {exp.description.map((bullet, idx) => (
                    bullet.trim() && <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="pb-2">
          <h3 className="text-md font-semibold border-b pb-1 mb-2">EDUCATION</h3>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-sm">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-xs text-gray-600">
                      {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                {edu.description && (
                  <p className="mt-1 text-xs text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <h3 className="text-md font-semibold border-b pb-1 mb-2">PROJECTS</h3>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id} className="text-sm">
                <div className="flex justify-between">
                  <h4 className="font-semibold">{project.title}</h4>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-gray-700">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
