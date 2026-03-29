import { motion } from 'framer-motion';
import { Card } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { ImpactRow } from '@/components/ui-custom/ImpactRow';
import {
  Coffee,
  TreePine,
  Recycle,
  Droplets,
  Wind,
  Share2,
  Music,
  ChevronLeft
} from 'lucide-react';
import { impactMetrics, weeklyActivity } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export const ImpactScreen: React.FC = () => {
  const { setActiveTab } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const maxScans = Math.max(...weeklyActivity.map(d => d.scans));

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
        <button
          onClick={() => setActiveTab('home')}
          className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-forest" />
        </button>
        <h1 className="text-lg font-bold text-forest">Impact Report</h1>
        <button className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center">
          <Music className="w-5 h-5 text-forest" />
        </button>
      </motion.div>

      <div className="px-5 space-y-5">
        {/* 3D Forest Progress Card */}
        <motion.div variants={itemVariants}>
          <Card variant="gradient" padding="lg" className="relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4">
                <TreePine className="w-16 h-16 text-white" />
              </div>
              <div className="absolute top-8 right-8">
                <TreePine className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-8 left-1/3">
                <TreePine className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="relative z-10 text-center py-4">
              <h2 className="text-2xl font-bold text-white mb-1">
                Your 3D Forest
              </h2>
              <p className="text-white/80 text-lg mb-1">Progress</p>
              <p className="text-white/70 text-sm">
                {impactMetrics.treesPlanted} trees thriving in your<br />virtual sanctuary
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <Card className="flex flex-col items-center justify-center p-5 bg-forest text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{impactMetrics.cupsSaved}</span>
            <span className="text-xs text-white/80 mt-1 uppercase tracking-wide">Cups Saved</span>
          </Card>

          <Card className="flex flex-col items-center justify-center p-5 bg-sage-light">
            <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center mb-3">
              <TreePine className="w-6 h-6 text-forest" />
            </div>
            <span className="text-3xl font-bold text-forest">{impactMetrics.treesPlanted}</span>
            <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Trees Planted</span>
          </Card>
        </motion.div>

        {/* Plastic Saved */}
        <motion.div variants={itemVariants}>
          <ImpactRow
            icon={Recycle}
            label="Plastic Saved"
            value={`${impactMetrics.plasticSaved}kg`}
            subtext="Why it matters: Reducing plastic waste protects our oceans and marine life from microplastic pollution."
            progress={83}
            variant="detailed"
          />
        </motion.div>

        {/* CO2 Reduced */}
        <motion.div variants={itemVariants}>
          <Card className="flex items-start gap-4 p-5">
            <div className="w-12 h-12 rounded-2xl bg-sage/50 flex items-center justify-center flex-shrink-0">
              <Wind className="w-6 h-6 text-forest" />
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">CO2 Reduced</span>
              <p className="text-2xl font-bold text-forest mt-1">{impactMetrics.co2Reduced}kg</p>
              <p className="text-sm text-muted-foreground mt-2">
                Equivalent to a 30-mile car ride carbon footprint.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Water Saved */}
        <motion.div variants={itemVariants}>
          <Card className="flex items-start gap-4 p-5">
            <div className="w-12 h-12 rounded-2xl bg-sage/50 flex items-center justify-center flex-shrink-0">
              <Droplets className="w-6 h-6 text-forest" />
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Water Saved</span>
              <p className="text-2xl font-bold text-forest mt-1">{impactMetrics.waterSaved}L</p>
              <p className="text-sm text-muted-foreground mt-2">
                Enough to fill 2 standard bathtubs to the brim.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Brew Activity */}
        <motion.div variants={itemVariants}>
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-forest">Brew Activity</h3>
                <p className="text-sm text-muted-foreground">Coffee scans over the last 7 days</p>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-forest" />
                <div className="w-2 h-2 rounded-full bg-sage-dark" />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyActivity.map((day) => (
                <div key={day.day} className="flex flex-col items-center flex-1">
                  <div className="w-full flex justify-center">
                    <div
                      className={`w-full max-w-8 rounded-t-lg transition-all duration-500 ${day.isToday ? 'bg-forest' : 'bg-sage-dark/40'
                        }`}
                      style={{
                        height: day.scans > 0 ? `${(day.scans / maxScans) * 80}px` : '4px',
                        minHeight: day.scans > 0 ? '16px' : '4px',
                      }}
                    />
                  </div>
                  <span className={`text-xs mt-2 font-medium ${day.isToday ? 'text-forest' : 'text-muted-foreground'}`}>
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Share Impact */}
        <motion.div variants={itemVariants}>
          <Card variant="gradient" padding="lg">
            <h3 className="text-xl font-bold text-white mb-2">
              Every sip counts.
            </h3>
            <p className="text-white/80 text-sm mb-5">
              You're part of a community that has saved <span className="font-bold text-white">1.2M cups</span> this year alone.
            </p>
            <Button variant="white" fullWidth leftIcon={<Share2 className="w-4 h-4" />}>
              Share My Impact
            </Button>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
