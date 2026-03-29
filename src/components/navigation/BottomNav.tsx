import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import type { TabType } from '@/types';
import { Home, Map, QrCode, Gift, User, Scan } from 'lucide-react';

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
  activeIcon?: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'scan', label: 'Scan', icon: QrCode, activeIcon: Scan },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'profile', label: 'Profile', icon: User },
];

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="bg-white/95 backdrop-blur-xl border-t border-sage/50 px-2 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon;
            const isScan = item.id === 'scan';

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200',
                  'min-w-[64px]',
                  isActive && !isScan && 'bg-sage/50',
                  isScan && isActive && 'bg-forest text-white',
                  !isActive && 'text-muted-foreground hover:text-forest',
                  isActive && !isScan && 'text-forest'
                )}
              >
                <div
                  className={cn(
                    'flex items-center justify-center transition-all duration-200',
                    isScan && !isActive && 'w-12 h-12 rounded-full bg-forest text-white -mt-6 shadow-elevated',
                    isScan && isActive && 'w-12 h-12 rounded-full bg-forest text-white -mt-6 shadow-elevated scale-110'
                  )}
                >
                  <Icon
                    className={cn(
                      'transition-all duration-200',
                      isScan ? 'w-6 h-6' : 'w-5 h-5',
                      isActive && 'scale-110'
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                {!isScan && (
                  <span
                    className={cn(
                      'text-xs font-medium transition-all duration-200',
                      isActive ? 'opacity-100' : 'opacity-70'
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
