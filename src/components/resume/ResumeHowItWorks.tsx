
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";

const ResumeHowItWorks = () => {
  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              step: "Upload Resume",
              description: "Upload your current resume in PDF or Word format."
            },
            {
              step: "AI Analysis",
              description: "Our AI will analyze your resume for strengths and areas of improvement."
            },
            {
              step: "Get Recommendations",
              description: "Receive tailored recommendations to enhance your resume."
            },
            {
              step: "Apply Changes",
              description: "Apply the suggested changes and download your improved resume."
            }
          ].map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {index + 1}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1 dark:text-white">{item.step}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card className="bg-blue-50 border-blue-100 dark:bg-blue-900/30 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ThumbsUp className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-1 dark:text-white">Pro Tip</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                For the best results, make sure your resume includes your skills, 
                work experience, and education. Having these sections clearly defined 
                will help our AI provide more accurate recommendations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeHowItWorks;
