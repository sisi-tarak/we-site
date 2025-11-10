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
          "View AI-generated upfront price estimates",
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
          "Start work after business approval",
          "Track progress with milestones",
          "Upload receipt after completion",
          "System compares actual vs estimated bill",
        ],
      },
      {
        id: "earn",
        title: "Get Paid & Earn Rewards",
        description: "Receive instant UPI payments and unlock rewards",
        icon: "Wallet",
        audience: "worker",
        details: [
          "Instant UPI payment on approval",
          "Earn credits for each completed task",
          "Unlock rewards: 25 tasks = t-shirt, 50 = hoodie, 100 = badge + bonus",
          "Build reputation and get more offers",
        ],
      },
    ],
    business: [
      {
        id: "register",
        title: "Sign Up & Choose Plan",
        description: "Register and select a subscription plan",
        icon: "Building2",
        audience: "business",
        details: [
          "Create business account",
          "Choose subscription plan (₹299, ₹599, or ₹799/month)",
          "Verify business details",
          "Set up payment methods",
        ],
      },
      {
        id: "post",
        title: "Post Task & AI Invoice",
        description: "Create task and get AI-generated upfront price estimate",
        icon: "Plus",
        audience: "business",
        details: [
          "Define task scope and requirements",
          "AI generates estimated invoice with buffer",
          "Dynamic delivery fee calculated",
          "Review and approve invoice",
        ],
      },
      {
        id: "hire",
        title: "Approve & Escrow Lock",
        description: "Approve invoice and lock payment in escrow",
        icon: "Lock",
        audience: "business",
        details: [
          "Review AI-generated invoice",
          "Approve estimated price",
          "Payment locked in secure escrow",
          "Worker accepts and begins task",
        ],
      },
      {
        id: "manage",
        title: "Complete & Automatic Refund",
        description: "Task completed with automatic refunds if bill is less",
        icon: "Settings",
        audience: "business",
        details: [
          "Worker completes task and uploads receipt",
          "System compares actual vs estimated bill",
          "Automatic refund if bill is less (buffer + delivery fee)",
          "Approve and release payment to worker",
        ],
      },
    ],
    investor: [
      {
        id: "interest",
        title: "Join Waitlist",
        description: "Join our partnership waitlist for future opportunities",
        icon: "TrendingUp",
        audience: "investor",
        details: [
          "Sign up for partnership waitlist",
          "Receive platform updates and metrics",
          "Get market insights and research",
          "Early access to opportunities",
        ],
      },
      {
        id: "review",
        title: "Review Platform Metrics",
        description: "Access detailed platform metrics and growth data",
        icon: "FileText",
        audience: "investor",
        details: [
          "View platform growth metrics",
          "Market analysis and opportunity",
          "User acquisition and retention data",
          "Revenue and transaction metrics",
        ],
      },
      {
        id: "diligence",
        title: "Explore Partnerships",
        description: "Explore custom business partnership options",
        icon: "Search",
        audience: "investor",
        details: [
          "Review partnership opportunities",
          "API integrations and white-label options",
          "Bulk task management solutions",
          "Co-marketing and revenue sharing",
        ],
      },
      {
        id: "invest",
        title: "Partner With Us",
        description: "Establish partnership and track collaboration",
        icon: "DollarSign",
        audience: "investor",
        details: [
          "Custom partnership agreement",
          "Integration and setup",
          "Regular updates and support",
          "Track partnership metrics",
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
