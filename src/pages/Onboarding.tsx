
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ArrowRight, ArrowLeft, Check } from "lucide-react";

const stepsConfig = [
  { name: "Basic Info", description: "Your personal information" },
  { name: "Education", description: "Your academic background" },
  { name: "Skills", description: "Your skills and expertise" },
  { name: "Goals", description: "Your career aspirations" },
];

const OnboardingPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    university: "",
    major: "",
    graduationYear: new Date().getFullYear().toString(),
    skills: [] as string[],
    newSkill: "",
    bio: "",
    careerGoals: "",
    interests: [] as string[],
    newInterest: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddSkill = () => {
    if (formData.newSkill && !formData.skills.includes(formData.newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill],
        newSkill: ""
      }));
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };
  
  const handleAddInterest = () => {
    if (formData.newInterest && !formData.interests.includes(formData.newInterest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, prev.newInterest],
        newInterest: ""
      }));
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };
  
  const nextStep = () => {
    if (currentStep < stepsConfig.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  // Generate graduation year options
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 10 }, (_, i) => (currentYear - 2 + i).toString());

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-lg bg-white/90 backdrop-blur-sm border-white/40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Welcome to SkillBridge</CardTitle>
              <CardDescription>Let's set up your profile to get started</CardDescription>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {stepsConfig.length}
            </div>
          </div>
        </CardHeader>
        
        {/* Progress steps */}
        <div className="px-6">
          <div className="relative flex items-center justify-between mb-8">
            {stepsConfig.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors
                    ${currentStep >= index 
                      ? "border-primary bg-primary text-white" 
                      : "border-gray-200 bg-white text-gray-400"
                    }`}
                >
                  {currentStep > index ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="text-xs font-medium mt-2 text-center">
                  {step.name}
                </div>
              </div>
            ))}
            
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
                style={{ width: `${(currentStep / (stepsConfig.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <CardContent>
          {/* Step 1: Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">This is your account email from sign-up</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us a bit about yourself"
                  className="min-h-32 resize-none"
                />
                <p className="text-xs text-gray-500">This will be displayed on your public profile</p>
              </div>
            </div>
          )}
          
          {/* Step 2: Education */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  placeholder="Your university or college"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="Your field of study"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                <Select
                  value={formData.graduationYear}
                  onValueChange={(value) => handleSelectChange('graduationYear', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {graduationYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Step 3: Skills */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label>Your Skills</Label>
                <p className="text-sm text-gray-500 mb-3">
                  Add skills to help us match you with the right opportunities
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="py-1.5">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {formData.skills.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No skills added yet</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={formData.newSkill}
                    onChange={(e) => setFormData(prev => ({ ...prev, newSkill: e.target.value }))}
                    placeholder="Add a skill (e.g. JavaScript, Python)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddSkill}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-6">
                  <p className="font-medium mb-2">Suggested Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "Python", "React", "UI/UX Design", "Project Management", "Communication", "Data Analysis", "Problem Solving"]
                      .filter(skill => !formData.skills.includes(skill))
                      .slice(0, 5)
                      .map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary/10 transition-colors"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            skills: [...prev.skills, skill]
                          }))}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Goals */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="careerGoals">Career Goals</Label>
                <Textarea
                  id="careerGoals"
                  name="careerGoals"
                  value={formData.careerGoals}
                  onChange={handleInputChange}
                  placeholder="What are your career aspirations?"
                  className="min-h-24 resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Areas of Interest</Label>
                <p className="text-sm text-gray-500 mb-3">
                  Add areas you're interested in exploring in your career
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="py-1.5">
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-1 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {formData.interests.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No interests added yet</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={formData.newInterest}
                    onChange={(e) => setFormData(prev => ({ ...prev, newInterest: e.target.value }))}
                    placeholder="Add an interest (e.g. Machine Learning, UX Design)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddInterest();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddInterest}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-6">
                  <p className="font-medium mb-2">Suggested Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {["Web Development", "Machine Learning", "Product Management", "UX Design", "Data Science", "Entrepreneurship", "Cloud Computing", "Blockchain"]
                      .filter(interest => !formData.interests.includes(interest))
                      .slice(0, 5)
                      .map((interest) => (
                        <Badge 
                          key={interest} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary/10 transition-colors"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            interests: [...prev.interests, interest]
                          }))}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {interest}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {currentStep < stepsConfig.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Complete Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingPage;
