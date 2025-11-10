import React from "react";
import { motion } from "framer-motion";
import Icon from "../AppIcon";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div className="flex-1">
                <h4 className="font-heading-bold text-foreground mb-2">
                  ⚠️ Pre-Launch Notice
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Platform launching March 2026. Statistics shown are
                  projections, not current data. All metrics including tasks
                  completed, payments to workers, ratings, verified users, and
                  other platform statistics are projected goals for Year 1 and
                  do not represent actual current data.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
