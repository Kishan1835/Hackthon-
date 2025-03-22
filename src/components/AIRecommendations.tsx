
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ExternalLink, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Recommendation {
  id: string;
  type: "skill" | "job" | "course" | "connection";
  title: string;
  description: string;
  relevanceScore: number;
  link?: string;
  linkText?: string;
  tags?: string[];
}

interface AIRecommendationsProps {
  recommendations: Recommendation[];
  isLoading?: boolean;
  onFeedback?: (id: string, isHelpful: boolean) => void;
}

const AIRecommendations = ({ 
  recommendations, 
  isLoading = false,
  onFeedback 
}: AIRecommendationsProps) => {
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean | null>>({});
  const [visibleItems, setVisibleItems] = useState(3);
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);
  
  useEffect(() => {
    // Animate in recommendations one by one
    if (recommendations.length > 0 && !isLoading) {
      const timer = setInterval(() => {
        setAnimatedItems(prev => {
          const nextItem = recommendations[prev.length]?.id;
          if (nextItem && prev.length < visibleItems) {
            return [...prev, nextItem];
          }
          clearInterval(timer);
          return prev;
        });
      }, 150);
      
      return () => clearInterval(timer);
    }
  }, [recommendations, visibleItems, isLoading]);

  const handleFeedback = (id: string, isHelpful: boolean) => {
    setFeedbackGiven(prev => ({ ...prev, [id]: isHelpful }));
    if (onFeedback) {
      onFeedback(id, isHelpful);
    }
  };

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 3);
  };
  
  const getRecommendationIcon = (type: Recommendation["type"]) => {
    switch (type) {
      case "skill":
        return "💡";
      case "job":
        return "💼";
      case "course":
        return "📚";
      case "connection":
        return "🔗";
      default:
        return "✨";
    }
  };
  
  const getRecommendationColor = (type: Recommendation["type"]) => {
    switch (type) {
      case "skill":
        return "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30";
      case "job":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30";
      case "course":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/30";
      case "connection":
        return "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800/30";
      default:
        return "bg-gray-50 border-gray-200 dark:bg-gray-800/40 dark:border-gray-700/30";
    }
  };
  
  const getRelevanceColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30";
    if (score >= 70) return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30";
    return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-800/50";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-lg font-medium text-foreground">AI Recommendations</h3>
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-full animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-muted/50 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted/50 rounded w-full mb-2"></div>
                <div className="h-4 bg-muted/50 rounded w-5/6"></div>
              </CardContent>
              <CardFooter>
                <div className="h-8 bg-muted rounded w-1/4"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.slice(0, visibleItems).map((rec) => (
            <Card 
              key={rec.id} 
              className={cn(
                "w-full transition-all border",
                getRecommendationColor(rec.type),
                animatedItems.includes(rec.id) 
                  ? "opacity-100 transform translate-y-0" 
                  : "opacity-0 transform translate-y-4"
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">{getRecommendationIcon(rec.type)}</span>
                    <CardTitle className="text-lg text-foreground">{rec.title}</CardTitle>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getRelevanceColor(rec.relevanceScore))}
                  >
                    {rec.relevanceScore}% match
                  </Badge>
                </div>
                <CardDescription className="text-muted-foreground">{rec.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {rec.tags && rec.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {rec.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {rec.link ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    asChild
                  >
                    <a href={rec.link} target="_blank" rel="noopener noreferrer">
                      {rec.linkText || "Learn more"}
                      <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                    </a>
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {!feedbackGiven[rec.id] ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleFeedback(rec.id, true)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleFeedback(rec.id, false)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {feedbackGiven[rec.id] ? "Thanks for your feedback!" : "We'll improve our recommendations"}
                  </span>
                )}
              </CardFooter>
            </Card>
          ))}
          
          {visibleItems < recommendations.length && (
            <div className="text-center pt-2">
              <Button variant="ghost" size="sm" onClick={handleLoadMore}>
                Load more recommendations
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card className="w-full bg-secondary/50">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No recommendations available yet. Upload your resume or complete your profile to get personalized recommendations.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIRecommendations;
