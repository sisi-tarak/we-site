import React, { useEffect, useRef } from "react";

interface ConversionTrackingNavProps {
  className?: string;
  trackingId?: string;
  enableAnalytics?: boolean;
  debugMode?: boolean;
}

interface NavigationEvent {
  type:
    | "navigation_click"
    | "section_view"
    | "audience_change"
    | "cta_interaction"
    | "scroll_progress";
  section?: string;
  audience?: string;
  timestamp: number;
  scrollPosition?: number;
  viewportHeight?: number;
  deviceType: "mobile" | "tablet" | "desktop";
  sessionId: string;
  userId?: string;
}

const ConversionTrackingNav = ({
  className = "",
  trackingId = "we-universal-landing",
  enableAnalytics = true,
  debugMode = false,
}: ConversionTrackingNavProps) => {
  const sessionId = useRef<string>("");
  const lastScrollPosition = useRef<number>(0);
  const sectionViewTimes = useRef<Map<string, number>>(new Map());
  const eventQueue = useRef<NavigationEvent[]>([]);

  // Initialize session
  useEffect(() => {
    sessionId.current = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    if (debugMode) {
      console.log(
        "ConversionTrackingNav initialized with session:",
        sessionId.current
      );
    }
  }, [debugMode]);

  // Device type detection
  const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  };

  // Event tracking function
  const trackEvent = (
    event: Omit<NavigationEvent, "timestamp" | "deviceType" | "sessionId">
  ) => {
    if (!enableAnalytics) return;

    const fullEvent: NavigationEvent = {
      ...event,
      timestamp: Date.now(),
      deviceType: getDeviceType(),
      sessionId: sessionId.current,
    };

    eventQueue.current.push(fullEvent);

    if (debugMode) {
      console.log("Navigation Event Tracked:", fullEvent);
    }

    // Send to analytics service (placeholder for actual implementation)
    sendToAnalytics(fullEvent);
  };

  // Send events to analytics service
  const sendToAnalytics = (event: NavigationEvent) => {
    // Placeholder for actual analytics implementation
    // This would typically send to Google Analytics, Mixpanel, etc.

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event.type, {
        custom_parameter_section: event.section,
        custom_parameter_audience: event.audience,
        custom_parameter_device_type: event.deviceType,
        custom_parameter_session_id: event.sessionId,
      });
    }

    // Store in localStorage for offline analysis
    try {
      const storedEvents = JSON.parse(
        localStorage.getItem("we_navigation_events") || "[]"
      );
      storedEvents.push(event);

      // Keep only last 100 events to prevent storage bloat
      if (storedEvents.length > 100) {
        storedEvents.splice(0, storedEvents.length - 100);
      }

      localStorage.setItem(
        "we_navigation_events",
        JSON.stringify(storedEvents)
      );
    } catch (error) {
      if (debugMode) {
        console.warn("Failed to store navigation event:", error);
      }
    }
  };

  // Track navigation clicks
  useEffect(() => {
    const handleNavigationClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const navLink = target.closest("[data-nav-section]");

      if (navLink) {
        const section = navLink.getAttribute("data-nav-section");
        trackEvent({
          type: "navigation_click",
          section: section || undefined,
        });
      }

      // Track CTA clicks
      const ctaButton = target.closest("[data-cta]");
      if (ctaButton) {
        const ctaType = ctaButton.getAttribute("data-cta");
        trackEvent({
          type: "cta_interaction",
          section: ctaType || "unknown_cta",
        });
      }
    };

    document.addEventListener("click", handleNavigationClick);
    return () => document.removeEventListener("click", handleNavigationClick);
  }, []);

  // Track section views with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;

        if (entry.isIntersecting) {
          // Section entered view
          sectionViewTimes.current.set(sectionId, Date.now());

          trackEvent({
            type: "section_view",
            section: sectionId,
          });
        } else {
          // Section left view - calculate time spent
          const startTime = sectionViewTimes.current.get(sectionId);
          if (startTime) {
            const timeSpent = Date.now() - startTime;
            sectionViewTimes.current.delete(sectionId);

            if (debugMode) {
              console.log(`Time spent in section ${sectionId}: ${timeSpent}ms`);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // Observe all sections
    const sections = document.querySelectorAll(
      '[id^="for-you"], [id^="how-it-works"], [id^="success-stories"], [id^="pricing"], [id^="get-started"]'
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [debugMode]);

  // Track scroll progress
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const scrollPosition = window.pageYOffset;
        const documentHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress =
          documentHeight > 0 ? (scrollPosition / documentHeight) * 100 : 0;

        // Track significant scroll milestones
        const currentMilestone = Math.floor(scrollProgress / 25) * 25; // 0%, 25%, 50%, 75%, 100%
        const lastMilestone =
          Math.floor(
            ((lastScrollPosition.current / documentHeight) * 100) / 25
          ) * 25;

        if (currentMilestone !== lastMilestone && currentMilestone % 25 === 0) {
          trackEvent({
            type: "scroll_progress",
            scrollPosition: currentMilestone,
            viewportHeight: window.innerHeight,
          });
        }

        lastScrollPosition.current = scrollPosition;
      }, 100); // Debounce scroll events
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Track audience changes
  useEffect(() => {
    const handleAudienceChange = (event: CustomEvent) => {
      const { audience } = event.detail;

      trackEvent({
        type: "audience_change",
        audience,
      });
    };

    window.addEventListener(
      "audienceChanged",
      handleAudienceChange as EventListener
    );
    return () =>
      window.removeEventListener(
        "audienceChanged",
        handleAudienceChange as EventListener
      );
  }, []);

  // Batch send events periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (eventQueue.current.length > 0) {
        const eventsToSend = [...eventQueue.current];
        eventQueue.current = [];

        if (debugMode) {
          console.log("Batch sending events:", eventsToSend);
        }

        // Send batch to analytics service
        // This would be implemented based on your analytics provider
      }
    }, 30000); // Send every 30 seconds

    return () => clearInterval(interval);
  }, [debugMode]);

  // Send remaining events on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (eventQueue.current.length > 0) {
        // Use sendBeacon for reliable event sending on page unload
        if (navigator.sendBeacon) {
          const data = JSON.stringify(eventQueue.current);
          navigator.sendBeacon("/api/analytics/navigation", data);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Debug panel (only shown in debug mode)
  if (debugMode) {
    return (
      <div
        className={`fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg z-50 max-w-sm ${className}`}
      >
        <div className="text-sm font-heading-bold text-foreground mb-2">
          Navigation Tracking Debug
        </div>
        <div className="text-xs text-text-secondary space-y-1">
          <div>Session: {sessionId.current.slice(-8)}</div>
          <div>Device: {getDeviceType()}</div>
          <div>Events Queued: {eventQueue.current.length}</div>
          <div>Tracking ID: {trackingId}</div>
        </div>
        <button
          onClick={() => {
            console.log("All tracked events:", eventQueue.current);
            console.log(
              "Stored events:",
              JSON.parse(localStorage.getItem("we_navigation_events") || "[]")
            );
          }}
          className="mt-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded"
        >
          Log Events
        </button>
      </div>
    );
  }

  // Invisible component for production
  return null;
};

export default ConversionTrackingNav;
