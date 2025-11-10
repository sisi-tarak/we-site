import React, { useState, useEffect } from "react";
import Icon from "../AppIcon";
import Button from "./Button";
import logoImg from "../assets/2.png";

interface HeaderProps {
  className?: string;
}

// Constant navigation section IDs and hrefs (used for scrolling)
const NAVIGATION_SECTION_IDS = [
  "for-you",
  "how-it-works",
  "success-stories",
  "pricing",
  "get-started",
];

const Header = ({ className = "" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("for-you");
  const [selectedAudience, setSelectedAudience] = useState<
    "worker" | "business" | "investor"
  >("worker");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const headerRef = React.useRef<HTMLElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const audienceChangeTimeRef = React.useRef<number>(0);

  const navigationSections = [
    {
      id: "for-you",
      label: "For You",
      audienceLabels: {
        worker: "Start Earning",
        business: "View Plans",
        investor: "Join Waitlist",
      },
      href: "#for-you",
    },
    {
      id: "how-it-works",
      label: "How It Works",
      audienceLabels: {
        worker: "How It Works",
        business: "How It Works",
        investor: "How It Works",
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
        worker: "Rewards",
        business: "Pricing",
        investor: "Partnerships",
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent body scroll
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        headerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !headerRef.current
          .querySelector('button[aria-label*="menu"]')
          ?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Close menu on ESC key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // Load saved audience preference
    const savedAudience = localStorage.getItem("selectedAudience") as
      | "worker"
      | "business"
      | "investor"
      | null;
    if (
      savedAudience &&
      ["worker", "business", "investor"].includes(savedAudience)
    ) {
      setSelectedAudience(savedAudience);
    }

    // Listen for audience changes from LandingPage
    const handleAudienceChanged = (event: Event) => {
      const customEvent = event as CustomEvent<{
        audience: "worker" | "business" | "investor";
      }>;
      if (customEvent.detail?.audience) {
        setSelectedAudience(customEvent.detail.audience);
      }
    };

    window.addEventListener("audienceChanged", handleAudienceChanged);

    return () => {
      window.removeEventListener("audienceChanged", handleAudienceChanged);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll progress
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Update active section using constant section IDs
      const sections = NAVIGATION_SECTION_IDS.map((id) => ({
        id,
        element: document.getElementById(id),
      }));

      // Find the section that's currently in view
      const headerOffset = 100; // Account for header height
      let currentSection = NAVIGATION_SECTION_IDS[0] || "for-you";

      for (const section of sections) {
        if (!section.element) continue;
        const rect = section.element.getBoundingClientRect();
        // Check if section is in viewport (with some offset)
        if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
          currentSection = section.id;
          break;
        }
        // If we've scrolled past this section, it's the active one
        if (rect.top < headerOffset) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    // Initial call
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []); // navigationSections is effectively constant, so no need to include in deps

  const handleNavClick = (
    href: string,
    e?: React.MouseEvent | React.TouchEvent
  ) => {
    e?.preventDefault();
    e?.stopPropagation();

    // Close menu first
    setIsMenuOpen(false);

    // Calculate delay based on whether audience just changed
    // If audience changed recently, wait longer for React to update sections
    const timeSinceAudienceChange = Date.now() - audienceChangeTimeRef.current;
    const baseDelay = 150; // Base delay for menu animation
    const audienceChangeDelay = timeSinceAudienceChange < 500 ? 350 : 0;
    const totalDelay = baseDelay + audienceChangeDelay;

    // Wait for menu animation AND React state updates to complete before scrolling
    // This ensures sections have updated with the new audience before we scroll to them
    setTimeout(() => {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        const element = document.querySelector(href);
        if (element) {
          // Get actual header height (may vary on mobile)
          const headerElement = headerRef.current;
          const headerHeight = headerElement ? headerElement.offsetHeight : 64;

          // Get element position (recalculate in case content changed)
          const elementPosition = element.getBoundingClientRect().top;
          const currentScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          const offsetPosition = elementPosition + currentScroll - headerHeight;

          // Smooth scroll with better mobile support
          if ("scrollBehavior" in document.documentElement.style) {
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: "smooth",
            });
          } else {
            // Fallback for older browsers
            window.scrollTo(0, Math.max(0, offsetPosition));
          }
        }
      });
    }, totalDelay);
  };

  const handleAudienceChange = (
    audience: "worker" | "business" | "investor",
    e?: React.MouseEvent | React.TouchEvent
  ) => {
    e?.preventDefault();
    e?.stopPropagation();

    // Track when audience changes so navigation can wait for content to update
    audienceChangeTimeRef.current = Date.now();

    setSelectedAudience(audience);
    localStorage.setItem("selectedAudience", audience);
    // Trigger content personalization across sections
    const event = new CustomEvent("audienceChanged", { detail: { audience } });
    window.dispatchEvent(event);
  };

  // Track banner visibility for header positioning
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      // Check if banner is visible (banner hides after 100vh scroll)
      setIsBannerVisible(scrollPosition < windowHeight);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky ${
        isBannerVisible ? "top-[48px]" : "top-0"
      } z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border transition-all duration-300 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logoImg}
              alt="WE Universal Logo"
              width={100}
              height={100}
            />
            {/*<button
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center space-x-2 hover:opacity-80 active:opacity-70 transition-opacity cursor-pointer touch-manipulation"
              aria-label="Scroll to top"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-heading-bold text-sm">WE</span>
              </div>
              <span className="font-heading-bold text-xl text-foreground hidden sm:inline-block">
                WE Universal
              </span>
            </button> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={(e) => handleNavClick(section.href, e)}
                className={`font-body-medium text-sm transition-smooth hover:text-primary cursor-pointer ${
                  activeSection === section.id
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-text-secondary"
                }`}
              >
                {section.audienceLabels[selectedAudience]}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Audience Selector */}
            {/*<div className="relative">
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
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#get-started", e);
              }}
            >
              {selectedAudience === "worker" && "Start Earning"}
              {selectedAudience === "business" && "Find Talent"}
              {selectedAudience === "investor" && "Invest Now"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="md:hidden p-2.5 rounded-lg hover:bg-muted active:bg-muted/80 transition-all duration-200 cursor-pointer touch-manipulation active:scale-95"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Icon
              name={isMenuOpen ? "X" : "Menu"}
              size={24}
              className="text-foreground transition-transform duration-200"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-[100vh] opacity-100 py-4 border-t border-border"
              : "max-h-0 opacity-0 py-0 border-t-0 pointer-events-none"
          }`}
          aria-hidden={!isMenuOpen}
        >
          {/* Mobile Audience Selector */}
          <div className="mb-4 px-1">
            <div className="text-xs font-body-medium text-text-secondary mb-2 px-1">
              Select Your Role
            </div>
            <div className="flex space-x-2">
              {audienceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={(e) => handleAudienceChange(option.value, e)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleAudienceChange(option.value, e);
                  }}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-lg text-sm font-body-medium transition-all duration-200 active:scale-95 touch-manipulation ${
                    selectedAudience === option.value
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-text-secondary active:bg-accent active:text-accent-foreground"
                  }`}
                  aria-label={`Switch to ${option.label} view`}
                  aria-pressed={selectedAudience === option.value}
                >
                  <Icon name={option.icon} size={18} />
                  <span className="font-body-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-1">
            {navigationSections.map((section, index) => (
              <button
                key={section.id}
                onClick={(e) => handleNavClick(section.href, e)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleNavClick(section.href, e);
                }}
                className={`w-full text-left py-4 px-4 rounded-lg font-body-medium transition-all duration-200 cursor-pointer touch-manipulation active:scale-[0.98] ${
                  activeSection === section.id
                    ? "bg-primary/15 text-primary border-l-4 border-primary shadow-sm"
                    : "text-text-secondary active:bg-muted active:text-foreground"
                }`}
                style={{
                  animationDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                }}
                aria-label={`Navigate to ${section.label}`}
                aria-current={activeSection === section.id ? "page" : undefined}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <span className="font-body-medium text-base">
                      {section.audienceLabels[selectedAudience]}
                    </span>
                    <span className="text-xs text-text-secondary mt-0.5 font-body">
                      {section.label}
                    </span>
                  </div>
                  <Icon
                    name="ChevronRight"
                    size={18}
                    className={`transition-transform ${
                      activeSection === section.id
                        ? "text-primary"
                        : "text-text-secondary"
                    }`}
                  />
                </div>
              </button>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              variant="default"
              size="default"
              fullWidth
              iconName="ArrowRight"
              iconPosition="right"
              className="animate-pulse-cta shadow-cta py-4 text-base font-body-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#get-started", e);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleNavClick("#get-started", e);
              }}
            >
              {selectedAudience === "worker" && "Start Earning Today"}
              {selectedAudience === "business" && "Find Talent Now"}
              {selectedAudience === "investor" && "Start Investing"}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-border">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>
    </header>
  );
};

export default Header;
