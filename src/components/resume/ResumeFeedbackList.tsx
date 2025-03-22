
import { Check, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeFeedbackListProps {
  strengths: string[];
  improvements: string[];
}

const ResumeFeedbackList = ({
  strengths,
  improvements,
}: ResumeFeedbackListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium flex items-center gap-2 mb-4 text-green-700 dark:text-green-400">
          <Check className="h-5 w-5" />
          Strengths
        </h3>
        <ul className="space-y-3">
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/60 flex items-center justify-center mr-2 flex-shrink-0">
                <Check className="h-3.5 w-3.5 text-green-700 dark:text-green-400" />
              </div>
              <span className="text-sm text-foreground">{strength}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="font-medium flex items-center gap-2 mb-4 text-amber-700 dark:text-amber-400">
          <AlertTriangle className="h-5 w-5" />
          Areas for Improvement
        </h3>
        <ul className="space-y-3">
          {improvements.map((improvement, index) => (
            <li key={index} className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center mr-2 flex-shrink-0">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
              </div>
              <span className="text-sm text-foreground">{improvement}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="pt-2 md:col-span-2">
        <Button className="w-full sm:w-auto">
          Generate Improved Resume
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResumeFeedbackList;
