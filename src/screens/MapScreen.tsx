import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import {
  MapPin,
  Star,
  Navigation,
  TreePine,
  X,
  Clock,
  ExternalLink
} from 'lucide-react';
import { partnerCafes } from '@/data/mockData';
import type { Cafe } from '@/types';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import logoImage from '@/images/logo.jpeg';

export const MapScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'open' | 'rated' | 'closest'>('open');
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const { setIsModalOpen, user } = useApp();
  const mapRef = useRef<HTMLDivElement>(null);

  const featuredCafe = partnerCafes[0];
  const otherCafes = partnerCafes.slice(1);

  const filters = [
    { id: 'open', label: 'Open Now' },
    { id: 'rated', label: 'Top Rated' },
    { id: 'closest', label: 'Closest' },
  ] as const;

  const handleGetDirections = (cafe: Cafe) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lng}&destination_place_id=${encodeURIComponent(cafe.name)}`;
    window.open(url, '_blank');
  };

  const openCafeModal = (cafe: Cafe) => {
    setIsModalOpen(true);
    setSelectedCafe(cafe);
  };

  const closeCafeModal = () => {
    setIsModalOpen(false);
    setSelectedCafe(null);
  };

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
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-card">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Sustainability Score */}
      <motion.div variants={itemVariants} className="px-5 mb-4">
        <div className="flex items-center gap-2 text-forest">
          <TreePine className="w-5 h-5" />
          <span className="font-semibold">Sustainability Score: {user.sustainabilityScore.toLocaleString()}</span>
        </div>
      </motion.div>

      <div className="px-5 space-y-5">
        {/* Section Title */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-forest" />
          <h2 className="text-lg font-bold text-forest">Nearby Partners in Sofia</h2>
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                activeFilter === filter.id
                  ? 'bg-forest text-white'
                  : 'bg-white text-muted-foreground hover:text-forest'
              )}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* 2D Map View */}
        <motion.div variants={itemVariants}>
          <div
            ref={mapRef}
            className="relative h-64 rounded-3xl overflow-hidden shadow-elevated bg-sage-light"
          >
            {/* Map Background - Sofia street map style */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage-light via-mint to-sage">
              {/* Grid lines representing streets */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-0 right-0 h-px bg-forest" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-forest" />
                <div className="absolute top-3/4 left-0 right-0 h-px bg-forest" />
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-forest" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-forest" />
                <div className="absolute left-3/4 top-0 bottom-0 w-px bg-forest" />
              </div>

              {/* Park areas */}
              <div className="absolute top-4 left-4 w-20 h-16 bg-leaf/20 rounded-2xl" />
              <div className="absolute bottom-8 right-8 w-16 h-12 bg-leaf/20 rounded-xl" />
            </div>

            {/* Cafe Markers */}
            {partnerCafes.map((cafe, index) => {
              // Calculate relative position on the map (simplified)
              const top = 20 + (index * 15) % 60;
              const left = 15 + (index * 20) % 70;

              return (
                <button
                  key={cafe.id}
                  onClick={() => openCafeModal(cafe)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                  style={{ top: `${top}%`, left: `${left}%` }}
                >
                  <div className={cn(
                    'flex flex-col items-center',
                    selectedCafe?.id === cafe.id ? 'scale-125' : ''
                  )}>
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center shadow-elevated transition-colors',
                      cafe.isFeatured ? 'bg-forest' : 'bg-white',
                      selectedCafe?.id === cafe.id && 'ring-4 ring-leaf/50'
                    )}>
                      <CoffeeIcon className={cn(
                        'w-5 h-5',
                        cafe.isFeatured ? 'text-white' : 'text-forest'
                      )} />
                    </div>
                    <div className="mt-1 px-2 py-0.5 bg-white rounded-full shadow-card">
                      <span className="text-xs font-semibold text-forest whitespace-nowrap">{cafe.name}</span>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* User Location */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-50" />
              </div>
              <span className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-forest bg-white/80 px-2 py-0.5 rounded-full">You</span>
            </div>

            {/* Map Controls */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white rounded-xl shadow-card flex items-center justify-center hover:bg-sage/50 transition-colors">
                <span className="text-lg font-bold text-forest">+</span>
              </button>
              <button className="w-10 h-10 bg-white rounded-xl shadow-card flex items-center justify-center hover:bg-sage/50 transition-colors">
                <span className="text-lg font-bold text-forest">−</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Partner */}
        <motion.div variants={itemVariants}>
          <Card padding="none" className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={featuredCafe.image}
                alt={featuredCafe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-gold fill-gold" />
                <span className="text-xs font-semibold">{featuredCafe.rating}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Featured Partner
                </span>
                <span className="text-xs text-leaf-dark font-medium bg-sage/50 px-2 py-1 rounded-full">
                  {featuredCafe.distance}
                </span>
              </div>
              <h3 className="text-xl font-bold text-forest mb-1">{featuredCafe.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{featuredCafe.address}</p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {featuredCafe.description}
              </p>
              <Button
                variant="primary"
                fullWidth
                leftIcon={<Navigation className="w-4 h-4" />}
                onClick={() => handleGetDirections(featuredCafe)}
              >
                Get Directions
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Other Cafes List */}
        <motion.div variants={itemVariants} className="space-y-3">
          {otherCafes.map((cafe) => (
            <CafeListItem
              key={cafe.id}
              cafe={cafe}
              onClick={() => openCafeModal(cafe)}
              onDirections={() => handleGetDirections(cafe)}
            />
          ))}
        </motion.div>

        {/* Weekly Impact */}
        <motion.div variants={itemVariants}>
          <Card variant="gradient" padding="lg">
            <h3 className="text-lg font-bold text-white mb-2">Weekly Impact</h3>
            <p className="text-white/80 text-sm mb-4">
              You've saved 12 single-use cups this week.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-white/70 uppercase tracking-wide">Level: Sapling</span>
                <div className="w-32 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                  <div className="w-[65%] h-full bg-leaf-light rounded-full" />
                </div>
              </div>
              <span className="text-sm font-semibold text-white">65% TO OAK</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Cafe Detail Modal */}
      <AnimatePresence>
        {selectedCafe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={closeCafeModal}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full bg-white rounded-t-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-forest">{selectedCafe.name}</h3>
                <button
                  onClick={closeCafeModal}
                  className="w-8 h-8 rounded-full bg-sage/50 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-forest" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="text-sm font-medium">{selectedCafe.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{selectedCafe.isOpen ? 'Open now' : 'Closed'}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-2 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {selectedCafe.address}
              </p>

              <p className="text-sm text-muted-foreground mb-6">
                {selectedCafe.description}
              </p>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  leftIcon={<Navigation className="w-4 h-4" />}
                  onClick={() => handleGetDirections(selectedCafe)}
                >
                  Directions
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCafe.name + ' Sofia')}`, '_blank')}
                >
                  View on Maps
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function CoffeeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}

function CafeListItem({ cafe, onClick, onDirections }: {
  cafe: Cafe;
  onClick: () => void;
  onDirections: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-card cursor-pointer active:scale-[0.98] transition-transform"
    >
      <img
        src={cafe.image}
        alt={cafe.name}
        className="w-14 h-14 rounded-xl object-cover"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-forest truncate">{cafe.name}</h4>
        <p className="text-xs text-muted-foreground truncate">{cafe.address}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Navigation className="w-3 h-3" />
            {cafe.distance}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3 text-gold fill-gold" />
            {cafe.rating}
          </span>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDirections();
        }}
        className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center hover:bg-forest/20 transition-colors"
      >
        <Navigation className="w-5 h-5 text-forest" />
      </button>
    </div>
  );
}
