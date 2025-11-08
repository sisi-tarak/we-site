import React, { useState, useEffect } from "react";
import Icon from "../AppIcon";
import Button from "./Button";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("for-you");
  const [selectedAudience, setSelectedAudience] = useState<
    "worker" | "business" | "investor"
  >("worker");

  const navigationSections = [
    {
      id: "for-you",
      label: "For You",
      audienceLabels: {
        worker: "Start Earning",
        business: "Find Talent",
        investor: "Invest Now",
      },
      href: "#for-you",
    },
    {
      id: "how-it-works",
      label: "How It Works",
      audienceLabels: {
        worker: "Get Verified",
        business: "Post Tasks",
        investor: "See Returns",
      },
      href: "#how-it-works",
    },
    {
      id: "success-stories",
      label: "Success Stories",
      audienceLabels: {
        worker: "Real Earnings",
        business: "Happy Clients",
        investor: "ROI Stories",
      },
      href: "#success-stories",
    },
    {
      id: "pricing",
      label: "Pricing",
      audienceLabels: {
        worker: "Zero Fees",
        business: "Fair Rates",
        investor: "Investment Plans",
      },
      href: "#pricing",
    },
    {
      id: "get-started",
      label: "Get Started",
      audienceLabels: {
        worker: "Join Now",
        business: "Hire Now",
        investor: "Invest Now",
      },
      href: "#get-started",
    },
  ];

  const audienceOptions = [
    { value: "worker" as const, label: "Worker", icon: "Users" },
    { value: "business" as const, label: "Business", icon: "Building2" },
    { value: "investor" as const, label: "Investor", icon: "TrendingUp" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationSections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sections.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleAudienceChange = (
    audience: "worker" | "business" | "investor"
  ) => {
    setSelectedAudience(audience);
    // Trigger content personalization across sections
    const event = new CustomEvent("audienceChanged", { detail: { audience } });
    window.dispatchEvent(event);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-heading-bold text-sm">WE</span>
              </div>
              <span className="font-heading-bold text-xl text-foreground">
                WE Universal
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.href)}
                className={`font-body-medium text-sm transition-smooth hover:text-primary ${
                  activeSection === section.id
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-text-secondary"
                }`}
              >
                {section.audienceLabels[selectedAudience]}
              </button>
            ))}
          </nav>

          {/* Audience Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Audience Selector */}
            <div className="relative">
              <select
                value={selectedAudience}
                onChange={(e) =>
                  handleAudienceChange(
                    e.target.value as "worker" | "business" | "investor"
                  )
                }
                className="appearance-none bg-muted border border-border rounded-lg px-3 py-2 pr-8 text-sm font-body-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {audienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon
                name="ChevronDown"
                size={16}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
              />
            </div>

            {/* Primary CTA */}
            <Button
              variant="default"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              className="animate-pulse-cta shadow-cta"
              onClick={() => handleNavClick("#get-started")}
            >
              {selectedAudience === "worker" && "Start Earning"}
              {selectedAudience === "business" && "Find Talent"}
              {selectedAudience === "investor" && "Invest Now"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
          >
            <Icon
              name={isMenuOpen ? "X" : "Menu"}
              size={24}
              className="text-foreground"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {/* Mobile Audience Selector */}
            <div className="mb-4">
              <div className="flex space-x-2">
                {audienceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAudienceChange(option.value)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-body-medium transition-smooth ${
                      selectedAudience === option.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-text-secondary hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon name={option.icon} size={16} />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="space-y-2">
              {navigationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.href)}
                  className={`w-full text-left py-3 px-4 rounded-lg font-body-medium transition-smooth ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary border-l-4 border-primary"
                      : "text-text-secondary hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{section.audienceLabels[selectedAudience]}</span>
                    <Icon name="ChevronRight" size={16} />
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {section.label}
                  </div>
                </button>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="default"
                size="default"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                className="animate-pulse-cta shadow-cta"
                onClick={() => handleNavClick("#get-started")}
              >
                {selectedAudience === "worker" && "Start Earning Today"}
                {selectedAudience === "business" && "Find Talent Now"}
                {selectedAudience === "investor" && "Start Investing"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-border">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
          style={{
            width: `${Math.min(
              100,
              (window.pageYOffset /
                (document.documentElement.scrollHeight - window.innerHeight)) *
                100
            )}%`,
          }}
        />
      </div>
    </header>
  );
};

export default Header;
