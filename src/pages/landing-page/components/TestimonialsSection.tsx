import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { TestimonialData, AudienceType } from '../types';

interface TestimonialsSectionProps {
  selectedAudience: AudienceType['id'];
}

const TestimonialsSection = ({ selectedAudience }: TestimonialsSectionProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: TestimonialData[] = [
  // Worker Testimonials
  {
    id: 'worker-1',
    name: 'Priya Sharma',
    role: 'B.Tech Student, VIT Vellore',
    audience: 'worker',
    content: `WE Universal changed my college life completely! I earn ₹12,000+ every month doing data entry and content writing tasks. The verification process made me feel safe, and instant UPI payments mean I never have to wait for my money. Perfect for students like me who need flexible income.`,
    rating: 5,
    earnings: '₹12,000+/month',
    avatar: "https://images.unsplash.com/photo-1733737272264-6af8f1aa41fc",
    alt: 'Young Indian woman student with long black hair smiling at camera in college campus',
    verification: 'College ID Verified',
    location: 'Vellore, Tamil Nadu'
  },
  {
    id: 'worker-2',
    name: 'Rahul Kumar',
    role: 'Engineering Student, NIT Tirupati',
    audience: 'worker',
    content: `Started with small tasks and now I'm earning ₹15,000+ monthly! The platform's verification system ensures I only work with genuine businesses. The escrow protection gives me confidence that I'll always get paid for my work. Highly recommend to all students!`,
    rating: 5,
    earnings: '₹15,000+/month',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff5b3609-1762274360519.png",
    alt: 'Young Indian male engineering student with short hair wearing casual shirt smiling confidently',
    verification: 'College ID Verified',
    location: 'Tirupati, Andhra Pradesh'
  },
  {
    id: 'worker-3',
    name: 'Sneha Reddy',
    role: 'Homemaker & Freelancer',
    audience: 'worker',
    content: `As a homemaker, WE Universal gave me the perfect opportunity to earn from home. I do graphic design tasks during my free time and earn ₹8,000+ monthly. The flexible timing and instant payments make it ideal for managing household responsibilities.`,
    rating: 5,
    earnings: '₹8,000+/month',
    avatar: "https://images.unsplash.com/photo-1536133397561-5028208db592",
    alt: 'Indian homemaker woman with traditional attire smiling warmly while working on laptop at home',
    verification: 'Aadhaar Verified',
    location: 'Chittoor, Andhra Pradesh'
  },
  // Business Testimonials
  {
    id: 'business-1',
    name: 'Rajesh Patel',
    role: 'CEO, TechStart Solutions',
    audience: 'business',
    content: `WE Universal solved our biggest problem - finding reliable talent quickly. We've hired 50+ verified students for various projects and saved 60% on our operational costs. The quality of work and professionalism of workers is outstanding. Game-changer for small businesses!`,
    rating: 5,
    savings: '60% cost reduction',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f50b0990-1762274155673.png",
    alt: 'Middle-aged Indian businessman in formal shirt and tie smiling confidently in modern office',
    verification: 'GST Verified Business',
    location: 'Bangalore, Karnataka'
  },
  {
    id: 'business-2',
    name: 'Meera Agarwal',
    role: 'Founder, Digital Marketing Pro',
    audience: 'business',
    content: `The verification system on WE Universal is incredible. Every worker we've hired has been professional and skilled. We've completed 100+ projects with zero payment disputes thanks to the escrow system. It's our go-to platform for finding quality talent.`,
    rating: 5,
    savings: '40% time saved',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cef3e415-1762274502183.png",
    alt: 'Professional Indian businesswoman with shoulder-length hair in business attire smiling in modern workspace',
    verification: 'GST Verified Business',
    location: 'Mumbai, Maharashtra'
  },
  // Investor Testimonials
  {
    id: 'investor-1',
    name: 'Vikram Singh',
    role: 'Angel Investor & Former VP, Flipkart',
    audience: 'investor',
    content: `WE Universal represents the future of India's gig economy. The community verification model and focus on trust sets them apart. With projected goals of ₹50L+ paid to workers and 10,000+ completed tasks in Year 1, the potential is impressive. Excited to be part of this journey.`,
    rating: 5,
    returns: '20x+ projected returns',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_191605a11-1762274216267.png",
    alt: 'Senior Indian investor in formal business suit with gray hair smiling confidently in corporate setting',
    verification: 'Accredited Investor',
    location: 'Gurgaon, Haryana'
  }];


  // Filter testimonials based on selected audience
  const relevantTestimonials = testimonials.filter((testimonial) =>
  testimonial.audience === selectedAudience
  );

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % relevantTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [relevantTestimonials.length, isAutoPlaying]);

  const currentTestimonialData = relevantTestimonials[currentTestimonial];

  if (!currentTestimonialData) return null;

  return (
    <section id="success-stories" className="py-20 bg-gradient-to-br from-accent/5 via-background to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl" />
        
        {/* Quote Marks */}
        <div className="absolute top-10 left-10 text-6xl text-primary/10 font-serif">"</div>
        <div className="absolute bottom-10 right-10 text-6xl text-accent/10 font-serif rotate-180">"</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-body-medium mb-6">

            <Icon name="MessageCircle" size={16} />
            <span>Success Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading-bold text-foreground mb-6">

            Real People, Real
            <span className="text-primary"> Success</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto">

            {selectedAudience === 'worker' && 'Hear from students and professionals who are earning flexible income through our platform.'}
            {selectedAudience === 'business' && 'Discover how businesses are finding quality talent and reducing costs with our verified workers.'}
            {selectedAudience === 'investor' && 'Learn why investors are excited about our growth potential and market opportunity.'}
          </motion.p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card-hover relative overflow-hidden"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary to-transparent rounded-full" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent to-transparent rounded-full" />
              </div>

              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) =>
                    <Icon
                      key={i}
                      name="Star"
                      size={24}
                      className={`${
                      i < currentTestimonialData.rating ?
                      'text-warning fill-current' : 'text-border'}`
                      } />

                    )}
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed text-center mb-8 font-body">
                  "{currentTestimonialData.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                      <Image
                        src={currentTestimonialData.avatar}
                        alt={currentTestimonialData.alt}
                        className="w-full h-full object-cover" />

                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="text-center md:text-left">
                    <h4 className="font-heading-bold text-foreground text-lg mb-1">
                      {currentTestimonialData.name}
                    </h4>
                    <p className="text-text-secondary text-sm mb-2">
                      {currentTestimonialData.role}
                    </p>
                    <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{currentTestimonialData.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Shield" size={12} className="text-success" />
                        <span>{currentTestimonialData.verification}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl px-6 py-4 text-center">
                    <div className="text-2xl font-heading-bold text-primary mb-1">
                      {currentTestimonialData.earnings || currentTestimonialData.savings || currentTestimonialData.returns}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {selectedAudience === 'worker' && 'Monthly Earnings'}
                      {selectedAudience === 'business' && 'Cost Savings'}
                      {selectedAudience === 'investor' && 'Return Potential'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => {
                setCurrentTestimonial(
                  currentTestimonial === 0 ? relevantTestimonials.length - 1 : currentTestimonial - 1
                );
                setIsAutoPlaying(false);
              }}
              className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-smooth">

              <Icon name="ChevronLeft" size={20} className="text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {relevantTestimonials.map((_, index) =>
              <button
                key={index}
                onClick={() => {
                  setCurrentTestimonial(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-smooth ${
                index === currentTestimonial ?
                'bg-primary scale-125' : 'bg-border hover:bg-accent'}`
                } />

              )}
            </div>

            <button
              onClick={() => {
                setCurrentTestimonial(
                  currentTestimonial === relevantTestimonials.length - 1 ? 0 : currentTestimonial + 1
                );
                setIsAutoPlaying(false);
              }}
              className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-smooth">

              <Icon name="ChevronRight" size={20} className="text-foreground" />
            </button>
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 text-sm text-text-secondary hover:text-foreground transition-smooth">

              <Icon name={isAutoPlaying ? 'Pause' : 'Play'} size={16} />
              <span>{isAutoPlaying ? 'Pause' : 'Play'} Auto-rotation</span>
            </button>
          </div>
        </div>

        {/* Additional Stats - Projected Goals */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-heading-bold text-primary mb-2">4.8/5</div>
              <div className="text-sm text-text-secondary">Target Rating</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-heading-bold text-success mb-2">10K+</div>
              <div className="text-sm text-text-secondary">Target: Tasks</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-heading-bold text-secondary mb-2">₹50L+</div>
              <div className="text-sm text-text-secondary">Target: Paid Out</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl font-heading-bold text-warning mb-2">100%</div>
              <div className="text-sm text-text-secondary">Target: Verified</div>
            </motion.div>
          </div>
          <p className="text-xs text-text-secondary italic text-center">
            * Projected goals for Year 1
          </p>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;