import { createContext, useContext, useState, useCallback } from 'react';
import type { User, TabType, ScanItem } from '@/types';
import { currentUser, scanHistory as initialScanHistory } from '@/data/mockData';

interface AppContextType {
  user: User;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  scanHistory: ScanItem[];
  addScan: (scan: ScanItem) => void;
  showOnboarding: boolean;
  completeOnboarding: () => void;
  sustainabilityScore: number;
  addPoints: (points: number) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  updateUserAvatar: (avatarUrl: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(currentUser);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [scanHistory, setScanHistory] = useState<ScanItem[]>(initialScanHistory);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [sustainabilityScore, setSustainabilityScore] = useState(currentUser.sustainabilityScore);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addScan = useCallback((scan: ScanItem) => {
    setScanHistory(prev => [scan, ...prev]);
    setUser(prev => ({
      ...prev,
      cupsSaved: prev.cupsSaved + 1,
    }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  const addPoints = useCallback((points: number) => {
    setSustainabilityScore(prev => prev + points);
    setUser(prev => ({
      ...prev,
      earthPoints: prev.earthPoints + points,
      sustainabilityScore: prev.sustainabilityScore + points,
    }));
  }, []);

  const updateUserAvatar = useCallback((avatarUrl: string) => {
    setUser(prev => ({
      ...prev,
      avatar: avatarUrl,
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        activeTab,
        setActiveTab,
        scanHistory,
        addScan,
        showOnboarding,
        completeOnboarding,
        sustainabilityScore,
        addPoints,
        isModalOpen,
        setIsModalOpen,
        updateUserAvatar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
