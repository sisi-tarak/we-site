import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import { FAQItem, AudienceType } from "../types";

interface FAQSectionProps {
  selectedAudience: AudienceType["id"];
}

const FAQSection = ({ selectedAudience }: FAQSectionProps) => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const faqData: FAQItem[] = [
    // Worker FAQs
    {
      id: "worker-1",
      question: "How do I get verified on the platform?",
      answer: `Getting verified is simple and secure. Upload your College ID or Aadhaar card, verify your phone number via OTP, and complete your profile with skills and experience. Our verification team reviews documents within 24-48 hours. Once verified, you'll receive a verification badge and can start applying for tasks immediately.`,
      audience: ["worker"],
      category: "verification",
    },
    {
      id: "worker-2",
      question: "How much can I earn and when do I get paid?",
      answer: `Earnings vary based on skills and time commitment. Students typically earn ₹8,000-₹15,000+ monthly. Payments are instant via UPI after task completion and approval. Your first month has zero commission, then only 5% commission applies. Higher-rated workers get access to premium tasks with better pay.`,
      audience: ["worker"],
      category: "earnings",
    },
    {
      id: "worker-3",
      question: "What types of tasks are available?",
      answer: `We offer diverse tasks including data entry, content writing, graphic design, social media management, research, translation, tutoring, and local services. Tasks are categorized by skill level, duration, and payment. You can filter by location, remote work options, and your expertise areas.`,
      audience: ["worker"],
      category: "tasks",
    },
    {
      id: "worker-4",
      question: "Is my payment guaranteed and secure?",
      answer: `Yes, all payments are secured through our escrow system. Businesses deposit payment before work begins, ensuring you're guaranteed payment upon successful completion. We also provide dispute resolution and have a 99.8% payment success rate. UPI transfers are instant and secure.`,
      audience: ["worker"],
      category: "payment",
    },

    // Business FAQs
    {
      id: "business-1",
      question: "How do you ensure worker quality and verification?",
      answer: `Every worker undergoes strict verification including College ID/Aadhaar authentication, background checks, and skill assessments. We maintain detailed ratings and reviews from previous tasks. Workers are categorized by expertise levels, and you can view their complete work history before hiring.`,
      audience: ["business"],
      category: "verification",
    },
    {
      id: "business-2",
      question: "What are your pricing plans and fees?",
      answer: `Our Basic plan starts at ₹999/month for up to 10 active tasks. Professional plan at ₹2,999/month offers unlimited tasks and premium features. Enterprise solutions have custom pricing. No hidden fees - transparent pricing with escrow protection included in all plans.`,
      audience: ["business"],
      category: "pricing",
    },
    {
      id: "business-3",
      question: "How does the escrow payment system work?",
      answer: `You deposit payment into secure escrow before work begins. Funds are held safely until task completion and your approval. This protects both parties - workers are guaranteed payment for completed work, and you only pay for satisfactory results. Disputes are resolved fairly by our team.`,
      audience: ["business"],
      category: "payment",
    },
    {
      id: "business-4",
      question: "Can I hire workers for long-term projects?",
      answer: `Absolutely! You can hire workers for both one-time tasks and long-term projects. Our platform supports milestone-based payments, recurring tasks, and dedicated team assignments. Many businesses build ongoing relationships with top-rated workers for consistent quality.`,
      audience: ["business"],
      category: "hiring",
    },

    // Investor FAQs
    {
      id: "investor-1",
      question: "What is the minimum investment amount?",
      answer: `Seed round investments start at ₹10L minimum. Series A requires ₹50L minimum investment. Strategic partnerships begin at ₹1Cr+. We also offer smaller ticket sizes for angel investors through our syndicate program. Investment terms vary based on round and involvement level.`,
      audience: ["investor"],
      category: "investment",
    },
    {
      id: "investor-2",
      question: "What are the projected returns and timeline?",
      answer: `Based on our traction and market analysis, we project 15-25x returns over 3-7 years. Current metrics show ₹50L+ paid to workers, 10,000+ completed tasks, and 25% monthly growth. India's gig economy is projected to reach ₹400Cr by 2025, positioning us for significant returns.`,
      audience: ["investor"],
      category: "returns",
    },
    {
      id: "investor-3",
      question: "What makes WE Universal different from competitors?",
      answer: `Our unique community verification model using College ID/Aadhaar creates unprecedented trust. We focus on the underserved student/homemaker segment with instant UPI payments. Our local market understanding and zero-commission first month strategy drives rapid user acquisition and retention.`,
      audience: ["investor"],
      category: "competitive",
    },
    {
      id: "investor-4",
      question: "What are the key risks and mitigation strategies?",
      answer: `Main risks include market competition, regulatory changes, and scaling challenges. We mitigate through strong verification systems, compliance focus, experienced team, and proven unit economics. Our local market expertise and community-first approach provide competitive advantages.`,
      audience: ["investor"],
      category: "risks",
    },

    // General FAQs
    {
      id: "general-1",
      question: "Is WE Universal available in my city?",
      answer: `We currently operate in 25+ cities across India including Bangalore, Mumbai, Delhi, Chennai, Hyderabad, Pune, and expanding rapidly. We focus on tier-1 and tier-2 cities with strong educational institutions. Check our website for the latest city availability or express interest for your city.`,
      audience: ["worker", "business", "investor"],
      category: "availability",
    },
    {
      id: "general-2",
      question: "How do I contact customer support?",
      answer: `Our support team is available 24/7 through multiple channels: in-app chat, WhatsApp (+91-9876543210), email (support@weuniversal.com), and phone support. Premium users get priority support with dedicated account managers. Average response time is under 2 hours.`,
      audience: ["worker", "business", "investor"],
      category: "support",
    },
  ];

  // Filter FAQs based on audience and search
  const filteredFAQs = faqData.filter((faq) => {
    const matchesAudience = faq.audience.includes(selectedAudience);
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;

    return matchesAudience && matchesSearch && matchesCategory;
  });

  // Get unique categories for current audience
  const categories = [
    "all",
    ...new Set(
      faqData
        .filter((faq) => faq.audience.includes(selectedAudience))
        .map((faq) => faq.category)
    ),
  ];

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl" />

        {/* Question marks floating */}
        <div className="absolute top-32 right-32 text-6xl text-primary/5 font-heading-bold animate-bounce">
          ?
        </div>
        <div
          className="absolute bottom-40 left-16 text-4xl text-accent/5 font-heading-bold animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          ?
        </div>
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
            <Icon name="HelpCircle" size={16} />
            <span>Frequently Asked Questions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading-bold text-foreground mb-6"
          >
            Got Questions? We've Got
            <span className="text-primary"> Answers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            {selectedAudience === "worker" &&
              "Everything you need to know about earning on our platform, from verification to payments."}
            {selectedAudience === "business" &&
              "Learn how to find quality talent, manage projects, and ensure successful task completion."}
            {selectedAudience === "investor" &&
              "Understand our investment opportunities, returns, and growth potential in detail."}
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? "All Categories"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-text-secondary mb-6">
            Showing {filteredFAQs.length}{" "}
            {filteredFAQs.length === 1 ? "question" : "questions"}
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card-hover transition-card"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-muted/50 transition-smooth"
                  >
                    <h3 className="font-heading-bold text-foreground pr-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <Icon
                        name="ChevronDown"
                        size={20}
                        className="text-text-secondary"
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-border">
                          <div className="pt-4">
                            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>

                            {/* Category Tag */}
                            <div className="mt-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-body-medium bg-primary/10 text-primary">
                                {faq.category.charAt(0).toUpperCase() +
                                  faq.category.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={32} className="text-text-secondary" />
              </div>
              <h3 className="font-heading-bold text-foreground mb-2">
                No questions found
              </h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-primary hover:text-primary/80 font-body-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-card border border-border rounded-3xl p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icon name="MessageCircle" size={32} className="text-white" />
            </div>

            <h3 className="text-2xl font-heading-bold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-text-secondary mb-6">
              Our support team is here to help you 24/7. Get personalized
              assistance for your specific needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Zap" size={16} />
                <span>&lt;2 Hour Response</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Users" size={16} />
                <span>Expert Team</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <a
                href="mailto:support@weuniversal.com"
                className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-body-medium hover:bg-primary/90 transition-smooth"
              >
                <Icon name="Mail" size={16} />
                <span>Email Support</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                className="inline-flex items-center space-x-2 bg-success text-white px-6 py-3 rounded-xl font-body-medium hover:bg-success/90 transition-smooth"
              >
                <Icon name="MessageCircle" size={16} />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
