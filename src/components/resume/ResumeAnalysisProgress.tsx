
import { Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResumeAnalysisProgressProps {
  analyzingResume: boolean;
  analysisComplete: boolean;
  analysisProgress: number;
}

const ResumeAnalysisProgress = ({
  analyzingResume,
  analysisComplete,
  analysisProgress,
}: ResumeAnalysisProgressProps) => {
  if (!analyzingResume || analysisComplete) return null;

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2 text-foreground">Analyzing Your Resume</h3>
        <p className="text-muted-foreground mb-4 text-center max-w-md">
          Our AI is reviewing your resume to provide personalized feedback and recommendations. 
          This might take a minute.
        </p>
        <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300" 
            style={{ width: `${analysisProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisProgress;
