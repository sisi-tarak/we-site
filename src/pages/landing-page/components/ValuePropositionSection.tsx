import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { ValueProposition, AudienceType } from '../types';

interface ValuePropositionSectionProps {
  selectedAudience: AudienceType['id'];
}

const ValuePropositionSection = ({ selectedAudience }: ValuePropositionSectionProps) => {
  const [currentProposition, setCurrentProposition] = useState(0);

  const valuePropositions: ValueProposition[] = [
    {
      id: 'community-verified',
      title: 'Community Verified Platform',
      description: 'India\'s first gig platform with 100% College ID and Aadhaar verification ensuring trusted connections between all participants.',
      icon: 'Shield',
      audience: ['worker', 'business', 'investor']
    },
    {
      id: 'instant-payments',
      title: 'Instant UPI Payments',
      description: 'Get paid immediately after task completion with direct UPI transfers. No waiting periods, no payment delays.',
      icon: 'Zap',
      audience: ['worker', 'business']
    },
    {
      id: 'zero-commission',
      title: 'Zero Commission Forever',
      description: 'Workers never pay commission - keep 100% of your earnings forever. Earn rewards, badges, and bonuses as you complete tasks.',
      icon: 'Percent',
      audience: ['worker']
    },
    {
      id: 'worker-rewards',
      title: 'Worker Rewards Program',
      description: 'Earn rewards for milestones: 25 tasks = free t-shirt, 50 tasks = hoodie, 100 tasks = verified badge + bonus. Rewards improve your visibility.',
      icon: 'Award',
      audience: ['worker']
    },
    {
      id: 'ai-invoice',
      title: 'AI-Powered Invoice Generation',
      description: 'AI generates upfront price estimates using real-time online data. Transparent buffer system (12% tier-2, 18% metro) with automatic refunds.',
      icon: 'FileText',
      audience: ['business']
    },
    {
      id: 'dynamic-fees',
      title: 'Dynamic Delivery Fees',
      description: 'Delivery fees calculated by distance and grocery cost. Automatic proportional refunds if actual bill is less than estimate. Complete transparency.',
      icon: 'Package',
      audience: ['business']
    },
    {
      id: 'flexible-subscription',
      title: 'Flexible Subscription Plans',
      description: 'Choose a plan that fits your needs (₹299, ₹599, or ₹799/month). Unused limits carry over up to 3 months. Zero commission within limit.',
      icon: 'CreditCard',
      audience: ['business']
    },
    {
      id: 'quality-talent',
      title: 'Pre-Verified Quality Talent',
      description: 'Access a pool of verified students and professionals from top colleges and institutions across India.',
      icon: 'Users',
      audience: ['business']
    },
    {
      id: 'partnership-opportunities',
      title: 'Partnership Opportunities',
      description: 'Join our waitlist for future investment and business partnership opportunities. Get early access to collaborations and market insights.',
      icon: 'TrendingUp',
      audience: ['investor']
    },
    {
      id: 'local-focus',
      title: 'Local Market Understanding',
      description: 'Built specifically for Indian market with local payment methods, verification systems, and cultural understanding.',
      icon: 'MapPin',
      audience: ['worker', 'business', 'investor']
    }
  ];

  // Filter propositions based on selected audience
  const relevantPropositions = valuePropositions.filter(prop => 
    prop.audience.includes(selectedAudience)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProposition((prev) => (prev + 1) % relevantPropositions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [relevantPropositions.length]);

  const currentProp = relevantPropositions[currentProposition];

  return (
    <section className="py-20 bg-gradient-to-r from-muted/50 to-accent/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
        
        {/* Floating Icons */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-20 opacity-10"
        >
          <Icon name="Star" size={24} className="text-primary" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 left-16 opacity-10"
        >
          <Icon name="Heart" size={20} className="text-accent" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-body-medium mb-6"
          >
            <Icon name="Sparkles" size={16} />
            <span>Why Choose WE Universal</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading-bold text-foreground mb-6"
          >
            India's Most Trusted
            <span className="text-primary"> Gig Platform</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Built by Indians, for Indians. Experience the future of flexible work with complete trust and transparency.
          </motion.p>
        </div>

        {/* Main Value Proposition Display */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card-hover relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-accent" />
            </div>

            <div className="relative z-10">
              {/* Rotating Value Proposition */}
              <div className="text-center mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProposition}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon name={currentProp?.icon || 'Shield'} size={32} className="text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-heading-bold text-foreground">
                      {currentProp?.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                      {currentProp?.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center space-x-3 mb-8">
                {relevantPropositions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProposition(index)}
                    className={`w-3 h-3 rounded-full transition-smooth ${
                      index === currentProposition
                        ? 'bg-primary scale-125' :'bg-border hover:bg-accent'
                    }`}
                  />
                ))}
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-heading-bold text-primary mb-2">₹50L+</div>
                  <div className="text-sm text-text-secondary">Paid to Workers</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-heading-bold text-secondary mb-2">10,000+</div>
                  <div className="text-sm text-text-secondary">Completed Tasks</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-heading-bold text-success mb-2">4.8/5</div>
                  <div className="text-sm text-text-secondary">Average Rating</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-heading-bold text-warning mb-2">100%</div>
                  <div className="text-sm text-text-secondary">Verified Users</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {relevantPropositions.slice(0, 3).map((prop, index) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-card-hover transition-card group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name={prop.icon} size={24} className="text-primary" />
                </div>
                <h4 className="font-heading-bold text-foreground">{prop.title}</h4>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{prop.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;