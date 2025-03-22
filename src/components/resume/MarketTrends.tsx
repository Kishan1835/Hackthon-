
import { TrendingUp, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MarketTrendsProps {
  trends: string[];
}

const MarketTrends = ({ trends }: MarketTrendsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <TrendingUp className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-medium">Current Market Trends</h3>
      </div>
      
      <p className="text-muted-foreground">
        Based on our analysis of current job market data, these are the trending skills and technologies that align with your profile:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {trends.map((trend, index) => (
          <Card key={index} className="bg-card border-border overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-card-foreground font-medium">{trend}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        <Button className="gap-2">
          Explore More Market Trends
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MarketTrends;
