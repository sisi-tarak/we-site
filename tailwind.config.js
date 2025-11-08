/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        cta: ["Inter", "sans-serif"],
        accent: ["Poppins", "sans-serif"],
      },
      colors: {
        border: "var(--color-border)" /* gray-200 */,
        input: "var(--color-input)" /* white */,
        ring: "var(--color-ring)" /* orange-500 */,
        background: "var(--color-background)" /* white */,
        foreground: "var(--color-foreground)" /* gray-900 */,
        primary: {
          DEFAULT: "var(--color-primary)" /* orange-500 */,
          foreground: "var(--color-primary-foreground)" /* white */,
        },
        secondary: {
          DEFAULT: "var(--color-secondary)" /* blue-700 */,
          foreground: "var(--color-secondary-foreground)" /* white */,
        },
        destructive: {
          DEFAULT: "var(--color-destructive)" /* red-500 */,
          foreground: "var(--color-destructive-foreground)" /* white */,
        },
        muted: {
          DEFAULT: "var(--color-muted)" /* gray-50 */,
          foreground: "var(--color-muted-foreground)" /* gray-500 */,
        },
        accent: {
          DEFAULT: "var(--color-accent)" /* orange-300 */,
          foreground: "var(--color-accent-foreground)" /* gray-900 */,
        },
        popover: {
          DEFAULT: "var(--color-popover)" /* white */,
          foreground: "var(--color-popover-foreground)" /* gray-900 */,
        },
        card: {
          DEFAULT: "var(--color-card)" /* white */,
          foreground: "var(--color-card-foreground)" /* gray-900 */,
        },
        success: {
          DEFAULT: "var(--color-success)" /* emerald-500 */,
          foreground: "var(--color-success-foreground)" /* white */,
        },
        warning: {
          DEFAULT: "var(--color-warning)" /* amber-500 */,
          foreground: "var(--color-warning-foreground)" /* white */,
        },
        error: {
          DEFAULT: "var(--color-error)" /* red-500 */,
          foreground: "var(--color-error-foreground)" /* white */,
        },
        surface: {
          DEFAULT: "var(--color-surface)" /* gray-50 */,
          foreground: "var(--color-surface-foreground)" /* gray-900 */,
        },
        "text-primary": "var(--color-text-primary)" /* gray-900 */,
        "text-secondary": "var(--color-text-secondary)" /* gray-500 */,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-cta": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-cta": "pulse-cta 3s ease-in-out infinite",
      },
      boxShadow: {
        cta: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      },
      transitionDuration: {
        smooth: "200ms",
        card: "300ms",
      },
      transitionTimingFunction: {
        smooth: "ease-out",
        card: "ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
