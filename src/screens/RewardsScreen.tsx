import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import {
  Award,
  TreePine,
  Leaf,
  X,
  Check,
  MapPin,
  QrCode
} from 'lucide-react';
import { rewards } from '@/data/mockData';
import type { Reward } from '@/types';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import logoImage from '@/images/logo.jpeg';
import { currentUser } from '@/data/mockData';

export const RewardsScreen: React.FC = () => {
  const { setActiveTab, setIsModalOpen, user } = useApp();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

  const openRewardModal = (reward: Reward) => {
    setIsModalOpen(true);
    setSelectedReward(reward);
  };

  const closeRewardModal = () => {
    setIsModalOpen(false);
    setSelectedReward(null);
  };

  const openSuccessModal = () => {
    setIsModalOpen(true);
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setIsModalOpen(false);
    setShowSuccessModal(false);
  };

  const handleRedeem = (reward: Reward) => {
    if (!redeemedRewards.includes(reward.id)) {
      setRedeemedRewards([...redeemedRewards, reward.id]);
      setSuccessMessage(`You've successfully redeemed: ${reward.name}`);
      closeRewardModal();
      setTimeout(() => {
        openSuccessModal();
      }, 100);
    }
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
          <div>
            <span className="text-lg font-bold text-forest">GreenSpark</span>
          </div>
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

      {/* Sustainability Score */}
      <motion.div variants={itemVariants} className="px-5 mb-4">
        <div className="flex items-center gap-2 text-forest">
          <TreePine className="w-5 h-5" />
          <span className="font-semibold">Sustainability Score: {user.sustainabilityScore.toLocaleString()}</span>
        </div>
      </motion.div>

      <div className="px-5 space-y-5">
        {/* Points Card */}
        <motion.div variants={itemVariants}>
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium text-muted-foreground">{user.membershipLevel}</span>
            </div>
            <h2 className="text-4xl font-bold text-forest mb-2">
              {user.earthPoints.toLocaleString()}
            </h2>
            <p className="text-lg text-forest font-medium">EarthPoints</p>
            <p className="text-sm text-muted-foreground mt-2">
              You're making a world of difference. Only 260 points away from becoming a Gold Forest member.
            </p>

            {/* Progress to Gold */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-muted-foreground">Progress to Gold</span>
                <span className="font-semibold text-forest">{user.progressToNextLevel}%</span>
              </div>
              <div className="h-2.5 bg-sage rounded-full overflow-hidden">
                <div className="w-[{user.progressToNextLevel}%] h-full bg-forest rounded-full" style={{ width: `${user.progressToNextLevel}%` }} />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Marketplace Title */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold text-forest">Earth Marketplace</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Curated eco-friendly rewards for your conscious choices.
          </p>
        </motion.div>

        {/* Rewards List */}
        <motion.div variants={itemVariants} className="space-y-4">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              isRedeemed={redeemedRewards.includes(reward.id)}
              onClick={() => openRewardModal(reward)}
            />
          ))}
        </motion.div>

        {/* Plant a Real Tree CTA */}
        <motion.div variants={itemVariants}>
          <Card variant="gradient" padding="lg" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <TreePine className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">Plant a Real Tree</h3>
              <p className="text-white/80 text-sm mb-5">
                For 1,000 EarthPoints, we will plant a native sapling in the Amazon basin and send you its GPS coordinates.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-leaf-light" />
                  <span className="text-white font-bold">1,000 pts</span>
                </div>
                <Button
                  variant="white"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedReward(rewards.find(r => r.id === '4') || null)}
                >
                  Make a Difference
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Reward Detail Modal */}
      <AnimatePresence>
        {selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-end"
            onClick={closeRewardModal}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full bg-white rounded-t-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48">
                <img
                  src={selectedReward.image}
                  alt={selectedReward.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={closeRewardModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-forest" />
                </button>
                {selectedReward.isLimited && (
                  <div className="absolute top-4 left-4 bg-forest text-white text-xs font-semibold px-3 py-1 rounded-full">
                    LIMITED EDITION
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-leaf" />
                  <span className="text-lg font-bold text-forest">{selectedReward.pointsCost} pts</span>
                </div>
                <h3 className="text-2xl font-bold text-forest mb-2">{selectedReward.name}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {selectedReward.description}
                </p>

                {redeemedRewards.includes(selectedReward.id) ? (
                  <div className="bg-sage/50 rounded-2xl p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-forest">Already Redeemed</p>
                        <p className="text-sm text-muted-foreground">Check your email for details</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    fullWidth
                    disabled={currentUser.earthPoints < selectedReward.pointsCost}
                    onClick={() => handleRedeem(selectedReward)}
                  >
                    {currentUser.earthPoints < selectedReward.pointsCost
                      ? `Need ${selectedReward.pointsCost - currentUser.earthPoints} more points`
                      : 'Redeem Now'}
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5"
            onClick={closeSuccessModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 rounded-full bg-leaf/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-leaf" />
              </div>
              <h3 className="text-2xl font-bold text-forest mb-2">Success!</h3>
              <p className="text-muted-foreground mb-6">{successMessage}</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  leftIcon={<MapPin className="w-4 h-4" />}
                  onClick={() => {
                    closeSuccessModal();
                    setActiveTab('map');
                  }}
                >
                  Find Cafes
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  leftIcon={<QrCode className="w-4 h-4" />}
                  onClick={() => {
                    closeSuccessModal();
                    setActiveTab('scan');
                  }}
                >
                  Scan
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function RewardCard({
  reward,
  isRedeemed,
  onClick
}: {
  reward: Reward;
  isRedeemed: boolean;
  onClick: () => void;
}) {
  const { user } = useApp();
  const canAfford = user.earthPoints >= reward.pointsCost;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden shadow-card cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="relative h-44">
        <img
          src={reward.image}
          alt={reward.name}
          className="w-full h-full object-cover"
        />
        {reward.isLimited && (
          <div className="absolute top-3 left-3 bg-forest text-white text-xs font-semibold px-3 py-1 rounded-full">
            LIMITED EDITION
          </div>
        )}
        {isRedeemed && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2">
              <Check className="w-4 h-4 text-forest" />
              <span className="font-semibold text-forest">Redeemed</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <h4 className="text-lg font-bold text-forest mb-1">{reward.name}</h4>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {reward.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-leaf" />
            <span className={cn(
              'font-semibold',
              canAfford ? 'text-forest' : 'text-muted-foreground'
            )}>
              {reward.pointsCost} pts
            </span>
          </div>
          <span className={cn(
            'text-sm font-medium px-3 py-1 rounded-full',
            isRedeemed
              ? 'bg-sage text-forest'
              : canAfford
                ? 'bg-forest text-white'
                : 'bg-sage/50 text-muted-foreground'
          )}>
            {isRedeemed ? 'Claimed' : canAfford ? 'Available' : 'Locked'}
          </span>
        </div>
      </div>
    </div>
  );
}
