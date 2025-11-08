export interface AudienceType {
  id: "worker" | "business" | "investor";
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
  color: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  benefits: string[];
}

export interface HeroCardData {
  audience: AudienceType["id"];
  title: string;
  subtitle: string;
  highlight: string;
  icon: string;
  gradient: string;
  features: string[];
}

export interface ValueProposition {
  id: string;
  title: string;
  description: string;
  icon: string;
  audience: AudienceType["id"][];
}

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  audience: AudienceType["id"];
  details: string[];
}

export interface TimelineStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  audience: AudienceType["id"];
  features: string[];
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  audience: AudienceType["id"];
  content: string;
  rating: number;
  earnings?: string;
  savings?: string;
  returns?: string;
  avatar: string;
  alt: string;
  verification: string;
  location: string;
}

export interface MetricData {
  id: string;
  label: string;
  value: string;
  icon: string;
  description: string;
  color: string;
}

export interface PricingTier {
  id: string;
  audience: AudienceType["id"];
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
  badge?: string;
}

export interface AppFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  screenshot: string;
  alt: string;
}

export interface TrustSignal {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  alt: string;
}

export interface InvestmentHighlight {
  id: string;
  metric: string;
  value: string;
  description: string;
  icon: string;
  trend: "up" | "down" | "stable";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  audience: AudienceType["id"][];
  category: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  metrics: {
    label: string;
    value: string;
  }[];
  audience: AudienceType["id"];
}

export interface ContactChannel {
  id: string;
  type: string;
  label: string;
  value: string;
  icon: string;
  primary: boolean;
}
