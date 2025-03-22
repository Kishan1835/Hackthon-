
import { Badge } from "@/components/ui/badge";

interface ResumeScoreDisplayProps {
  score: number;
  keywordMatch: number;
  atsCompatibility: number;
}

const ResumeScoreDisplay = ({
  score,
  keywordMatch,
  atsCompatibility,
}: ResumeScoreDisplayProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
      <div className="bg-secondary/50 rounded-xl p-6 text-center flex-1">
        <div className="mb-2">
          <div className="inline-block rounded-full h-16 w-16 bg-blue-50 dark:bg-blue-900/50 border-4 border-blue-100 dark:border-blue-800/50 p-2">
            <div className="h-full w-full rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              {score}
            </div>
          </div>
        </div>
        <h3 className="font-medium text-foreground">Overall Score</h3>
        <p className="text-sm text-muted-foreground">Out of 100</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-medium text-foreground">Keyword Match</h4>
            <Badge variant="outline" className="bg-amber-50 text-amber-800 dark:bg-amber-900/50 dark:text-amber-400">
              {keywordMatch}%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            How well your resume matches industry keywords
          </p>
        </div>
        
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-medium text-foreground">ATS Compatibility</h4>
            <Badge variant="outline" className="bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-400">
              {atsCompatibility}%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            How well your resume works with screening systems
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreDisplay;
