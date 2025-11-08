import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { JourneyStep, AudienceType } from "../types";

interface JourneySectionProps {
  selectedAudience: AudienceType["id"];
}

const JourneySection = ({ selectedAudience }: JourneySectionProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const journeySteps: Record<AudienceType["id"], JourneyStep[]> = {
    worker: [
      {
        id: "signup",
        title: "Sign Up & Verify",
        description: "Create account with College ID/Aadhaar verification",
        icon: "UserPlus",
        audience: "worker",
        details: [
          "Upload College ID or Aadhaar card",
          "Phone number verification via OTP",
          "Profile completion with skills",
          "Background verification (24-48 hours)",
        ],
      },
      {
        id: "browse",
        title: "Browse & Apply",
        description: "Find tasks matching your skills and schedule",
        icon: "Search",
        audience: "worker",
        details: [
          "Filter tasks by location, skills, pay",
          "View detailed task requirements",
          "Apply with custom proposals",
          "Get instant notifications",
        ],
      },
      {
        id: "work",
        title: "Complete Tasks",
        description: "Work on approved tasks with escrow protection",
        icon: "CheckCircle",
        audience: "worker",
        details: [
          "Start work after approval",
          "Track progress with milestones",
          "Communicate via in-app chat",
          "Submit work for review",
        ],
      },
      {
        id: "earn",
        title: "Get Paid Instantly",
        description: "Receive payments directly to your UPI account",
        icon: "Wallet",
        audience: "worker",
        details: [
          "Automatic payment on approval",
          "Direct UPI transfer (instant)",
          "Build rating and reputation",
          "Unlock higher-paying tasks",
        ],
      },
    ],
    business: [
      {
        id: "register",
        title: "Business Registration",
        description: "Register your business with GST verification",
        icon: "Building2",
        audience: "business",
        details: [
          "Company details and GST number",
          "Business verification process",
          "Set up payment methods",
          "Complete business profile",
        ],
      },
      {
        id: "post",
        title: "Post Tasks",
        description: "Create detailed task requirements and budget",
        icon: "Plus",
        audience: "business",
        details: [
          "Define task scope and requirements",
          "Set budget and timeline",
          "Choose skill requirements",
          "Add location preferences",
        ],
      },
      {
        id: "hire",
        title: "Review & Hire",
        description: "Review applications and hire verified talent",
        icon: "Users",
        audience: "business",
        details: [
          "Review worker profiles and ratings",
          "Interview via video call",
          "Select best-fit candidates",
          "Initiate escrow payment",
        ],
      },
      {
        id: "manage",
        title: "Manage & Pay",
        description: "Track progress and release payments",
        icon: "Settings",
        audience: "business",
        details: [
          "Monitor task progress",
          "Communicate with workers",
          "Review submitted work",
          "Release escrow payments",
        ],
      },
    ],
    investor: [
      {
        id: "interest",
        title: "Express Interest",
        description: "Submit investment interest and capacity",
        icon: "TrendingUp",
        audience: "investor",
        details: [
          "Investment capacity assessment",
          "Risk profile evaluation",
          "Investment timeline preferences",
          "Due diligence requirements",
        ],
      },
      {
        id: "review",
        title: "Review Pitch Deck",
        description: "Access detailed business metrics and projections",
        icon: "FileText",
        audience: "investor",
        details: [
          "Financial projections and metrics",
          "Market analysis and opportunity",
          "Team background and experience",
          "Competitive landscape overview",
        ],
      },
      {
        id: "diligence",
        title: "Due Diligence",
        description: "Conduct thorough investment evaluation",
        icon: "Search",
        audience: "investor",
        details: [
          "Financial audit and verification",
          "Legal documentation review",
          "Market validation studies",
          "Reference checks and interviews",
        ],
      },
      {
        id: "invest",
        title: "Investment & Returns",
        description: "Complete investment and track returns",
        icon: "DollarSign",
        audience: "investor",
        details: [
          "Investment agreement signing",
          "Fund transfer and documentation",
          "Regular progress updates",
          "Return tracking and reporting",
        ],
      },
    ],
  };

  const currentJourney = journeySteps[selectedAudience];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-body-medium mb-6"
          >
            <Icon name="Route" size={16} />
            <span>Your Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading-bold text-foreground mb-6"
          >
            {selectedAudience === "worker" && "Your Path to Earning"}
            {selectedAudience === "business" && "Your Hiring Journey"}
            {selectedAudience === "investor" && "Your Investment Process"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            {selectedAudience === "worker" &&
              "From verification to earning - see how easy it is to start making money with verified tasks."}
            {selectedAudience === "business" &&
              "From posting tasks to completion - discover how to find and hire verified talent efficiently."}
            {selectedAudience === "investor" &&
              "From interest to returns - understand our transparent investment process and growth potential."}
          </motion.p>
        </div>

        {/* Interactive Timeline */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-border transform -translate-y-1/2" />
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((activeStep + 1) / currentJourney.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Timeline Steps */}
              <div className="relative flex justify-between">
                {currentJourney.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Step Circle */}
                    <div
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                        index <= activeStep
                          ? "bg-primary border-primary text-white shadow-lg scale-110"
                          : "bg-card border-border text-text-secondary group-hover:border-accent group-hover:scale-105"
                      }`}
                    >
                      <Icon name={step.icon} size={24} />
                    </div>

                    {/* Step Label */}
                    <div className="mt-4 text-center max-w-32">
                      <h4
                        className={`font-heading-bold text-sm mb-1 ${
                          index <= activeStep
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-tight">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6">
            {currentJourney.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start space-x-4 p-4 rounded-2xl transition-all cursor-pointer ${
                  index === activeStep
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-card border border-border hover:bg-muted"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index <= activeStep
                      ? "bg-primary text-white"
                      : "bg-muted text-text-secondary"
                  }`}
                >
                  <Icon name={step.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading-bold text-foreground mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step Details */}
          <div className="mt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card-hover"
              >
                <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Step Icon & Title */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg mb-4">
                      <Icon
                        name={currentJourney[activeStep].icon}
                        size={32}
                        className="text-white"
                      />
                    </div>
                    <h3 className="text-2xl font-heading-bold text-foreground mb-2">
                      {currentJourney[activeStep].title}
                    </h3>
                    <p className="text-text-secondary">
                      {currentJourney[activeStep].description}
                    </p>
                  </div>

                  {/* Step Details */}
                  <div className="flex-1">
                    <h4 className="font-heading-bold text-foreground mb-4">
                      What happens in this step:
                    </h4>
                    <ul className="space-y-3">
                      {currentJourney[activeStep].details.map(
                        (detail, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon
                                name="Check"
                                size={14}
                                className="text-success"
                              />
                            </div>
                            <span className="text-text-secondary">
                              {detail}
                            </span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronLeft"
                    iconPosition="left"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  >
                    Previous
                  </Button>

                  <div className="flex space-x-2">
                    {currentJourney.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveStep(index)}
                        className={`w-2 h-2 rounded-full transition-smooth ${
                          index === activeStep
                            ? "bg-primary"
                            : "bg-border hover:bg-accent"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="default"
                    size="sm"
                    iconName="ChevronRight"
                    iconPosition="right"
                    disabled={activeStep === currentJourney.length - 1}
                    onClick={() =>
                      setActiveStep(
                        Math.min(currentJourney.length - 1, activeStep + 1)
                      )
                    }
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              variant="default"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="animate-pulse-cta shadow-cta"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("get-started");
                if (element) {
                  const headerHeight = 64;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {selectedAudience === "worker" && "Start Your Journey"}
              {selectedAudience === "business" && "Post Your First Task"}
              {selectedAudience === "investor" && "Begin Investment Process"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
