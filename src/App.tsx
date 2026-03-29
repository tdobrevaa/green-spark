import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/navigation/BottomNav';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { MapScreen } from '@/screens/MapScreen';
import { ScannerScreen } from '@/screens/ScannerScreen';
import { RewardsScreen } from '@/screens/RewardsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

function MainContent() {
  const { activeTab, showOnboarding, isModalOpen } = useApp();

  // Show onboarding on first visit
  if (showOnboarding) {
    return <OnboardingScreen />;
  }

  // Render the active screen based on tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'map':
        return <MapScreen />;
      case 'scan':
        return <ScannerScreen />;
      case 'rewards':
        return <RewardsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="relative min-h-screen bg-mint">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      
      {/* Bottom Navigation - Hidden when modals are open or on scanner */}
      {!isModalOpen && activeTab !== 'scan' && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
