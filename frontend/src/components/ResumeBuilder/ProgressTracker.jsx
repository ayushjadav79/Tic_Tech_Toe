import { Progress } from "@/components/ui/progress";

const ProgressTracker = ({ progress }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-semibold">Resume Progress</h2>
        <span className="text-gray-500">{progress}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />
      
      <div className="mt-3 text-sm text-gray-500">
        {progress < 30 && "Just getting started! Complete more sections to improve your resume."}
        {progress >= 30 && progress < 60 && "Good progress! Keep adding details to make your resume stand out."}
        {progress >= 60 && progress < 100 && "Almost there! Just a few more details to complete your professional resume."}
        {progress === 100 && "Perfect! Your resume is complete and ready to impress."}
      </div>
    </div>
  );
};

export default ProgressTracker;
