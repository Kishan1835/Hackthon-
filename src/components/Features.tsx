
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  BriefcaseIcon, 
  FileTextIcon, 
  LinkedinIcon, 
  GraduationCapIcon, 
  BarChartIcon, 
  MessageSquareIcon
} from "lucide-react";

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const featureItems: FeatureItem[] = [
  {
    icon: BriefcaseIcon,
    title: "Internship & Freelance Matching",
    description: "Get matched with relevant internships and freelance opportunities based on your skills and interests.",
    color: "bg-blue-100 text-blue-700"
  },
  {
    icon: FileTextIcon,
    title: "Resume Optimization",
    description: "AI-powered resume analysis with personalized recommendations to improve your chances of getting hired.",
    color: "bg-purple-100 text-purple-700"
  },
  {
    icon: LinkedinIcon,
    title: "LinkedIn Enhancements",
    description: "Get AI-generated suggestions to enhance your LinkedIn profile and increase visibility to recruiters.",
    color: "bg-indigo-100 text-indigo-700"
  },
  {
    icon: GraduationCapIcon,
    title: "Career Path Recommendations",
    description: "Discover personalized career paths based on your skills, education, and interests.",
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    icon: BarChartIcon,
    title: "Skills Assessment",
    description: "Identify your strengths and areas for improvement with detailed skills assessment.",
    color: "bg-amber-100 text-amber-700"
  },
  {
    icon: MessageSquareIcon,
    title: "Networking Assistance",
    description: "Connect with peers, mentors, and industry professionals to expand your professional network.",
    color: "bg-rose-100 text-rose-700"
  }
];

const Features = () => {
  const [inView, setInView] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-32 px-6 overflow-hidden" ref={featuresRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unlock Your Full Potential
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Our platform offers a comprehensive suite of tools to help you build your skills, connect with opportunities, and advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featureItems.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-md transform hover:-translate-y-1 flex flex-col",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={cn("p-3 rounded-lg inline-flex mb-5 w-min", feature.color)}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 flex-grow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
