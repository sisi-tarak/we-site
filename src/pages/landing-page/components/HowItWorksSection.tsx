import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { TimelineStep } from "../types";

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const timelineSteps: TimelineStep[] = [
    {
      id: "verification",
      step: 1,
      title: "Community Verification",
      description:
        "All users undergo strict verification using College ID, Aadhaar, and background checks to ensure a trusted ecosystem.",
      icon: "Shield",
      color: "text-success",
    },
    {
      id: "matching",
      step: 2,
      title: "Smart Matching",
      description:
        "Our AI-powered system matches tasks with the most suitable verified workers based on skills, location, and availability.",
      icon: "Zap",
      color: "text-primary",
    },
    {
      id: "escrow",
      step: 3,
      title: "Escrow Protection",
      description:
        "Payments are held in secure escrow until task completion, protecting both workers and businesses throughout the process.",
      icon: "Lock",
      color: "text-secondary",
    },
    {
      id: "completion",
      step: 4,
      title: "Task Completion",
      description:
        "Workers complete tasks with milestone tracking and real-time communication, ensuring quality and transparency.",
      icon: "CheckCircle",
      color: "text-warning",
    },
    {
      id: "payment",
      step: 5,
      title: "Instant Payment",
      description:
        "Upon approval, payments are instantly transferred via UPI, with ratings and reviews building long-term reputation.",
      icon: "Wallet",
      color: "text-success",
    },
  ];

  // Transform scroll progress to step activation
  const stepProgress = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    [0, timelineSteps.length - 1]
  );

  useEffect(() => {
    const unsubscribe = stepProgress.onChange((value) => {
      setActiveStep(Math.floor(value));
    });
    return unsubscribe;
  }, [stepProgress]);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Network Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 1000 1000"
        >
          <defs>
            <linearGradient
              id="networkGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
          {timelineSteps.map((_, index) => (
            <motion.path
              key={index}
              d={`M${200 + index * 150},100 Q${300 + index * 150},200 ${
                400 + index * 150
              },300 T${600 + index * 150},500`}
              stroke="url(#networkGradient2)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: activeStep >= index ? 1 : 0,
                opacity: activeStep >= index ? 0.3 : 0.1,
              }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          ))}
        </svg>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 5}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-body-medium mb-6"
          >
            <Icon name="Cog" size={16} />
            <span>How It Works</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading-bold text-foreground mb-6"
          >
            Simple, Secure, and
            <span className="text-primary"> Transparent</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Our platform ensures trust and quality at every step, from
            verification to payment, creating a secure ecosystem for all
            participants.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border transform -translate-x-1/2" />
            <motion.div
              className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-primary via-accent to-secondary transform -translate-x-1/2"
              initial={{ height: "0%" }}
              animate={{
                height: `${((activeStep + 1) / timelineSteps.length) * 100}%`,
              }}
              transition={{ duration: 0.8 }}
            />

            {/* Timeline Steps */}
            <div className="space-y-24">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"
                    }`}
                  >
                    <div
                      className={`inline-block bg-card border border-border rounded-2xl p-8 shadow-card-hover max-w-md ${
                        activeStep >= index ? "ring-2 ring-primary/20" : ""
                      }`}
                    >
                      <div
                        className={`flex items-center space-x-3 mb-4 ${
                          index % 2 === 0
                            ? "flex-row-reverse space-x-reverse"
                            : ""
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            activeStep >= index
                              ? "bg-gradient-to-br from-primary to-accent text-white"
                              : "bg-muted text-text-secondary"
                          }`}
                        >
                          <Icon name={step.icon} size={24} />
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary font-body-medium">
                            Step {step.step}
                          </div>
                          <h3 className="text-xl font-heading-bold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Central Node */}
                  <div className="relative z-10">
                    <motion.div
                      className={`w-6 h-6 rounded-full border-4 ${
                        activeStep >= index
                          ? "bg-primary border-primary shadow-lg"
                          : "bg-background border-border"
                      }`}
                      animate={{
                        scale: activeStep >= index ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: activeStep >= index ? Infinity : 0,
                        repeatDelay: 2,
                      }}
                    />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start space-x-4 p-6 rounded-2xl transition-all ${
                  activeStep >= index
                    ? "bg-primary/5 border-2 border-primary/20"
                    : "bg-card border border-border"
                }`}
              >
                {/* Step Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    activeStep >= index
                      ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg"
                      : "bg-muted text-text-secondary"
                  }`}
                >
                  <Icon name={step.icon} size={24} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-text-secondary font-body-medium">
                      Step {step.step}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activeStep >= index ? "bg-primary" : "bg-border"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-heading-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-card border border-border rounded-2xl hover:shadow-card-hover transition-card"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-success/10 to-success/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-success" />
            </div>
            <h4 className="font-heading-bold text-foreground mb-2">
              100% Verified
            </h4>
            <p className="text-text-secondary text-sm">
              Every user is verified through College ID and Aadhaar for maximum
              trust
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center p-6 bg-card border border-border rounded-2xl hover:shadow-card-hover transition-card"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={32} className="text-primary" />
            </div>
            <h4 className="font-heading-bold text-foreground mb-2">
              Instant Payments
            </h4>
            <p className="text-text-secondary text-sm">
              Get paid immediately via UPI upon task completion and approval
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center p-6 bg-card border border-border rounded-2xl hover:shadow-card-hover transition-card"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Lock" size={32} className="text-secondary" />
            </div>
            <h4 className="font-heading-bold text-foreground mb-2">
              Escrow Protected
            </h4>
            <p className="text-text-secondary text-sm">
              All payments are secured in escrow until successful task
              completion
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
