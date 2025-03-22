
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeUpload from "@/components/ResumeUpload";
import ResumeHowItWorks from "@/components/resume/ResumeHowItWorks";
import ResumeAnalysisCard from "@/components/resume/ResumeAnalysisCard";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/components/ui/use-toast";
import { analyzeResume, extractTextFromPDF, generateRecommendations } from "@/services/gemini";
import { useTheme } from "@/providers/ThemeProvider";

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

const Resume = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [analyzingResume, setAnalyzingResume] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [feedback, setFeedback] = useState<ResumeFeedback | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [geminiApiAvailable, setGeminiApiAvailable] = useState(false);
  
  // Check if Gemini API key is available
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("here is ur api key :",apiKey)
    if (apiKey) {
       setGeminiApiAvailable(true);
   } else {
       console.warn("Gemini API key not configured. Using mock data instead.");
   }
  }, []);
  
  const handleResumeUpload = async (file: File) => {
    try {
      setResumeUploaded(true);
      setAnalyzingResume(true);
      
      // Extract text from the uploaded PDF file
      const text = await extractTextFromPDF(file);
      setResumeText(text);
      
      if (geminiApiAvailable) {
        // Analyze the resume using Gemini AI
        const analysis = await analyzeResume(text);
        setFeedback(analysis);
        
        // Generate recommendations based on the resume
        const recs = await generateRecommendations(text);
        setRecommendations(recs);
      } else {
        // Use mock data if API key is not available
        setTimeout(() => {
          setFeedback({
            score: 72,
            strengths: [
              "Strong technical skills in JavaScript and React",
              "Clear work experience section with quantifiable achievements",
              "Well-structured resume format that is easy to follow",
              "Demonstrates leadership experience and teamwork capabilities",
            ],
            improvements: [
              "Add more specific metrics and achievements",
              "Tailor your resume for each specific job application",
              "Consider adding a skills section for better keyword matching",
              "Include relevant certifications or continuing education",
            ],
            keywordMatch: 65,
            atsCompatibility: 78,
            skillRecommendations: [
              "Cloud infrastructure (AWS/Azure/GCP)",
              "CI/CD pipelines",
              "GraphQL",
              "TypeScript",
              "Docker and containerization"
            ],
            marketTrends: [
              "AI/ML integration skills are highly sought after",
              "Cloud-native development experience",
              "DevOps and infrastructure as code knowledge",
              "Data visualization and analytics"
            ]
          });
          
          setRecommendations([
            {
              id: "1",
              type: "skill",
              title: "Learn Docker and Containerization",
              description: "Container skills are in high demand. Adding Docker would strengthen your profile significantly.",
              relevanceScore: 94,
              link: "https://www.docker.com/get-started/",
              linkText: "Start Learning Docker",
              tags: ["DevOps", "Container", "High Demand"]
            },
            {
              id: "2",
              type: "course",
              title: "Advanced TypeScript for React Developers",
              description: "TypeScript skills with React are increasingly required in job postings.",
              relevanceScore: 91,
              link: "https://www.typescriptlang.org/docs/",
              linkText: "Explore TypeScript",
              tags: ["Frontend", "TypeScript", "Market Trend"]
            },
            {
              id: "3",
              type: "skill",
              title: "Add Cloud Platform Experience",
              description: "AWS, Azure or GCP experience is mentioned in 78% of relevant job postings.",
              relevanceScore: 89,
              link: "https://aws.amazon.com/getting-started/",
              linkText: "Learn Cloud Platforms",
              tags: ["Cloud", "Infrastructure", "Growing Field"]
            }
          ]);
        }, 3000);
      }
      
      setTimeout(() => {
        setAnalysisComplete(true);
        setAnalyzingResume(false);
        
        toast({
          title: "Resume analysis complete",
          description: "Your resume has been analyzed by our AI assistant",
          variant: "default",
        });
      }, geminiApiAvailable ? 0 : 3000);
    } catch (error) {
      console.error("Error processing resume:", error);
      setAnalyzingResume(false);
      
      toast({
        title: "Error analyzing resume",
        description: "An error occurred while analyzing your resume. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Track analysis progress
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  useEffect(() => {
    if (analyzingResume && !analysisComplete) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + 5;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 800);
      
      return () => clearInterval(interval);
    }
    
    if (analysisComplete) {
      setAnalysisProgress(100);
    }
  }, [analyzingResume, analysisComplete]);
  
  const handleFeedback = (id: string, isHelpful: boolean) => {
    console.log(`Feedback for recommendation ${id}: ${isHelpful ? 'helpful' : 'not helpful'}`);
    toast({
      title: isHelpful ? "Feedback recorded" : "Feedback recorded",
      description: isHelpful 
        ? "We'll use this to improve our recommendations" 
        : "We'll try to provide better recommendations next time",
      variant: "default",
    });
  };
  
  const handleReset = () => {
    setResumeUploaded(false);
    setAnalysisComplete(false);
    setFeedback(null);
    setRecommendations([]);
  };
  
  if (!isUserLoaded) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Resume Builder
            </h1>
            <p className="text-muted-foreground mt-1">
              Upload your resume to get AI-powered analysis and improvement suggestions.
            </p>
          </div>
          
          {!resumeUploaded ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ResumeUpload onUploadComplete={handleResumeUpload} />
              <ResumeHowItWorks />
            </div>
          ) : (
            <div className="space-y-8">
              <ResumeAnalysisCard
                analysisComplete={analysisComplete}
                analyzingResume={analyzingResume}
                analysisProgress={analysisProgress}
                feedback={feedback}
                recommendations={recommendations}
                onFeedback={handleFeedback}
                onReset={handleReset}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resume;
