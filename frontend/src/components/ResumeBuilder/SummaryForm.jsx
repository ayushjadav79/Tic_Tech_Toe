import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SummaryForm = ({ data, updateData }) => {
  const [summary, setSummary] = useState(data || '');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(summary);
    toast({
      title: "Summary saved",
      description: "Your professional summary has been saved to your resume.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
      <p className="text-sm text-gray-500 mb-4">
        Write a brief summary that highlights your professional background, strengths, and career goals.
      </p>
      <Textarea
        placeholder="E.g., Software developer with 3+ years of experience in building scalable web applications..."
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={5}
      />
      <div className="pt-4">
        <Button type="submit">Save Summary</Button>
      </div>
    </form>
  );
};

export default SummaryForm;
