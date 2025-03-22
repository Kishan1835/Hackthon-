
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Loader2, TrendingUp } from "lucide-react";
import AIRecommendations from "@/components/AIRecommendations";
import ResumeAnalysisProgress from "./ResumeAnalysisProgress";
import ResumeScoreDisplay from "./ResumeScoreDisplay";
import ResumeFeedbackList from "./ResumeFeedbackList";
import MarketTrends from "./MarketTrends";

// Define feedback interface
interface ResumeFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  keywordMatch: number;
  atsCompatibility: number;
  skillRecommendations: string[];
  marketTrends?: string[];
}

// Define recommendation interface
interface Recommendation {
  id: string;
  type: "skill" | "course" | "job";
  title: string;
  description: string;
  relevanceScore: number;
  link: string;
  linkText: string;
  tags: string[];
}

interface ResumeAnalysisCardProps {
  analysisComplete: boolean;
  analyzingResume: boolean;
  analysisProgress: number;
  feedback: ResumeFeedback | null;
  recommendations: Recommendation[];
  onFeedback: (id: string, isHelpful: boolean) => void;
  onReset: () => void;
}

const ResumeAnalysisCard = ({
  analysisComplete,
  analyzingResume,
  analysisProgress,
  feedback,
  recommendations,
  onFeedback,
  onReset,
}: ResumeAnalysisCardProps) => {
  const [activeTab, setActiveTab] = useState("feedback");
  
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              Resume Analysis
              {!analysisComplete && analyzingResume && (
                <Loader2 className="h-4 w-4 animate-spin text-primary ml-2" />
              )}
              {analysisComplete && (
                <Badge variant="outline" className="bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-300 ml-2">
                  Complete
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {analyzingResume 
                ? "Analyzing your resume with our AI..." 
                : analysisComplete 
                  ? "Here's our analysis of your resume" 
                  : "Analyzing your resume..."}
            </CardDescription>
          </div>
          {analysisComplete && (
            <Button variant="outline" size="sm" className="flex gap-1.5">
              <Download className="h-4 w-4" />
              Download Analysis
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ResumeAnalysisProgress 
          analyzingResume={analyzingResume} 
          analysisComplete={analysisComplete} 
          analysisProgress={analysisProgress} 
        />
        
        {analysisComplete && feedback ? (
          <div className="space-y-6">
            <ResumeScoreDisplay 
              score={feedback.score} 
              keywordMatch={feedback.keywordMatch} 
              atsCompatibility={feedback.atsCompatibility} 
            />
            
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full bg-muted">
                <TabsTrigger value="feedback" className="flex-1 data-[state=active]:bg-background">Resume Feedback</TabsTrigger>
                <TabsTrigger value="recommendations" className="flex-1 data-[state=active]:bg-background">Recommendations</TabsTrigger>
                {feedback.marketTrends && feedback.marketTrends.length > 0 && (
                  <TabsTrigger value="market-trends" className="flex-1 data-[state=active]:bg-background">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Market Trends
                  </TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="feedback" className="pt-6 space-y-6">
                <ResumeFeedbackList 
                  strengths={feedback.strengths} 
                  improvements={feedback.improvements} 
                />
              </TabsContent>
              
              <TabsContent value="recommendations" className="pt-6">
                <AIRecommendations 
                  recommendations={recommendations.length > 0 ? recommendations : [
                    {
                      id: "1",
                      type: "skill",
                      title: "Add Docker to Your Skillset",
                      description: "Your resume mentions cloud experience. Adding Docker would strengthen your profile.",
                      relevanceScore: 94,
                      link: "#",
                      linkText: "Learn Docker",
                      tags: ["DevOps", "Container", "High Impact"]
                    },
                    {
                      id: "2",
                      type: "course",
                      title: "Improve Your System Design Skills",
                      description: "Adding system design experience would complement your backend development skills.",
                      relevanceScore: 88,
                      link: "#",
                      linkText: "View Course",
                      tags: ["Architecture", "Technical Design", "Backend"]
                    },
                    {
                      id: "3",
                      type: "job",
                      title: "BackEnd Engineer Internship",
                      description: "This position at TechCorp aligns well with your experience.",
                      relevanceScore: 90,
                      link: "#",
                      linkText: "View Job",
                      tags: ["Remote", "Internship", "NodeJS"]
                    }
                  ]}
                  onFeedback={onFeedback}
                />
              </TabsContent>
              
              {feedback.marketTrends && feedback.marketTrends.length > 0 && (
                <TabsContent value="market-trends" className="pt-6">
                  <MarketTrends trends={feedback.marketTrends} />
                </TabsContent>
              )}
            </Tabs>
          </div>
        ) : null}
      </CardContent>
      {analysisComplete && (
        <CardFooter className="border-t border-border pt-4 flex justify-end">
          <Button 
            variant="outline" 
            onClick={onReset}
          >
            Upload a New Resume
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ResumeAnalysisCard;
