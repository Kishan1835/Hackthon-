
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseIcon, BookOpen, Users, Laptop } from "lucide-react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <Features />
        
        {/* How it works */}
        <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How SkillBridge Works
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our platform simplifies the process of showcasing your skills, 
                receiving personalized recommendations, and connecting with opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: <Laptop className="h-8 w-8" />,
                  title: "Create Profile",
                  description: "Sign up and build your student profile highlighting your skills and experiences."
                },
                {
                  icon: <BookOpen className="h-8 w-8" />,
                  title: "Upload Resume",
                  description: "Upload your resume to get AI-powered analysis and recommendations."
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Connect & Network",
                  description: "Connect with peers, mentors, and professionals in your field."
                },
                {
                  icon: <BriefcaseIcon className="h-8 w-8" />,
                  title: "Apply to Opportunities",
                  description: "Apply to internships and freelance opportunities matched to your skills."
                }
              ].map((step, index) => (
                <div key={index} className={`text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                  <div className="rounded-full bg-primary/10 p-4 inline-flex mb-5">
                    <div className="rounded-full bg-primary/20 p-3 text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 md:py-28 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Launch Your Career?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join SkillBridge today and connect with opportunities that match your skills and career goals.
            </p>
            <Button asChild size="lg" className="px-8 py-6 text-base rounded-lg">
              <Link to="/sign-up">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
