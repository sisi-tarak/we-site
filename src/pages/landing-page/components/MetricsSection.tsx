import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Icon from "../../../components/AppIcon";
import { MetricData } from "../types";

const MetricsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>(
    {}
  );

  const metrics: MetricData[] = [
    {
      id: "tasks",
      label: "🎯 Tasks Completed",
      value: "10,000",
      icon: "CheckCircle",
      description: "Target by end of Year 1",
      color: "text-primary",
    },
    {
      id: "payout",
      label: "💰 Paid to Workers",
      value: "₹50,00,000",
      icon: "Wallet",
      description: "Projected payout target",
      color: "text-success",
    },
    {
      id: "rating",
      label: "⭐ Target Rating",
      value: "4.8",
      icon: "Star",
      description: "Goal: 4.8/5 average",
      color: "text-warning",
    },
    {
      id: "users",
      label: "✓ Verified Community",
      value: "100%",
      icon: "Shield",
      description: "100% verified users target",
      color: "text-secondary",
    },
  ];

  // Animation function for counting up numbers
  const animateValue = (
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void
  ) => {
    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * easeOutQuart;

      callback(Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  // Extract numeric values for animation
  const getNumericValue = (value: string): number => {
    const cleanValue = value.replace(/[₹,%]/g, "").replace(/,/g, "");
    return parseFloat(cleanValue) || 0;
  };

  // Format animated values back to display format
  const formatValue = (metric: MetricData, animatedValue: number): string => {
    if (metric.id === "payout") {
      return `₹${(animatedValue / 100000).toFixed(0)}L+`;
    }
    if (metric.id === "tasks") {
      return `${animatedValue.toLocaleString()}+`;
    }
    if (metric.id === "rating") {
      return `${(animatedValue / 10).toFixed(1)}/5`;
    }
    if (metric.id === "users") {
      return "100%";
    }
    return animatedValue.toString();
  };

  useEffect(() => {
    if (isInView) {
      metrics.forEach((metric, index) => {
        if (metric.id === "users") {
          // For 100%, set directly without animation
          setTimeout(() => {
            setAnimatedValues((prev) => ({
              ...prev,
              [metric.id]: 100,
            }));
          }, index * 200);
        } else {
          const numericValue = getNumericValue(metric.value);
          const adjustedValue =
            metric.id === "rating" ? numericValue * 10 : numericValue;

          setTimeout(() => {
            animateValue(0, adjustedValue, 2000, (value) => {
              setAnimatedValues((prev) => ({
                ...prev,
                [metric.id]: value,
              }));
            });
          }, index * 200);
        }
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-primary/5 via-background to-accent/5 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating Numbers */}
        <div className="absolute top-20 right-20 text-6xl font-heading-bold text-primary/5 animate-bounce">
          ₹
        </div>
        <div
          className="absolute bottom-32 left-16 text-4xl font-heading-bold text-accent/5 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          %
        </div>
        <div
          className="absolute top-1/2 left-1/4 text-5xl font-heading-bold text-secondary/5 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          ★
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-body-medium mb-6"
          >
            <Icon name="Target" size={16} />
            <span>Our Mission by End of Year 1</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading-bold text-foreground mb-6"
          >
            📊 Our Mission by End of
            <span className="text-primary"> Year 1</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            These are our projected goals and targets for the first year after
            launch. Join us in building India's most trusted gig platform.
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              className="bg-card border border-border rounded-3xl p-8 text-center hover:shadow-card-hover transition-card group relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    metric.color === "text-success"
                      ? "bg-success/10"
                      : metric.color === "text-primary"
                      ? "bg-primary/10"
                      : metric.color === "text-warning"
                      ? "bg-warning/10"
                      : metric.color === "text-secondary"
                      ? "bg-secondary/10"
                      : "bg-accent/10"
                  }`}
                >
                  <Icon name={metric.icon} size={32} className={metric.color} />
                </div>

                {/* Animated Value */}
                <div className="mb-4">
                  <motion.div
                    className="text-3xl md:text-4xl font-heading-extra-bold text-foreground mb-2"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {animatedValues[metric.id] !== undefined
                      ? formatValue(metric, animatedValues[metric.id])
                      : "0"}
                  </motion.div>

                  {/* Special effects for rating */}
                  {metric.id === "rating" && (
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 1 + i * 0.1 }}
                        >
                          <Icon
                            name="Star"
                            size={20}
                            className={`${
                              i <
                              Math.floor((animatedValues[metric.id] || 0) / 10)
                                ? "text-warning fill-current"
                                : "text-border"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Label and Description */}
                <h3 className="text-lg font-heading-bold text-foreground mb-2">
                  {metric.label}
                </h3>
                <p className="text-text-secondary text-sm">
                  {metric.description}
                </p>

                {/* Progress indicator for rating */}
                {metric.id === "rating" && (
                  <div className="mt-4">
                    <div className="w-full bg-border rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-warning"
                        initial={{ width: "0%" }}
                        animate={{
                          width: `${Math.min(
                            ((animatedValues[metric.id] || 0) / 10) * 20,
                            100
                          )}%`,
                        }}
                        transition={{ delay: index * 0.1 + 1, duration: 1 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projection Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-warning/10 text-warning px-4 py-2 rounded-full text-sm font-body-medium">
            <Icon name="Info" size={16} />
            <span>These are projected goals, not current data</span>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon name="Shield" size={24} className="text-success" />
            </div>
            <div className="text-sm font-body-medium text-foreground">
              100% Verified
            </div>
            <div className="text-xs text-text-secondary">All participants</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon name="Zap" size={24} className="text-primary" />
            </div>
            <div className="text-sm font-body-medium text-foreground">
              Instant Payments
            </div>
            <div className="text-xs text-text-secondary">Via UPI</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon name="Lock" size={24} className="text-secondary" />
            </div>
            <div className="text-sm font-body-medium text-foreground">
              Escrow Protected
            </div>
            <div className="text-xs text-text-secondary">
              Secure transactions
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon name="Award" size={24} className="text-warning" />
            </div>
            <div className="text-sm font-body-medium text-foreground">
              Quality Assured
            </div>
            <div className="text-xs text-text-secondary">Rated work</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
