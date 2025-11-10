import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { AudienceType } from "../types";

interface CTASectionProps {
  selectedAudience: AudienceType["id"];
}

const CTASection = ({ selectedAudience }: CTASectionProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
      setPhone("");
    }, 3000);
  };

  const ctaContent = {
    worker: {
      title: "Join 10,000+ Students Earning Today",
      subtitle:
        "Start your flexible income journey with zero commission forever. Earn rewards, badges, and bonuses as you complete tasks.",
      primaryCTA: "Start Earning Now",
      secondaryCTA: "Watch Demo",
      urgency: "Zero commission forever - workers never pay",
      benefits: [
        "Zero commission forever",
        "Worker rewards program",
        "Instant UPI payments",
        "Earn credits & bonuses",
      ],
      formPlaceholder: {
        email: "Enter your college email",
        phone: "Enter your mobile number",
      },
    },
    business: {
      title: "Choose Your Subscription Plan",
      subtitle:
        "Post tasks with zero commission up to your limit. AI-powered invoicing, dynamic delivery fees, and automatic refunds.",
      primaryCTA: "View Pricing Plans",
      secondaryCTA: "Schedule Demo",
      urgency: "Flexible plans starting at ₹299/month",
      benefits: [
        "Flexible subscription plans",
        "AI invoice generation",
        "Dynamic delivery fees",
        "Automatic refunds",
      ],
      formPlaceholder: {
        email: "Enter your business email",
        phone: "Enter your contact number",
      },
    },
    investor: {
      title: "Join Our Partnership Waitlist",
      subtitle:
        "Interested in partnering with WE Universal? Get early access to future investment and business collaboration opportunities.",
      primaryCTA: "Join Waitlist",
      secondaryCTA: "Learn More",
      urgency: "Early access to partnership opportunities",
      benefits: [
        "Early access to opportunities",
        "Market insights and metrics",
        "Partnership options",
        "Platform updates",
      ],
      formPlaceholder: {
        email: "Enter your investment email",
        phone: "Enter your contact number",
      },
    },
  };

  const content = ctaContent[selectedAudience];

  return (
    <section
      id="get-started"
      className="py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Network Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 1000 1000"
        >
          <defs>
            <linearGradient
              id="ctaNetworkGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="3" fill="url(#ctaNetworkGradient)">
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="400" cy="150" r="2" fill="url(#ctaNetworkGradient)">
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="600" cy="300" r="4" fill="url(#ctaNetworkGradient)">
            <animate
              attributeName="opacity"
              values="0.2;0.8;0.2"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="800" cy="250" r="3" fill="url(#ctaNetworkGradient)">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Connecting Lines */}
          <line
            x1="200"
            y1="200"
            x2="400"
            y2="150"
            stroke="url(#ctaNetworkGradient)"
            strokeWidth="1"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.5;0.1"
              dur="4s"
              repeatCount="indefinite"
            />
          </line>
          <line
            x1="400"
            y1="150"
            x2="600"
            y2="300"
            stroke="url(#ctaNetworkGradient)"
            strokeWidth="1"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.6;0.2"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </line>
          <line
            x1="600"
            y1="300"
            x2="800"
            y2="250"
            stroke="url(#ctaNetworkGradient)"
            strokeWidth="1"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.4;0.1"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              {/* Urgency Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-sm font-body-medium mb-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
                <span>{content.urgency}</span>
              </motion.div>

              {/* Main Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-heading-extra-bold mb-6 leading-tight"
              >
                {content.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
              >
                {content.subtitle}
              </motion.p>

              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              >
                {content.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                    <span className="text-white/90">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Desktop CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="hidden lg:flex space-x-4"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-white text-primary hover:bg-white/90 shadow-lg animate-pulse-cta"
                  onClick={(e) => {
                    e.preventDefault();
                    // Scroll to top of this section (get-started)
                    const element = document.getElementById("get-started");
                    if (element) {
                      const headerHeight = 64;
                      const elementPosition =
                        element.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.pageYOffset - headerHeight;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  {content.primaryCTA}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="text-white border-white/30 hover:bg-white/10"
                  onClick={(e) => {
                    e.preventDefault();
                    // Demo button - you can add video modal or link here
                    console.log("Play demo video");
                  }}
                >
                  {content.secondaryCTA}
                </Button>
              </motion.div>
            </div>

            {/* Right Content - Signup Form */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-heading-bold text-white mb-2">
                        Get Started Today
                      </h3>
                      <p className="text-white/80">
                        Join thousands of satisfied users
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <Input
                        type="email"
                        placeholder={content.formPlaceholder.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/10 text-white placeholder-white/80 focus:border-accent focus:ring-accent focus:outline-none border-white/40 focus:border-none focus:ring-0 "
                      />

                      <Input
                        type="tel"
                        placeholder={content.formPlaceholder.phone}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="bg-white/10 text-white placeholder-white/80 focus:border-accent focus:ring-accent border-white/40 focus:border-none focus:outline-none focus:ring-0"
                      />

                      <Button
                        type="submit"
                        variant="secondary"
                        size="lg"
                        fullWidth
                        loading={isSubmitting}
                        iconName={isSubmitting ? undefined : "ArrowRight"}
                        iconPosition="right"
                        className="bg-white text-primary hover:bg-white/90 shadow-lg"
                      >
                        {isSubmitting ? "Processing..." : content.primaryCTA}
                      </Button>

                      <div className="text-center">
                        <p className="text-xs text-white/60">
                          By signing up, you agree to our Terms of Service and
                          Privacy Policy
                        </p>
                      </div>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Check" size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-heading-bold text-white mb-2">
                      Welcome Aboard!
                    </h3>
                    <p className="text-white/80 mb-6">
                      {selectedAudience === "worker" &&
                        "Check your email for verification instructions. Start earning today!"}
                      {selectedAudience === "business" &&
                        "We'll contact you within 24 hours to set up your account."}
                      {selectedAudience === "investor" &&
                        "Our team will reach out to schedule your investment meeting."}
                    </p>
                    <div className="bg-white/20 rounded-2xl p-4">
                      <p className="text-sm text-white/90">
                        {selectedAudience === "worker" &&
                          "Next: Complete your profile and start browsing available tasks."}
                        {selectedAudience === "business" &&
                          "Next: Prepare your first task posting and budget requirements."}
                        {selectedAudience === "investor" &&
                          "Next: Review our pitch deck and prepare your investment criteria."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Mobile CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="lg:hidden flex flex-col sm:flex-row gap-4 mt-8 justify-center"
          >
            <Button
              variant="secondary"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="bg-white text-primary hover:bg-white/90 shadow-lg animate-pulse-cta"
              onClick={(e) => {
                e.preventDefault();
                // Scroll to top of form in this section
                const formElement = document.querySelector("#get-started form");
                if (formElement) {
                  const headerHeight = 64;
                  const elementPosition =
                    formElement.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition + window.pageYOffset - headerHeight;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {content.primaryCTA}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              iconName="Play"
              iconPosition="left"
              className="text-white border-white/30 hover:bg-white/10"
              onClick={(e) => {
                e.preventDefault();
                // Demo button - you can add video modal or link here
                console.log("Play demo video");
              }}
            >
              {content.secondaryCTA}
            </Button>
          </motion.div>

          {/* Trust Indicators - Projected Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-4">
              <div>
                <div className="text-3xl font-heading-bold text-white mb-2">
                  10K+
                </div>
                <div className="text-white/80 text-sm">Target: Tasks</div>
              </div>
              <div>
                <div className="text-3xl font-heading-bold text-white mb-2">
                  ₹50L+
                </div>
                <div className="text-white/80 text-sm">Target: Paid Out</div>
              </div>
              <div>
                <div className="text-3xl font-heading-bold text-white mb-2">
                  4.8/5
                </div>
                <div className="text-white/80 text-sm">Target Rating</div>
              </div>
              <div>
                <div className="text-3xl font-heading-bold text-white mb-2">
                  100%
                </div>
                <div className="text-white/80 text-sm">Target: Verified</div>
              </div>
            </div>
            <p className="text-xs text-white/60 italic text-center">
              * Projected goals for Year 1
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
