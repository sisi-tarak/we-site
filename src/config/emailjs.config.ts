/**
 * EmailJS Configuration
 * 
 * To set up EmailJS:
 * 1. Go to https://www.emailjs.com/
 * 2. Sign up for a free account
 * 3. Create an Email Service (Gmail, Outlook, etc.)
 * 4. Create an Email Template
 * 5. Get your Public Key from Account > General
 * 6. Get your Service ID from Email Services
 * 7. Get your Template ID from Email Templates
 * 8. Add these values to your .env file
 */

export const emailjsConfig = {
  // These will be loaded from environment variables
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
};

// Validate configuration
export const isEmailjsConfigured = (): boolean => {
  return !!(
    emailjsConfig.publicKey &&
    emailjsConfig.serviceId &&
    emailjsConfig.templateId
  );
};

