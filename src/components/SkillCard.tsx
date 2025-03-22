
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
import { Clock, ArrowRight } from "lucide-react";

interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  endorsements: number;
}

interface SkillCardProps {
  title: string;
  description: string;
  skills: Skill[];
  onClick?: () => void;
  actionLabel?: string;
  date?: string;
}

const getLevelColor = (level: Skill["level"]) => {
  switch (level) {
    case "Beginner":
      return "bg-blue-100 text-blue-800";
    case "Intermediate":
      return "bg-green-100 text-green-800";
    case "Advanced":
      return "bg-purple-100 text-purple-800";
    case "Expert":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const SkillCard = ({
  title,
  description,
  skills,
  onClick,
  actionLabel = "View Details",
  date,
}: SkillCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          {date && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {date}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2.5"></div>
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Badge variant="outline" className={`text-xs py-0.5 ${getLevelColor(skill.level)}`}>
                  {skill.level}
                </Badge>
                {skill.endorsements > 0 && (
                  <span className="text-xs text-gray-500">{skill.endorsements} endorsements</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full justify-between" onClick={onClick}>
          {actionLabel}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;
