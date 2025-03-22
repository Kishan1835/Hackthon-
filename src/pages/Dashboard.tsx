
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIRecommendations from "@/components/AIRecommendations";
import SkillCard from "@/components/SkillCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/clerk-react";
import { ArrowUpRight, FileText, Plus, BookOpen, LineChart } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const mockRecommendations = [
  {
    id: "1",
    type: "skill" as const,
    title: "Learn React Testing Library",
    description: "Based on your React skills, improving your testing knowledge will make you more marketable.",
    relevanceScore: 92,
    link: "https://testing-library.com/docs/react-testing-library/intro/",
    linkText: "Start Learning",
    tags: ["React", "Testing", "Frontend"]
  },
  {
    id: "2",
    type: "job" as const,
    title: "Frontend Developer Intern",
    description: "This opportunity at TechCorp matches your React and TypeScript skills.",
    relevanceScore: 88,
    link: "#",
    linkText: "View Job",
    tags: ["Remote", "Internship", "React", "3 months"]
  },
  {
    id: "3",
    type: "course" as const,
    title: "Advanced TypeScript Patterns",
    description: "This course will help you master TypeScript and boost your development skills.",
    relevanceScore: 85,
    link: "#",
    linkText: "View Course",
    tags: ["TypeScript", "Advanced", "7 hours"]
  },
  {
    id: "4",
    type: "connection" as const,
    title: "Connect with Sarah Chen",
    description: "Senior Developer at Google who graduated from your university.",
    relevanceScore: 78,
    link: "#",
    linkText: "Send Request",
    tags: ["Google", "Alumni", "Frontend"]
  },
  {
    id: "5",
    type: "job" as const,
    title: "Web Developer (Part-time)",
    description: "Local startup looking for part-time help with their website. Perfect for students.",
    relevanceScore: 75,
    link: "#",
    linkText: "View Job",
    tags: ["Part-time", "Local", "HTML/CSS", "JavaScript"]
  }
];

const mockSkills = [
  {
    title: "Technical Skills",
    description: "Your core programming and technical abilities",
    skills: [
      { name: "JavaScript", level: "Advanced" as const, endorsements: 12 },
      { name: "React.js", level: "Intermediate" as const, endorsements: 8 },
      { name: "TypeScript", level: "Intermediate" as const, endorsements: 5 },
      { name: "Node.js", level: "Beginner" as const, endorsements: 3 }
    ]
  },
  {
    title: "Soft Skills",
    description: "Your interpersonal and communication abilities",
    skills: [
      { name: "Communication", level: "Advanced" as const, endorsements: 7 },
      { name: "Teamwork", level: "Advanced" as const, endorsements: 9 },
      { name: "Problem Solving", level: "Intermediate" as const, endorsements: 6 },
      { name: "Time Management", level: "Intermediate" as const, endorsements: 4 }
    ]
  }
];

const upcomingEvents = [
  {
    id: "1",
    title: "Tech Career Fair",
    date: "Jun 15, 2023",
    description: "Virtual career fair with 50+ companies hiring for tech positions."
  },
  {
    id: "2",
    title: "Resume Workshop",
    date: "Jun 22, 2023",
    description: "Learn how to optimize your resume for tech roles with industry experts."
  }
];

const Dashboard = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isUserLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome, {user?.firstName || 'Student'}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your personalized dashboard with recommendations and opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content area - 2/3 width on desktop */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Profile: 75% complete</span>
                      <Link to="/profile" className="text-sm text-primary hover:underline flex items-center">
                        Complete Profile
                        <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                      {[
                        { 
                          icon: <FileText className="h-5 w-5" />, 
                          label: "Resume",
                          completed: false,
                          link: "/resume"
                        },
                        { 
                          icon: <BookOpen className="h-5 w-5" />, 
                          label: "Education",
                          completed: true,
                          link: "/profile"
                        },
                        { 
                          icon: <LineChart className="h-5 w-5" />, 
                          label: "Skills",
                          completed: true,
                          link: "/profile"
                        },
                        { 
                          icon: <Plus className="h-5 w-5" />, 
                          label: "Projects",
                          completed: false,
                          link: "/profile"
                        }
                      ].map((item, index) => (
                        <Link 
                          key={index} 
                          to={item.link}
                          className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                        >
                          <div className={`rounded-full p-2 mb-2 ${item.completed ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {item.icon}
                          </div>
                          <span className="text-sm text-center">{item.label}</span>
                          <span className="text-xs text-gray-500">
                            {item.completed ? "Completed" : "Incomplete"}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <AIRecommendations 
                recommendations={mockRecommendations} 
                isLoading={isLoading}
                onFeedback={(id, isHelpful) => {
                  console.log(`Feedback for recommendation ${id}: ${isHelpful ? 'helpful' : 'not helpful'}`);
                }}
              />
            </div>
            
            {/* Sidebar - 1/3 width on desktop */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Your Skills</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/profile">Manage</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="technical">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="technical" className="flex-1">Technical</TabsTrigger>
                      <TabsTrigger value="soft" className="flex-1">Soft Skills</TabsTrigger>
                    </TabsList>
                    <TabsContent value="technical" className="space-y-3">
                      {mockSkills[0].skills.map((skill, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2.5"></div>
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {skill.level}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="soft" className="space-y-3">
                      {mockSkills[1].skills.map((skill, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2.5"></div>
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {skill.level}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <span className="text-xs text-gray-500">{event.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                          Learn more
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" size="sm" className="w-full">
                      View All Events
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
