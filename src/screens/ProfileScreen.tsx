import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { 
  Settings,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
  Edit3,
  TreePine,
  Coffee,
  Recycle,
  Wind,
  X,
  Check,
  Moon,
  Globe,
  Mail,
  Camera,
  Upload,
  User
} from 'lucide-react';
import { impactMetrics } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export const ProfileScreen: React.FC = () => {
  const { setActiveTab, user, updateUserAvatar, setIsModalOpen } = useApp();
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track modal state for navbar visibility
  const openModal = (setter: (v: boolean) => void) => {
    setIsModalOpen(true);
    setter(true);
  };

  const closeModal = (setter: (v: boolean) => void) => {
    setIsModalOpen(false);
    setter(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserAvatar(reader.result as string);
        closeModal(setShowAvatarEdit);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would use the device camera
    // For demo, we'll use a random avatar
    const randomId = Math.floor(Math.random() * 1000);
    updateUserAvatar(`https://images.unsplash.com/photo-${1500000000000 + randomId}?w=200&h=200&fit=crop&crop=face`);
    closeModal(setShowAvatarEdit);
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

  const menuItems = [
    { 
      icon: Settings, 
      label: 'Settings', 
      hasArrow: true, 
      onClick: () => openModal(setShowSettings),
      badge: undefined 
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      hasArrow: true, 
      onClick: () => openModal(setShowNotifications),
      badge: '3' 
    },
    { 
      icon: Shield, 
      label: 'Privacy & Security', 
      hasArrow: true, 
      onClick: () => openModal(setShowPrivacy),
      badge: undefined 
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      hasArrow: true, 
      onClick: () => openModal(setShowHelp),
      badge: undefined 
    },
  ];

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
        <h1 className="text-lg font-bold text-forest">Profile</h1>
        <button 
          onClick={() => openModal(setShowSettings)}
          className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center active:scale-95 transition-transform"
        >
          <Settings className="w-5 h-5 text-forest" />
        </button>
      </motion.div>

      <div className="px-5 space-y-5">
        {/* Profile Card */}
        <motion.div variants={itemVariants}>
          <Card padding="lg" className="relative">
            <button 
              onClick={() => openModal(setShowSettings)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sage/50 flex items-center justify-center active:scale-95 transition-transform"
            >
              <Edit3 className="w-4 h-4 text-forest" />
            </button>
            
            <div className="flex flex-col items-center">
              <div className="relative">
                <button 
                  onClick={() => openModal(setShowAvatarEdit)}
                  className="relative group"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-sage shadow-card">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Edit overlay */}
                  <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-forest flex items-center justify-center border-2 border-white">
                    <Edit3 className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-forest mt-4">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">{user.membershipLevel}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="text-sm text-leaf-dark font-medium">{user.progressToNextLevel}% to Gold</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setActiveTab('home')}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-card active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="text-lg font-bold text-forest">{user.cupsSaved}</p>
                <p className="text-xs text-muted-foreground">Cups Saved</p>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('rewards')}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-card active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center">
                <TreePine className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="text-lg font-bold text-forest">{user.treesPlanted}</p>
                <p className="text-xs text-muted-foreground">Trees Planted</p>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('home')}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-card active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center">
                <Recycle className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="text-lg font-bold text-forest">{impactMetrics.plasticSaved}kg</p>
                <p className="text-xs text-muted-foreground">Plastic Saved</p>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('home')}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-card active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center">
                <Wind className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="text-lg font-bold text-forest">{impactMetrics.co2Reduced}kg</p>
                <p className="text-xs text-muted-foreground">CO2 Reduced</p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Sustainability Score */}
        <motion.div variants={itemVariants}>
          <button 
            onClick={() => setActiveTab('rewards')}
            className="w-full"
          >
            <Card variant="gradient" padding="lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white/70 text-sm">Total Impact Score</span>
                  <p className="text-3xl font-bold text-white mt-1">
                    {user.sustainabilityScore.toLocaleString()}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <TreePine className="w-8 h-8 text-white" />
                </div>
              </div>
            </Card>
          </button>
        </motion.div>

        {/* Menu Items */}
        <motion.div variants={itemVariants} className="space-y-2">
          {menuItems.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.div variants={itemVariants}>
          <Button 
            variant="outline" 
            fullWidth 
            leftIcon={<LogOut className="w-4 h-4" />}
            onClick={() => openModal(setShowLogoutConfirm)}
          >
            Sign Out
          </Button>
        </motion.div>

        {/* App Version */}
        <motion.div variants={itemVariants} className="text-center">
          <span className="text-xs text-muted-foreground">GreenSpark v1.0.0</span>
        </motion.div>
      </div>

      {/* Avatar Edit Modal */}
      <AnimatePresence>
        {showAvatarEdit && (
          <Modal onClose={() => closeModal(setShowAvatarEdit)} title="Edit Profile Photo">
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center gap-4 p-4 bg-sage/30 rounded-2xl active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <Upload className="w-6 h-6 text-forest" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-forest">Upload Photo</p>
                  <p className="text-sm text-muted-foreground">Choose from gallery</p>
                </div>
              </button>
              <button
                onClick={handleCameraCapture}
                className="w-full flex items-center gap-4 p-4 bg-sage/30 rounded-2xl active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <Camera className="w-6 h-6 text-forest" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-forest">Take Photo</p>
                  <p className="text-sm text-muted-foreground">Use camera</p>
                </div>
              </button>
              <button
                onClick={() => {
                  updateUserAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`);
                  closeModal(setShowAvatarEdit);
                }}
                className="w-full flex items-center gap-4 p-4 bg-sage/30 rounded-2xl active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <User className="w-6 h-6 text-forest" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-forest">Random Avatar</p>
                  <p className="text-sm text-muted-foreground">Generate new avatar</p>
                </div>
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <Modal onClose={() => closeModal(setShowSettings)} title="Settings">
            <div className="space-y-4">
              <ToggleItem 
                icon={Moon} 
                label="Dark Mode" 
                enabled={darkMode} 
                onToggle={() => setDarkMode(!darkMode)} 
              />
              <ToggleItem 
                icon={Globe} 
                label="Language" 
                value="English" 
                onClick={() => {}}
              />
              <MenuRow icon={Mail} label="Email Preferences" onClick={() => {}} />
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotifications && (
          <Modal onClose={() => closeModal(setShowNotifications)} title="Notifications">
            <div className="space-y-4">
              <ToggleItem 
                icon={Bell} 
                label="Push Notifications" 
                enabled={notificationsEnabled} 
                onToggle={() => setNotificationsEnabled(!notificationsEnabled)} 
              />
              <div className="bg-sage/30 rounded-2xl p-4">
                <p className="text-sm text-muted-foreground">You have 3 unread notifications</p>
                <div className="mt-3 space-y-2">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-sm font-medium text-forest">New reward available!</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-sm font-medium text-forest">Tree planted successfully</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-sm font-medium text-forest">Weekly impact report</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <Modal onClose={() => closeModal(setShowPrivacy)} title="Privacy & Security">
            <div className="space-y-4">
              <MenuRow icon={Shield} label="Change Password" onClick={() => {}} />
              <MenuRow icon={Globe} label="Location Services" onClick={() => {}} />
              <ToggleItem 
                icon={Check} 
                label="Share Impact Publicly" 
                enabled={true} 
                onToggle={() => {}} 
              />
              <div className="p-4 bg-sage/30 rounded-2xl">
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and secure. We never share your personal information with third parties.
                </p>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <Modal onClose={() => closeModal(setShowHelp)} title="Help & Support">
            <div className="space-y-4">
              <MenuRow icon={HelpCircle} label="FAQ" onClick={() => {}} />
              <MenuRow icon={Mail} label="Contact Support" onClick={() => {}} />
              <MenuRow icon={Globe} label="Visit Website" onClick={() => window.open('https://greenspark.eco', '_blank')} />
              <div className="p-4 bg-sage/30 rounded-2xl">
                <p className="text-sm font-medium text-forest mb-1">Need help?</p>
                <p className="text-sm text-muted-foreground">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Logout Confirmation */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5"
            onClick={() => closeModal(setShowLogoutConfirm)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-sage/50 flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-forest" />
              </div>
              <h3 className="text-xl font-bold text-forest mb-2">Sign Out?</h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => closeModal(setShowLogoutConfirm)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={() => {
                    closeModal(setShowLogoutConfirm);
                    alert('Signed out successfully!');
                  }}
                >
                  Sign Out
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function MenuItem({ icon: Icon, label, hasArrow, badge, onClick }: { 
  icon: React.ElementType; 
  label: string; 
  hasArrow?: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-card transition-all duration-200 active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-forest" />
        </div>
        <span className="font-medium text-forest">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="w-5 h-5 rounded-full bg-forest text-white text-xs font-semibold flex items-center justify-center">
            {badge}
          </span>
        )}
        {hasArrow && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
      </div>
    </button>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-forest">{title}</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-sage/50 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-forest" />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ToggleItem({ icon: Icon, label, enabled, onToggle, value }: { 
  icon: React.ElementType; 
  label: string; 
  enabled?: boolean; 
  onToggle?: () => void;
  value?: string;
  onClick?: () => void;
}) {
  return (
    <div 
      className="flex items-center justify-between p-4 bg-sage/30 rounded-2xl cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
          <Icon className="w-5 h-5 text-forest" />
        </div>
        <span className="font-medium text-forest">{label}</span>
      </div>
      {value ? (
        <span className="text-sm text-muted-foreground">{value}</span>
      ) : (
        <div className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-forest' : 'bg-sage-dark'}`}>
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'left-7' : 'left-1'}`} />
        </div>
      )}
    </div>
  );
}

function MenuRow({ icon: Icon, label, onClick }: { 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-sage/30 rounded-2xl active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
          <Icon className="w-5 h-5 text-forest" />
        </div>
        <span className="font-medium text-forest">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
