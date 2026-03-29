import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import {
  TreePine,
  Home,
  Map,
  QrCode,
  Gift,
  User,
  Flashlight,
  RefreshCw
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { TabType } from '@/types';
import { cn } from '@/lib/utils';
import logoImage from '@/images/logo.jpeg';
import matchaImage from '@/images/matcha.jpeg';

export const ScannerScreen: React.FC = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setActiveTab, activeTab, addPoints, user, addScan } = useApp();

  // Request camera access
  useEffect(() => {
    const requestCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraPermission('granted');
      } catch (err) {
        console.error('Camera access denied:', err);
        setCameraPermission('denied');
      }
    };

    requestCamera();

    // Cleanup
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  // Simulate QR code detection
  useEffect(() => {
    if (isScanning && cameraPermission === 'granted') {
      const timer = setTimeout(() => {
        // Simulate finding a QR code
        detectQRCode();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isScanning, cameraPermission]);

  const detectQRCode = () => {
    setIsScanning(false);
    setShowSuccess(true);

    // Add points
    addPoints(20);

    // Add to scan history
    addScan({
      id: Date.now().toString(),
      name: 'Oat Matcha',
      image: 'https://images.unsplash.com/photo-1515823664972-6d66e79bc394?w=100&h=100&fit=crop',
      timestamp: 'Just now',
      pointsEarned: 20,
    });

    // Hide success after 2 seconds and restart scanning
    setTimeout(() => {
      setShowSuccess(false);
      setIsScanning(true);
    }, 2500);
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const navItems: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'scan', label: 'Scan', icon: QrCode },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black relative pb-24"
    >
      {/* Camera View - Transparent/Real */}
      <div className="absolute inset-0">
        {cameraPermission === 'granted' ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-10 h-10 text-white/50" />
              </div>
              <p className="text-white/70 mb-2">
                {cameraPermission === 'denied'
                  ? 'Camera access denied'
                  : 'Camera loading...'}
              </p>
              {cameraPermission === 'denied' && (
                <Button
                  variant="white"
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Flash overlay effect */}
        {flashOn && (
          <div className="absolute inset-0 bg-white/20 pointer-events-none" />
        )}
      </div>

      {/* Hidden canvas for QR processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-5 pt-12 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <img src={logoImage} alt="GreenSpark Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-sm text-white/70">Sustainability Score</span>
              <p className="text-lg font-bold text-white">{user.sustainabilityScore.toLocaleString()}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Camera Controls */}
      <div className="absolute top-24 right-4 z-10 flex flex-col gap-3">
        <button
          onClick={toggleFlash}
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors',
            flashOn ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white'
          )}
        >
          <Flashlight className="w-5 h-5" />
        </button>
        <button
          onClick={toggleCamera}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Scanner Frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-72 h-72">
          {/* Corner Markers */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-leaf-light rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-leaf-light rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-leaf-light rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-leaf-light rounded-br-3xl" />

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <TreePine className="w-12 h-12 text-white/50 mx-auto mb-2" />
              <span className="text-white/50 text-sm uppercase tracking-widest">Scanning...</span>
            </motion.div>
          </div>

          {/* Scan Line */}
          {isScanning && (
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-leaf-light shadow-[0_0_10px_rgba(76,175,80,0.8)]"
              animate={{
                top: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 mt-48 text-center px-8">
        <h3 className="text-xl font-bold text-white mb-2">
          Align the QR code on your cup
        </h3>
        <p className="text-white/70 text-sm">
          Position the code within the frame to earn seeds.
        </p>
      </div>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20"
          >
            <Card className="mx-5 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-leaf/20 flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-10 h-10 text-leaf" />
              </div>
              <h3 className="text-2xl font-bold text-forest mb-2">+20 Seeds!</h3>
              <p className="text-muted-foreground mb-4">Oat Matcha scanned successfully</p>
              <div className="w-16 h-16 rounded-xl overflow-hidden mx-auto">
                <img
                  src=""
                  alt="Oat Matcha"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recently Scanned */}
      <div className="absolute bottom-28 left-0 right-0">
        <div className="px-5">
          <h4 className="text-xs font-medium text-white/70 uppercase tracking-wide mb-3">
            Recently Scanned
          </h4>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {/* Oat Matcha Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-3"
            >
              <img
                src={matchaImage}
                alt="Oat Matcha"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <p className="text-white font-medium text-sm">Oat Matcha</p>
                <p className="text-white/60 text-xs">2 mins ago • +20 pts</p>
              </div>
            </motion.div>
            {/* House Blend Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-3"
            >
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100&h=100&fit=crop"
                alt="House Blend"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <p className="text-white font-medium text-sm">House Blend</p>
                <p className="text-white/60 text-xs">1 hour ago • +15 pts</p>
              </div>
            </motion.div>
            {/* Caramel Latte Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-3"
            >
              <img
                src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&h=100&fit=crop"
                alt="Caramel Latte"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <p className="text-white font-medium text-sm">Caramel Latte</p>
                <p className="text-white/60 text-xs">Yesterday • +20 pts</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
        <div className="bg-white/95 backdrop-blur-xl border-t border-sage/50 px-2 py-2">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
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
    </motion.div>
  );
};
