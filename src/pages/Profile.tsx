
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/ProfileForm";
import SkillCard from "@/components/SkillCard";
import { useUser } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";

// Mock data
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

const Profile = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleProfileSubmit = (values: any) => {
    console.log("Profile form submitted:", values);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  if (!isUserLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Your Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your profile information and showcase your skills.
            </p>
          </div>
          
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="bg-white border border-gray-100 p-1 rounded-lg w-full md:w-auto">
              <TabsTrigger 
                value="profile" 
                className="rounded-md px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="skills" 
                className="rounded-md px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger 
                value="education" 
                className="rounded-md px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Education
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="rounded-md px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Projects
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and how you want to be represented on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm 
                    onSubmit={handleProfileSubmit}
                    defaultValues={{
                      fullName: user?.fullName || "",
                      university: "",
                      major: "",
                      graduationYear: new Date().getFullYear().toString(),
                      bio: "",
                      linkedInUrl: "",
                      githubUrl: "",
                      portfolioUrl: ""
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="skills" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockSkills.map((skillSet, index) => (
                  <SkillCard
                    key={index}
                    title={skillSet.title}
                    description={skillSet.description}
                    skills={skillSet.skills}
                    actionLabel="Edit Skills"
                    onClick={() => {
                      // Handle edit skills
                    }}
                  />
                ))}
              </div>
              
              <Card className="bg-white border-gray-100 border-dashed hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <span className="text-primary text-2xl">+</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-1">Add New Skill Category</h3>
                  <p className="text-gray-500 text-sm">
                    Create a new category to group related skills.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="education" className="mt-6">
              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>
                    Add your educational background, including degrees, certifications, and courses.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-primary/10 p-6 mb-6">
                    <span className="text-primary text-4xl">🎓</span>
                  </div>
                  <h3 className="text-xl font-medium mb-3">No Education Added Yet</h3>
                  <p className="text-gray-500 max-w-md mb-6">
                    Add your educational history to help employers and AI better understand your qualifications.
                  </p>
                  <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Add Education
                  </button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects" className="mt-6">
              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>
                    Showcase your work, personal projects, and contributions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-primary/10 p-6 mb-6">
                    <span className="text-primary text-4xl">💻</span>
                  </div>
                  <h3 className="text-xl font-medium mb-3">No Projects Added Yet</h3>
                  <p className="text-gray-500 max-w-md mb-6">
                    Add your projects to showcase your skills and experience to potential employers.
                  </p>
                  <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Add Project
                  </button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
