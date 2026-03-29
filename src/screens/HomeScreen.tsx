import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card, CardHeader } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { ProgressBar } from '@/components/ui-custom/ProgressBar';
import { ImpactRow } from '@/components/ui-custom/ImpactRow';
import {
  Flame,
  Coffee,
  TreePine,
  Recycle,
  Wind,
  ArrowRight,
  X,
  MapPin
} from 'lucide-react';
import { impactMetrics, nextReward } from '@/data/mockData';
import logoImage from '@/images/logo.jpeg';

export const HomeScreen: React.FC = () => {
  const { sustainabilityScore, setActiveTab, setIsModalOpen, user } = useApp();
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const openModal = (setter: (v: boolean) => void) => {
    setIsModalOpen(true);
    setter(true);
  };

  const closeModal = (setter: (v: boolean) => void) => {
    setIsModalOpen(false);
    setter(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-mint pb-28"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between px-5 pt-12 pb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center">
            <img src={logoImage} alt="GreenSpark Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg font-bold text-forest">GreenSpark</span>
        </div>
        <button
          onClick={() => setActiveTab('profile')}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-card"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </button>
      </motion.div>

      <div className="px-5 space-y-5">
        {/* Daily Streak Card */}
        <motion.div variants={itemVariants}>
          <Card variant="gradient" padding="lg" className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <TreePine className="w-full h-full" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-leaf-light" />
                <span className="text-sm font-medium text-white/90">Daily Streak</span>
              </div>
              <h2 className="text-5xl font-bold text-white mb-2">
                {user.streakDays} days
              </h2>
              <p className="text-white/80 text-sm">
                You're making the planet greener,<br />one cup at a time!
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setActiveTab('map')}
            className="flex flex-col items-center justify-center p-5 bg-white rounded-3xl shadow-card active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-sage/50 flex items-center justify-center mb-3">
              <Coffee className="w-6 h-6 text-forest" />
            </div>
            <span className="text-3xl font-bold text-forest">{user.cupsSaved}</span>
            <span className="text-xs text-muted-foreground mt-1">coffees saved</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className="flex flex-col items-center justify-center p-5 bg-white rounded-3xl shadow-card active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-sage/50 flex items-center justify-center mb-3">
              <TreePine className="w-6 h-6 text-forest" />
            </div>
            <span className="text-3xl font-bold text-forest">{user.treesPlanted}</span>
            <span className="text-xs text-muted-foreground mt-1">trees planted</span>
          </button>
        </motion.div>

        {/* Next Reward - Without Gift Icon */}
        <motion.div variants={itemVariants}>
          <Card padding="lg">
            <h3 className="text-center text-lg font-bold text-forest mb-4">Next Reward</h3>
            <div className="flex justify-center mb-4">
              <ProgressBar
                progress={nextReward.progress}
                variant="circular"
                size="lg"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mb-4">
              TO FREE BEAN PACK
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => openModal(setShowRewardModal)}
            >
              Brew {nextReward.scansNeeded} more to unlock
            </Button>
          </Card>
        </motion.div>

        {/* Your Impact */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader title="Your Impact" />
            <div className="space-y-1">
              <ImpactRow
                icon={Recycle}
                label="PLASTIC SAVED"
                value={`${impactMetrics.plasticSaved}kg`}
                progress={83}
                variant="compact"
              />
              <div className="h-px bg-sage/50" />
              <ImpactRow
                icon={Wind}
                label="CO2 REDUCED"
                value={`${impactMetrics.co2Reduced}kg`}
                progress={65}
                variant="compact"
              />
            </div>
          </Card>
        </motion.div>

        {/* Sofia-Connected Learning Card */}
        <motion.div variants={itemVariants}>
          <div className="relative rounded-3xl overflow-hidden shadow-elevated">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=250&fit=crop"
              alt="Sofia coffee shop"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-leaf-light" />
                <span className="text-xs font-medium text-white/80 uppercase tracking-wide">
                  SOFIA SPOTLIGHT
                </span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                Meet the eco-warriors: Sofia's sustainable coffee scene.
              </h3>
              <p className="text-white/70 text-sm mt-2">
                Discover how local cafes are reducing waste.
              </p>
              <Button
                variant="white"
                size="sm"
                className="mt-3"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => openModal(setShowStoryModal)}
              >
                Read Story
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Sustainability Score */}
        <motion.div variants={itemVariants}>
          <button
            onClick={() => setActiveTab('rewards')}
            className="w-full flex items-center justify-between p-4 bg-white rounded-3xl shadow-card active:scale-[0.98] transition-transform"
          >
            <div>
              <span className="text-xs text-muted-foreground">Sustainability Score</span>
              <p className="text-2xl font-bold text-forest">
                {sustainabilityScore.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-sage/50 flex items-center justify-center">
              <TreePine className="w-6 h-6 text-forest" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Sofia Story Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5"
            onClick={() => closeModal(setShowStoryModal)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-forest">Sofia's Green Coffee Movement</h3>
                <button
                  onClick={() => closeModal(setShowStoryModal)}
                  className="w-8 h-8 rounded-full bg-sage/50 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-forest" />
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=250&fit=crop"
                alt="Sofia eco cafe"
                className="w-full h-40 object-cover rounded-2xl mb-4"
              />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sofia's coffee culture is going green! Our partner cafes across the city
                are leading the charge in sustainable brewing.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                From Fabrica 126's zero-waste initiative to Rainbow Factory's compostable
                packaging, these local heroes are making every cup count for the planet.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By using your reusable cup at any of our 6 Sofia partner locations,
                you're part of a community that's already saved over 50,000 single-use cups
                this year!
              </p>
              <div className="flex items-center gap-2 p-4 bg-sage/30 rounded-2xl mb-4">
                <MapPin className="w-5 h-5 text-forest" />
                <span className="text-sm text-forest font-medium">6 partner cafes in Sofia</span>
              </div>
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  closeModal(setShowStoryModal);
                  setActiveTab('map');
                }}
              >
                Explore Sofia Cafes
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Progress Modal */}
      <AnimatePresence>
        {showRewardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5"
            onClick={() => closeModal(setShowRewardModal)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-sage/50 flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-forest" />
                </div>
                <h3 className="text-xl font-bold text-forest mb-2">Almost There!</h3>
                <p className="text-muted-foreground mb-4">
                  You need {nextReward.scansNeeded} more scans to unlock your Free Bean Pack.
                </p>
                <div className="bg-sage/30 rounded-2xl p-4 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-forest">{nextReward.progress}%</span>
                  </div>
                  <div className="h-3 bg-sage rounded-full overflow-hidden">
                    <div className="h-full bg-forest rounded-full" style={{ width: `${nextReward.progress}%` }} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => closeModal(setShowRewardModal)}
                  >
                    Later
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => {
                      closeModal(setShowRewardModal);
                      setActiveTab('scan');
                    }}
                  >
                    Scan Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
