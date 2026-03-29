import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui-custom/Button';
import { Shield, ArrowRight } from 'lucide-react';
import logoImage from '@/images/logo.jpeg';
import cupImage from '@/images/cup.jpeg';

export const OnboardingScreen: React.FC = () => {
  const { completeOnboarding } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-mint flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center">
            <img src={logoImage} alt="GreenSpark Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-semibold text-forest">GreenSpark</span>
        </div>
        <button
          onClick={completeOnboarding}
          className="text-sm font-medium text-forest/70 hover:text-forest transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Cup Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-64 h-80 mb-8"
        >
          <div className="absolute inset-0 bg-white rounded-[3rem] shadow-elevated flex items-center justify-center">
            <img
              src={cupImage}
              alt="Reusable Coffee Cup"
              className="w-48 h-64 object-contain"
            />
          </div>
          {/* QR Code Badge */}
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-xl shadow-card flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h7v7h-7z" />
              <path d="M17 17h1v1h-1z" />
            </svg>
          </div>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 bg-leaf/20 text-forest text-xs font-semibold rounded-full">
            STEP 01
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold text-forest text-center mb-4"
        >
          Scan for a<br />
          <span className="text-leaf-dark">Greener Sip</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center text-muted-foreground leading-relaxed max-w-xs mb-8"
        >
          Visit any partner cafe and scan the QR code with your reusable cup to earn sustainability points instantly.
        </motion.p>

        {/* Pagination Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-2 mb-8"
        >
          <div className="w-8 h-2 bg-forest rounded-full" />
          <div className="w-2 h-2 bg-sage-dark rounded-full" />
          <div className="w-2 h-2 bg-sage-dark rounded-full" />
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-6 pb-8 pt-4"
      >
        <Button
          onClick={completeOnboarding}
          fullWidth
          size="lg"
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Continue Journey
        </Button>

        <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span className="text-xs">Encrypted & Secure Eco-Tracking</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
