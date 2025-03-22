
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard", protected: true },
    { href: "/profile", label: "Profile", protected: true },
    { href: "/resume", label: "Resume Builder", protected: true },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 md:px-10 transition-all duration-300",
        isScrolled
          ? "py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-primary"
        >
          <span className="inline-block w-8 h-8 bg-primary rounded-md"></span>
          SkillBridge
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            if (link.protected) {
              return (
                <SignedIn key={link.href}>
                  <Link
                    to={link.href}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-gray-600 dark:text-gray-300"
                    )}
                  >
                    {link.label}
                  </Link>
                </SignedIn>
              );
            } else {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary",
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-300"
                  )}
                >
                  {link.label}
                </Link>
              );
            }
          })}
        </nav>

        {/* Auth Buttons, Theme Toggle and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          
          <SignedOut>
            <div className="hidden md:flex space-x-3">
              <Button asChild variant="outline">
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </div>
          </SignedOut>

          {/* Mobile Menu Toggle */}
          <button
            className="block md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 absolute top-full left-0 right-0 border-b border-gray-100 dark:border-gray-800 animate-fade-in animate-slide-in">
          <div className="py-4 px-6 space-y-3">
            {navLinks.map((link) => {
              if (link.protected) {
                return (
                  <SignedIn key={link.href}>
                    <Link
                      to={link.href}
                      className="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </SignedIn>
                );
              } else {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                );
              }
            })}
            
            <SignedOut>
              <div className="pt-3 space-y-2">
                <Button asChild className="w-full justify-center" variant="outline">
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="w-full justify-center">
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
