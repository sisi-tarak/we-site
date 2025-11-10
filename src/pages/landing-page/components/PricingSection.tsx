import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { PricingTier, AudienceType } from "../types";

interface PricingSectionProps {
  selectedAudience: AudienceType["id"];
}

const PricingSection = ({ selectedAudience }: PricingSectionProps) => {
  const pricingTiers: Record<AudienceType["id"], PricingTier[]> = {
    worker: [
      {
        id: "worker-free",
        audience: "worker",
        name: "Free Forever",
        price: "₹0",
        period: "/month",
        description:
          "Workers never pay commission - earn 100% of task payments",
        features: [
          "Zero commission forever",
          "Instant UPI payments",
          "College ID verification",
          "Access to all tasks",
          "Earn credits & rewards",
          "Referral bonuses (₹100 per referral)",
          "Worker rewards program",
          "Mobile app access",
        ],
        highlighted: true,
        ctaText: "Start Earning Free",
        badge: "Most Popular",
      },
    ],
    business: [
      {
        id: "business-starter",
        audience: "business",
        name: "Starter",
        price: "₹299",
        period: "/month",
        description: "Perfect for occasional task posting",
        features: [
          "₹2,500 task limit per month",
          "Unused limit carries over (up to 3 months)",
          "Zero commission within limit",
          "6% commission after limit exceeded",
          "AI invoice generation",
          "Dynamic delivery fee calculation",
          "Escrow protection",
          "Basic support",
        ],
        highlighted: false,
        ctaText: "Start Starter Plan",
      },
      {
        id: "business-growth",
        audience: "business",
        name: "Growth",
        price: "₹599",
        period: "/month",
        description: "Ideal for regular task posting",
        features: [
          "₹5,000 task limit per month",
          "Unused limit carries over (up to 3 months)",
          "Zero commission within limit",
          "6% commission after limit exceeded",
          "Verified badge eligibility",
          "AI invoice generation",
          "Dynamic delivery fee calculation",
          "Escrow protection",
          "Priority support",
          "Advanced analytics",
        ],
        highlighted: true,
        ctaText: "Choose Growth Plan",
        badge: "Recommended",
      },
      {
        id: "business-pro",
        audience: "business",
        name: "Professional",
        price: "₹799",
        period: "/month",
        description: "Best for high-volume task posting",
        features: [
          "₹9,000 task limit per month",
          "Unused limit carries over (up to 3 months)",
          "Zero commission within limit",
          "6% commission after limit exceeded",
          "Verified badge eligibility",
          "AI invoice generation",
          "Dynamic delivery fee calculation",
          "Escrow protection",
          "Priority support",
          "Advanced analytics",
          "API access",
          "Dedicated account manager",
        ],
        highlighted: false,
        ctaText: "Go Professional",
      },
    ],
    investor: [
      {
        id: "investor-waitlist",
        audience: "investor",
        name: "Partnership Waitlist",
        price: "Free",
        period: "to join",
        description:
          "Join our waitlist for future investment and partnership opportunities",
        features: [
          "Early access to investment rounds",
          "Regular platform updates",
          "Market insights and metrics",
          "Partnership opportunities",
          "Business collaboration options",
          "Priority notifications",
        ],
        highlighted: true,
        ctaText: "Join Waitlist",
        badge: "Coming Soon",
      },
      {
        id: "investor-business",
        audience: "investor",
        name: "Business Partnership",
        price: "Custom",
        period: "pricing",
        description: "Explore custom business partnerships and collaborations",
        features: [
          "Custom partnership terms",
          "API integrations",
          "White-label solutions",
          "Bulk task management",
          "Dedicated support",
          "Co-marketing opportunities",
          "Revenue sharing options",
        ],
        highlighted: false,
        ctaText: "Contact Us",
      },
    ],
  };

  const currentTiers = pricingTiers[selectedAudience];

  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl" />

        {/* Price symbols floating */}
        <div className="absolute top-32 right-32 text-4xl text-primary/10 font-heading-bold animate-bounce hidden sm:block">
          ₹
        </div>
        <div
          className="absolute bottom-40 left-16 text-3xl text-accent/10 font-heading-bold animate-bounce hidden sm:block"
          style={{ animationDelay: "1s" }}
        >
          %
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-warning/10 text-warning px-4 py-2 rounded-full text-sm font-body-medium mb-6"
          >
            <Icon name="DollarSign" size={16} />
            <span>Transparent Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading-bold text-foreground mb-6"
          >
            {selectedAudience === "worker" && "Workers Never Pay Commission"}
            {selectedAudience === "business" && "Flexible Subscription Plans"}
            {selectedAudience === "investor" && "Partnership Opportunities"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            {selectedAudience === "worker" &&
              "Earn 100% of task payments with zero commission forever. Access worker rewards program and referral bonuses."}
            {selectedAudience === "business" &&
              "Choose a subscription plan that fits your needs. Unused limits carry over, and you only pay commission after exceeding your monthly limit."}
            {selectedAudience === "investor" &&
              "Interested in partnering with us? Join our waitlist to learn about future investment and business partnership opportunities."}
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div
          className={`grid gap-8 max-w-6xl mx-auto ${
            currentTiers.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : currentTiers.length === 3
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {currentTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              className={`relative bg-card border-2 rounded-3xl p-8 transition-card ${
                tier.highlighted
                  ? "border-primary shadow-card-hover ring-4 ring-primary/10"
                  : "border-border hover:border-accent"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full text-sm font-body-medium shadow-lg">
                    {tier.badge}
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-heading-bold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-text-secondary mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span
                      className={`text-4xl md:text-5xl font-heading-extra-bold ${
                        tier.highlighted ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span className="text-text-secondary font-body-medium">
                      {tier.period}
                    </span>
                  </div>

                  {/* Limit info for business plans */}
                  {selectedAudience === "business" &&
                    tier.price !== "Custom" && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-text-secondary mb-1">
                          Monthly Task Limit
                        </div>
                        <div className="text-lg font-heading-bold text-primary">
                          {tier.id === "business-starter" && "₹2,500"}
                          {tier.id === "business-growth" && "₹5,000"}
                          {tier.id === "business-pro" && "₹9,000"}
                        </div>
                        <div className="text-xs text-success mt-1">
                          ✓ Unused limit carries over up to 3 months
                        </div>
                      </div>
                    )}

                  {/* Commission info for business */}
                  {selectedAudience === "business" && (
                    <div className="mt-2 text-sm text-text-secondary">
                      {tier.price === "Custom"
                        ? "Custom pricing"
                        : "6% commission after limit"}
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? "bg-primary/10" : "bg-success/10"
                        }`}
                      >
                        <Icon
                          name="Check"
                          size={12}
                          className={
                            tier.highlighted ? "text-primary" : "text-success"
                          }
                        />
                      </div>
                      <span className="text-text-secondary text-sm leading-relaxed">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                variant={tier.highlighted ? "default" : "outline"}
                size="lg"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                className={
                  tier.highlighted ? "animate-pulse-cta shadow-cta" : ""
                }
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
              >
                {tier.ctaText}
              </Button>

              {/* Additional info for investors */}
              {selectedAudience === "investor" &&
                tier.id === "investor-waitlist" && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="text-sm text-text-secondary">
                      <div className="font-body-medium text-foreground mb-2">
                        What you'll get:
                      </div>
                      <ul className="space-y-1 ml-4">
                        <li>• Updates on platform growth and metrics</li>
                        <li>
                          • Early notification of investment opportunities
                        </li>
                        <li>• Access to market research and insights</li>
                        <li>• Priority consideration for partnerships</li>
                      </ul>
                    </div>
                  </div>
                )}
            </motion.div>
          ))}
        </div>

        {/* Comparison Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-card border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h4 className="font-heading-bold text-foreground mb-4">
              {selectedAudience === "worker" && "Why Workers Love WE Community"}
              {selectedAudience === "business" &&
                "Key Benefits of Our Pricing Model"}
              {selectedAudience === "investor" && "Partnership Benefits"}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Percent" size={24} className="text-success" />
                </div>
                <div className="font-body-medium text-foreground mb-1">
                  {selectedAudience === "worker" && "Zero Commission Forever"}
                  {selectedAudience === "business" && "Flexible Limits"}
                  {selectedAudience === "investor" && "Transparent Model"}
                </div>
                <div className="text-text-secondary">
                  {selectedAudience === "worker" &&
                    "Keep 100% of your earnings - no commission, ever"}
                  {selectedAudience === "business" &&
                    "Unused limits carry over up to 3 months"}
                  {selectedAudience === "investor" &&
                    "Clear pricing structure and growth metrics"}
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <div className="font-body-medium text-foreground mb-1">
                  {selectedAudience === "worker" && "Instant UPI Payments"}
                  {selectedAudience === "business" && "AI-Powered Invoicing"}
                  {selectedAudience === "investor" && "Tech-Driven Platform"}
                </div>
                <div className="text-text-secondary">
                  {selectedAudience === "worker" &&
                    "Get paid instantly after task completion"}
                  {selectedAudience === "business" &&
                    "AI generates accurate upfront price estimates"}
                  {selectedAudience === "investor" &&
                    "Advanced technology and automation"}
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Award" size={24} className="text-secondary" />
                </div>
                <div className="font-body-medium text-foreground mb-1">
                  {selectedAudience === "worker" && "Rewards Program"}
                  {selectedAudience === "business" && "Escrow Protection"}
                  {selectedAudience === "investor" && "Growing Market"}
                </div>
                <div className="text-text-secondary">
                  {selectedAudience === "worker" &&
                    "Earn badges, credits, and bonuses for milestones"}
                  {selectedAudience === "business" &&
                    "Secure escrow with automatic refunds"}
                  {selectedAudience === "investor" &&
                    "Expanding gig economy market opportunity"}
                </div>
              </div>
            </div>

            {/* Additional info for business */}
            {selectedAudience === "business" && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="text-sm text-foreground font-body-medium mb-2">
                  💡 How it works:
                </div>
                <ul className="text-sm text-text-secondary space-y-1 ml-4">
                  <li>• Subscribe to a plan (₹299, ₹599, or ₹799/month)</li>
                  <li>
                    • Post tasks up to your monthly limit with zero commission
                  </li>
                  <li>
                    • Unused limit carries over to next month (up to 3 months)
                  </li>
                  <li>
                    • After exceeding limit, pay only 6% commission per task
                  </li>
                  <li>• Non-subscribers pay 6% commission on all tasks</li>
                </ul>
              </div>
            )}
          </div>
        </motion.div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            Have questions about pricing?
          </p>
          <Button
            variant="ghost"
            iconName="HelpCircle"
            iconPosition="left"
            onClick={(e) => {
              e.preventDefault();
              // Scroll to FAQ section if it exists, otherwise scroll to get-started
              const faqSection = document.querySelector("section:last-of-type");
              if (faqSection) {
                const headerHeight = 64;
                const elementPosition = faqSection.getBoundingClientRect().top;
                const offsetPosition =
                  elementPosition + window.pageYOffset - headerHeight;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
            }}
          >
            View Pricing FAQ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
