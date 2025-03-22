
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ArrowRight, Award, Briefcase, Cpu, Sparkles } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-[90vh] w-full flex items-center relative overflow-hidden px-6">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-blue-50 -z-20 transform -skew-y-6 origin-left translate-y-[-30%]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 right-[15%] animate-float delay-300">
        <div className="glass-card rounded-xl w-16 h-16 flex items-center justify-center shadow-lg">
          <Cpu className="text-primary" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-[10%] animate-float delay-700">
        <div className="glass-card rounded-xl w-14 h-14 flex items-center justify-center shadow-lg">
          <Award className="text-primary" />
        </div>
      </div>
      <div className="absolute top-1/3 left-[20%] animate-float">
        <div className="glass-card rounded-xl w-12 h-12 flex items-center justify-center shadow-lg">
          <Briefcase className="text-primary" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-32 md:py-40 w-full grid md:grid-cols-2 gap-10 md:gap-20">
        <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Skills Marketplace
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            Your Path to Career
            <span className="block text-primary mt-1">Excellence</span>
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-xl">
            Connect your skills to opportunities with AI-powered matching, personalized career path recommendations, and resume optimization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <SignedOut>
              <Button asChild size="lg" className="px-6 py-6 text-base rounded-lg">
                <Link to="/sign-up">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6 py-6 text-base rounded-lg">
                <Link to="/sign-in">
                  Sign In
                </Link>
              </Button>
            </SignedOut>
            
            <SignedIn>
              <Button asChild size="lg" className="px-6 py-6 text-base rounded-lg">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6 py-6 text-base rounded-lg">
                <Link to="/profile">
                  Update Profile
                </Link>
              </Button>
            </SignedIn>
          </div>
        </div>
        
        <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl transform translate-y-4 translate-x-4">
              <div className="aspect-square md:aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-50 p-8 flex items-center justify-center">
                <div className="glass-card p-6 rounded-xl w-full max-w-md">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                      <Sparkles />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-20 bg-blue-200 rounded-full"></div>
                      <div className="h-2 w-14 bg-blue-100 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-blue-200 rounded-full"></div>
                    <div className="h-4 w-1/2 bg-blue-100 rounded-full"></div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="h-10 bg-white/80 rounded-lg"></div>
                      <div className="h-10 bg-primary/20 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-gray-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
