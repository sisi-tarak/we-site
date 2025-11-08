import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import ScrollProgressIndicator from "../../components/ui/ScrollProgressIndicator";
import AudienceSelectorPersistence from "../../components/ui/AudienceSelectorPersistence";
import ConversionTrackingNav from "components/ui/ConversionTrackingNav";

// Import all components
import HeroSection from "./components/HeroSection";
import ValuePropositionSection from "./components/ValuePropositionSection";
import JourneySection from "./components/JourneySection";
import HowItWorksSection from "./components/HowItWorksSection";
import TestimonialsSection from "./components/TestimonialsSection";
import MetricsSection from "./components/MetricsSection";
import PricingSection from "./components/PricingSection";
import CTASection from "./components/CTASection";
import FAQSection from "./components/FAQSection";

import { AudienceType } from "./types";

const LandingPage = () => {
  const [selectedAudience, setSelectedAudience] =
    useState<AudienceType["id"]>("worker");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved audience preference
    const savedAudience = localStorage.getItem("selectedAudience") as
      | AudienceType["id"]
      | null;
    if (
      savedAudience &&
      ["worker", "business", "investor"].includes(savedAudience)
    ) {
      setSelectedAudience(savedAudience);
    }

    // Listen for audience changes from Header or other components
    const handleAudienceChanged = (event: Event) => {
      const customEvent = event as CustomEvent<{
        audience: AudienceType["id"];
      }>;
      if (
        customEvent.detail?.audience &&
        ["worker", "business", "investor"].includes(customEvent.detail.audience)
      ) {
        setSelectedAudience(customEvent.detail.audience);
      }
    };

    window.addEventListener("audienceChanged", handleAudienceChanged);

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener("audienceChanged", handleAudienceChanged);
      clearTimeout(timer);
    };
  }, []);

  const handleAudienceChange = (audience: AudienceType["id"]) => {
    setSelectedAudience(audience);
    localStorage.setItem("selectedAudience", audience);

    // Dispatch custom event for other components
    const event = new CustomEvent("audienceChanged", { detail: { audience } });
    window.dispatchEvent(event);
  };

  // SEO content based on audience
  const getSEOContent = () => {
    const baseTitle = "WE Universal - India's Most Trusted Gig Platform";
    const baseDescription =
      "Join India's fastest-growing gig economy platform with 100% verified users, instant UPI payments, and zero commission first month.";

    switch (selectedAudience) {
      case "worker":
        return {
          title: `${baseTitle} | Start Earning ₹10,000+/Month`,
          description: `${baseDescription} Perfect for students and homemakers seeking flexible income opportunities.`,
          keywords:
            "gig work, student jobs, flexible income, part-time work, online earning, UPI payments, college students, homemakers",
        };
      case "business":
        return {
          title: `${baseTitle} | Find Verified Local Talent`,
          description: `${baseDescription} Connect with pre-verified professionals and reduce operational costs by 60%.`,
          keywords:
            "hire talent, verified workers, local professionals, task outsourcing, business solutions, cost reduction",
        };
      case "investor":
        return {
          title: `${baseTitle} | 15-25x Return Investment Opportunity`,
          description: `${baseDescription} Early investment opportunity in India's ₹400Cr gig economy market.`,
          keywords:
            "investment opportunity, startup investment, gig economy, high returns, Series A, angel investment",
        };
      default:
        return {
          title: baseTitle,
          description: baseDescription,
          keywords:
            "gig economy, verified platform, instant payments, flexible work, India",
        };
    }
  };

  const seoContent = getSEOContent();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-heading-bold text-xl">WE</span>
          </div>
          <div className="text-lg font-heading-bold text-foreground mb-2">
            Loading WE Universal
          </div>
          <div className="text-sm text-text-secondary">
            Preparing your personalized experience...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{seoContent.title}</title>
        <meta name="description" content={seoContent.description} />
        <meta name="keywords" content={seoContent.keywords} />
        <meta property="og:title" content={seoContent.title} />
        <meta property="og:description" content={seoContent.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://weuniversal.com/landing-page"
        />
        <meta
          property="og:image"
          content="https://weuniversal.com/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoContent.title} />
        <meta name="twitter:description" content={seoContent.description} />
        <meta
          name="twitter:image"
          content="https://weuniversal.com/og-image.jpg"
        />
        <link rel="canonical" href="https://weuniversal.com/landing-page" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en-IN" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "WE Universal",
            url: "https://weuniversal.com",
            description: seoContent.description,
            potentialAction: {
              "@type": "SearchAction",
              target: "https://weuniversal.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>

      {/* Global Components */}
      <Header />
      <ScrollProgressIndicator />
      <AudienceSelectorPersistence onAudienceChange={handleAudienceChange} />
      <ConversionTrackingNav />

      {/* Main Content */}
      <main className="min-h-screen bg-background">
        {/* Hero Section - Above the fold with audience selector */}
        <HeroSection
          selectedAudience={selectedAudience}
          onAudienceChange={handleAudienceChange}
        />

        {/* Universal Value Proposition - Rotating benefits */}
        <ValuePropositionSection selectedAudience={selectedAudience} />

        {/* Three-Path Journey - Interactive timeline */}
        <JourneySection selectedAudience={selectedAudience} />

        {/* How It Works - Scroll-triggered timeline */}
        <HowItWorksSection />

        {/* Community Testimonials - Auto-rotating carousel */}
        <TestimonialsSection selectedAudience={selectedAudience} />

        {/* Social Proof Metrics - Animated counters */}
        <MetricsSection />

        {/* Transparent Pricing - Interactive comparison */}
        <PricingSection selectedAudience={selectedAudience} />

        {/* Final Multi-CTA - Audience-specific urgency */}
        <CTASection selectedAudience={selectedAudience} />

        {/* FAQ Section - AI-powered search with Hindi toggle */}
        <FAQSection selectedAudience={selectedAudience} />
      </main>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById("get-started");
            if (element) {
              const headerHeight = 64;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerHeight;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }}
          className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg flex items-center justify-center text-white animate-pulse-cta cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to get started"
        >
          <span className="text-sm font-heading-bold">
            {selectedAudience === "worker"
              ? "Earn"
              : selectedAudience === "business"
              ? "Hire"
              : "Invest"}
          </span>
        </button>
      </div>

      {/* Performance Optimization - Preload critical resources */}
      <link
        rel="preload"
        href="/assets/fonts/heading-font.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/assets/fonts/body-font.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Analytics and Tracking */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Conversion tracking
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
            
            // Audience tracking
            gtag('event', 'audience_selected', {
              'audience_type': '${selectedAudience}',
              'page_title': '${seoContent.title}'
            });
          `,
        }}
      />
    </>
  );
};

export default LandingPage;
