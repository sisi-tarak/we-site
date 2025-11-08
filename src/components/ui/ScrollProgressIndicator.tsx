import React, { useState, useEffect } from "react";

interface ScrollProgressIndicatorProps {
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  thickness?: number;
  showPercentage?: boolean;
}

const ScrollProgressIndicator = ({
  className = "",
  position = "top",
  thickness = 3,
  showPercentage = false,
}: ScrollProgressIndicatorProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateScrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    calculateScrollProgress(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPositionStyles = () => {
    const baseStyles = {
      position: "fixed" as const,
      zIndex: 60,
      backgroundColor: "transparent",
    };

    switch (position) {
      case "top":
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          right: 0,
          height: `${thickness}px`,
        };
      case "bottom":
        return {
          ...baseStyles,
          bottom: 0,
          left: 0,
          right: 0,
          height: `${thickness}px`,
        };
      case "left":
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          bottom: 0,
          width: `${thickness}px`,
        };
      case "right":
        return {
          ...baseStyles,
          top: 0,
          right: 0,
          bottom: 0,
          width: `${thickness}px`,
        };
      default:
        return baseStyles;
    }
  };

  const getProgressStyles = () => {
    const baseProgressStyles = {
      background:
        "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
      transition: "all 0.1s ease-out",
      borderRadius:
        position === "left" || position === "right"
          ? "0 2px 2px 0"
          : "0 0 2px 2px",
    };

    switch (position) {
      case "top":
      case "bottom":
        return {
          ...baseProgressStyles,
          width: `${scrollProgress}%`,
          height: "100%",
        };
      case "left":
      case "right":
        return {
          ...baseProgressStyles,
          height: `${scrollProgress}%`,
          width: "100%",
        };
      default:
        return baseProgressStyles;
    }
  };

  return (
    <>
      {/* Progress Bar Container */}
      <div style={getPositionStyles()} className={`${className}`}>
        {/* Background Track */}
        <div
          className="w-full h-full bg-border/30"
          style={{
            backdropFilter: "blur(8px)",
          }}
        />

        {/* Progress Fill */}
        <div style={getProgressStyles()} className="absolute top-0 left-0" />
      </div>

      {/* Optional Percentage Display */}
      {showPercentage && (
        <div
          className="fixed top-20 right-4 z-60 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-sm font-body-medium text-foreground shadow-lg"
          style={{
            opacity: scrollProgress > 5 ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {Math.round(scrollProgress)}%
        </div>
      )}
    </>
  );
};

export default ScrollProgressIndicator;
