import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { PricingTier, AudienceType } from '../types';

interface PricingSectionProps {
  selectedAudience: AudienceType['id'];
}

const PricingSection = ({ selectedAudience }: PricingSectionProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const pricingTiers: Record<AudienceType['id'], PricingTier[]> = {
    worker: [
      {
        id: 'worker-starter',
        audience: 'worker',
        name: 'First Month Free',
        price: '₹0',
        period: 'first month',
        description: 'Start earning with zero commission for your first month',
        features: [
          'Zero commission on all earnings',
          'Instant UPI payments',
          'College ID verification',
          'Basic task access',
          'Community support',
          'Mobile app access'
        ],
        highlighted: true,
        ctaText: 'Start Earning Free',
        badge: 'Most Popular'
      },
      {
        id: 'worker-standard',
        audience: 'worker',
        name: 'Standard Plan',
        price: billingCycle === 'monthly' ? '5%' : '4%',
        period: 'commission',
        description: 'Low commission rate after your free month',
        features: [
          'Only 5% commission (4% yearly)',
          'Priority task notifications',
          'Advanced skill matching',
          'Performance analytics',
          'Premium support',
          'Referral bonuses'
        ],
        highlighted: false,
        ctaText: 'Continue Earning'
      }
    ],
    business: [
      {
        id: 'business-basic',
        audience: 'business',
        name: 'Basic',
        price: billingCycle === 'monthly' ? '₹999' : '₹9,999',
        period: billingCycle === 'monthly' ? '/month' : '/year',
        description: 'Perfect for small businesses and startups',
        features: [
          'Up to 10 active tasks',
          'Basic worker verification',
          'Standard support',
          'Task management tools',
          'Payment processing',
          'Basic analytics'
        ],
        highlighted: false,
        ctaText: 'Start Basic Plan'
      },
      {
        id: 'business-pro',
        audience: 'business',
        name: 'Professional',
        price: billingCycle === 'monthly' ? '₹2,999' : '₹29,999',
        period: billingCycle === 'monthly' ? '/month' : '/year',
        description: 'Advanced features for growing businesses',
        features: [
          'Unlimited active tasks',
          'Premium worker verification',
          'Priority support',
          'Advanced analytics',
          'Custom workflows',
          'API access',
          'Dedicated account manager'
        ],
        highlighted: true,
        ctaText: 'Go Professional',
        badge: 'Recommended'
      },
      {
        id: 'business-enterprise',
        audience: 'business',
        name: 'Enterprise',
        price: 'Custom',
        period: 'pricing',
        description: 'Tailored solutions for large organizations',
        features: [
          'Custom task limits',
          'White-label solution',
          'Enterprise security',
          '24/7 dedicated support',
          'Custom integrations',
          'SLA guarantees',
          'Training & onboarding'
        ],
        highlighted: false,
        ctaText: 'Contact Sales'
      }
    ],
    investor: [
      {
        id: 'investor-seed',
        audience: 'investor',
        name: 'Seed Round',
        price: '₹10L',
        period: 'minimum',
        description: 'Early-stage investment opportunity',
        features: [
          '15-20x return potential',
          'Equity participation',
          'Board observer rights',
          'Quarterly updates',
          'Exit strategy planning',
          'Due diligence access'
        ],
        highlighted: false,
        ctaText: 'Express Interest'
      },
      {
        id: 'investor-series-a',
        audience: 'investor',
        name: 'Series A',
        price: '₹50L',
        period: 'minimum',
        description: 'Growth-stage investment with higher returns',
        features: [
          '20-25x return potential',
          'Preferred equity',
          'Board seat eligibility',
          'Monthly updates',
          'Strategic input rights',
          'Priority exit options',
          'Co-investment opportunities'
        ],
        highlighted: true,
        ctaText: 'Schedule Meeting',
        badge: 'Best Returns'
      },
      {
        id: 'investor-strategic',
        audience: 'investor',
        name: 'Strategic Partner',
        price: '₹1Cr+',
        period: 'investment',
        description: 'Strategic partnership with operational involvement',
        features: [
          '25x+ return potential',
          'Strategic partnership',
          'Board representation',
          'Weekly updates',
          'Operational involvement',
          'Market expansion rights',
          'Technology licensing'
        ],
        highlighted: false,
        ctaText: 'Partner With Us'
      }
    ]
  };

  const currentTiers = pricingTiers[selectedAudience];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl" />
        
        {/* Price symbols floating */}
        <div className="absolute top-32 right-32 text-4xl text-primary/10 font-heading-bold animate-bounce">₹</div>
        <div className="absolute bottom-40 left-16 text-3xl text-accent/10 font-heading-bold animate-bounce" style={{ animationDelay: '1s' }}>%</div>
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
            {selectedAudience === 'worker' && 'Start Free, Earn More'}
            {selectedAudience === 'business' && 'Fair & Transparent Pricing'}
            {selectedAudience === 'investor' && 'Investment Opportunities'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            {selectedAudience === 'worker' && 'Begin your earning journey with zero commission for the first month, then enjoy the lowest rates in the industry.'}
            {selectedAudience === 'business' && 'Choose the perfect plan for your business needs with transparent pricing and no hidden fees.'}
            {selectedAudience === 'investor' && 'Join our growth story with attractive investment packages and proven return potential.'}
          </motion.p>
        </div>

        {/* Billing Toggle (for business only) */}
        {selectedAudience === 'business' && (
          <div className="flex justify-center mb-12">
            <div className="bg-card border border-border rounded-2xl p-2 flex items-center space-x-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-xl font-body-medium transition-smooth ${
                  billingCycle === 'monthly' ?'bg-primary text-primary-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-xl font-body-medium transition-smooth relative ${
                  billingCycle === 'yearly' ?'bg-primary text-primary-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-success text-white text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className={`grid gap-8 max-w-6xl mx-auto ${
          currentTiers.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
          currentTiers.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': 'grid-cols-1'
        }`}>
          {currentTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
              className={`relative bg-card border-2 rounded-3xl p-8 transition-card ${
                tier.highlighted
                  ? 'border-primary shadow-card-hover ring-4 ring-primary/10'
                  : 'border-border hover:border-accent'
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
                <p className="text-text-secondary mb-6">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className={`text-4xl md:text-5xl font-heading-extra-bold ${
                      tier.highlighted ? 'text-primary' : 'text-foreground'
                    }`}>
                      {tier.price}
                    </span>
                    <span className="text-text-secondary font-body-medium">
                      {tier.period}
                    </span>
                  </div>
                  
                  {/* Special offer for workers */}
                  {selectedAudience === 'worker' && tier.id === 'worker-starter' && (
                    <div className="mt-2 text-sm text-success font-body-medium">
                      Limited time offer - Start today!
                    </div>
                  )}
                  
                  {/* Savings indicator for yearly billing */}
                  {selectedAudience === 'business' && billingCycle === 'yearly' && tier.price !== 'Custom' && (
                    <div className="mt-2 text-sm text-success font-body-medium">
                      Save ₹{parseInt(tier.price.replace(/[₹,]/g, '')) * 2.4 - parseInt(tier.price.replace(/[₹,]/g, ''))} per year
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
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        tier.highlighted ? 'bg-primary/10' : 'bg-success/10'
                      }`}>
                        <Icon 
                          name="Check" 
                          size={12} 
                          className={tier.highlighted ? 'text-primary' : 'text-success'} 
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
                variant={tier.highlighted ? 'default' : 'outline'}
                size="lg"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                className={tier.highlighted ? 'animate-pulse-cta shadow-cta' : ''}
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
                {tier.ctaText}
              </Button>

              {/* Additional info for investors */}
              {selectedAudience === 'investor' && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Expected Timeline:</span>
                    <span className="text-foreground font-body-medium">
                      {tier.id === 'investor-seed' ? '2-3 years' : 
                       tier.id === 'investor-series-a' ? '3-5 years' : '5-7 years'}
                    </span>
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
              {selectedAudience === 'worker' && 'Why Choose WE Universal?'}
              {selectedAudience === 'business' && 'Compare with Competitors'}
              {selectedAudience === 'investor' && 'Investment Advantages'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Shield" size={24} className="text-success" />
                </div>
                <div className="font-body-medium text-foreground mb-1">
                  {selectedAudience === 'worker' && 'Lowest Commission'}
                  {selectedAudience === 'business' && 'Best Value'}
                  {selectedAudience === 'investor' && 'Proven Traction'}
                </div>
                <div className="text-text-secondary">
                  {selectedAudience === 'worker' && 'Industry-leading 5% vs 20%+ others'}
                  {selectedAudience === 'business' && '50% less than competitors'}
                  {selectedAudience === 'investor' && '₹50L+ paid, 10K+ tasks completed'}
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <div className="font-body-medium text-foreground mb-1">
                  {selectedAudience === 'worker' && 'Instant Payments'}
                  {selectedAudience === 'business' && 'Faster Hiring'}
                  {selectedAudience === 'investor' && 'Market Leadership'}
                </div>
                <div className="text-text-secondary">
                  {selectedAudience === 'worker' && 'UPI payments vs 7-day delays'}
                  {selectedAudience === 'business' && '2x faster than traditional platforms'}
                  {selectedAudience === 'investor' && 'First-mover advantage in verified gig economy'}
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name="Users" size={24} className="text-secondary" />
                </div>
                <div className="font-body-medium text-foreground mb-1">
                  {selectedAudience === 'worker' && '100% Verified'}
                  {selectedAudience === 'business' && 'Quality Guarantee'}
                  {selectedAudience === 'investor' && 'Scalable Model'}
                </div>
                <div className="text-text-secondary">
                  {selectedAudience === 'worker' && 'College ID + Aadhaar verification'}
                  {selectedAudience === 'business' && 'Pre-screened talent pool'}
                  {selectedAudience === 'investor' && 'Expanding to 50+ cities by 2025'}
                </div>
              </div>
            </div>
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
              const faqSection = document.querySelector('section:last-of-type');
              if (faqSection) {
                const headerHeight = 64;
                const elementPosition = faqSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
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