import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import { AudienceType, HeroCardData } from "../types";

interface HeroSectionProps {
  selectedAudience: AudienceType["id"];
  onAudienceChange: (audience: AudienceType["id"]) => void;
}

const HeroSection = ({
  selectedAudience,
  onAudienceChange,
}: HeroSectionProps) => {
  const [currentHeadline, setCurrentHeadline] = useState(0);

  const audienceTypes: AudienceType[] = [
    {
      id: "worker",
      label: "Student/Worker",
      shortLabel: "W",
      icon: "Users",
      description: "Earn flexible income",
      color: "text-success",
      heroTitle: "Start Earning Today with Zero Commission",
      heroSubtitle:
        "Join 10,000+ students earning ₹10,000+/month with verified tasks and instant UPI payments",
      ctaText: "Start Earning Now",
      benefits: [
        "Zero commission first month",
        "Instant UPI payments",
        "College ID verification",
      ],
    },
    {
      id: "business",
      label: "Business",
      shortLabel: "B",
      icon: "Building2",
      description: "Find verified talent",
      color: "text-secondary",
      heroTitle: "Find Verified Local Talent Instantly",
      heroSubtitle:
        "Connect with 100% verified students and professionals for reliable task completion",
      ctaText: "Post Your First Task",
      benefits: [
        "100% verified workers",
        "Escrow protection",
        "Local talent pool",
      ],
    },
    {
      id: "investor",
      label: "Investor",
      shortLabel: "I",
      icon: "TrendingUp",
      description: "High-growth investment",
      color: "text-warning",
      heroTitle: "Invest in India's Fastest Growing Gig Platform",
      heroSubtitle:
        "Early investment opportunity with 15-25x return potential in India's ₹400Cr gig economy",
      ctaText: "View Investment Details",
      benefits: [
        "15-25x return potential",
        "Growing market",
        "Proven traction",
      ],
    },
  ];

  const heroCards: HeroCardData[] = [
    {
      audience: "worker",
      title: "₹10,000+/month",
      subtitle: "Flexible Income",
      highlight: "Zero Commission First Month",
      icon: "Wallet",
      gradient: "from-success to-success/70",
      features: [
        "Instant UPI payments",
        "College ID verified",
        "Flexible timing",
      ],
    },
    {
      audience: "business",
      title: "Verified Talent",
      subtitle: "Zero Hassle",
      highlight: "100% Verified Workers",
      icon: "Shield",
      gradient: "from-secondary to-secondary/70",
      features: [
        "Escrow protection",
        "Local professionals",
        "Quality guarantee",
      ],
    },
    {
      audience: "investor",
      title: "15-25x Returns",
      subtitle: "Growth Potential",
      highlight: "Early Investment Opportunity",
      icon: "TrendingUp",
      gradient: "from-warning to-warning/70",
      features: ["₹400Cr market size", "Proven traction", "Scalable model"],
    },
  ];

  const currentAudience =
    audienceTypes.find((a) => a.id === selectedAudience) || audienceTypes[0];

  const headlines = [
    currentAudience.heroTitle,
    `Join India's Most Trusted Gig Platform`,
    `${currentAudience.benefits[0]} - Limited Time`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-bounce opacity-40" />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-secondary rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-success rounded-full animate-bounce opacity-30" />

        {/* Network Flow Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 1000 1000"
        >
          <defs>
            <linearGradient
              id="networkGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
          <path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="url(#networkGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />

          <path
            d="M100,400 Q400,300 700,400 T900,400"
            stroke="url(#networkGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
          {/* Left Content */}
          <div className="flex-1 lg:pr-12 text-center lg:text-left">
            {/* Dynamic Headlines */}
            <div className="mb-6 h-20 flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentHeadline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading-extra-bold text-foreground leading-tight"
                >
                  {headlines[currentHeadline]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {currentAudience.heroSubtitle}
            </motion.p>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
            >
              {currentAudience.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm"
                >
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm font-body-medium text-foreground">
                    {benefit}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="animate-pulse-cta shadow-cta text-lg px-8 py-4"
              >
                {currentAudience.ctaText}
              </Button>

              {selectedAudience === "worker" && (
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-text-secondary">
                  <Image
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1272f1b41-1762624831669.png"
                    alt="UPI payment logo for instant money transfers"
                    className="w-8 h-6"
                  />

                  <span>Instant UPI Payments</span>
                </div>
              )}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-text-secondary"
            >
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-success" />
                <span>10,000+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  name="Star"
                  size={16}
                  className="text-warning fill-current"
                />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-secondary" />
                <span>100% Verified</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Audience Selector Cards */}
          <div className="flex-1 mt-12 lg:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6 max-w-md mx-auto">
              {heroCards.map((card, index) => (
                <motion.div
                  key={card.audience}
                  initial={{ opacity: 0, x: 50, rotateY: -15 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    scale: selectedAudience === card.audience ? 1.05 : 1,
                  }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.08,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  }}
                  className={`relative cursor-pointer transition-card ${
                    selectedAudience === card.audience
                      ? "ring-2 ring-primary shadow-card-hover"
                      : "hover:shadow-card-hover"
                  }`}
                  onClick={() => onAudienceChange(card.audience)}
                >
                  <div
                    className={`bg-gradient-to-br ${card.gradient} p-6 rounded-2xl text-white relative overflow-hidden`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/20 rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <Icon
                          name={card.icon}
                          size={32}
                          className="text-white"
                        />
                        {selectedAudience === card.audience && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                          >
                            <Icon
                              name="Check"
                              size={16}
                              className="text-success"
                            />
                          </motion.div>
                        )}
                      </div>

                      <h3 className="text-2xl font-heading-bold mb-2">
                        {card.title}
                      </h3>
                      <p className="text-white/90 mb-4">{card.subtitle}</p>

                      <div className="bg-white/20 rounded-lg p-3 mb-4">
                        <p className="text-sm font-body-medium">
                          {card.highlight}
                        </p>
                      </div>

                      <ul className="space-y-2">
                        {card.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <Icon
                              name="Check"
                              size={14}
                              className="text-white"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity rounded-2xl" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Audience Selector */}
            <div className="md:hidden mt-8">
              <div className="flex justify-center space-x-2">
                {audienceTypes.map((audience) => (
                  <button
                    key={audience.id}
                    onClick={() => onAudienceChange(audience.id)}
                    className={`w-3 h-3 rounded-full transition-smooth ${
                      selectedAudience === audience.id
                        ? "bg-primary"
                        : "bg-border hover:bg-accent"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-text-secondary">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-border rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-primary rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
