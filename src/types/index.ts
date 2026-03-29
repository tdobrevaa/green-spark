// User Types
export interface User {
  id: string;
  name: string;
  avatar: string;
  sustainabilityScore: number;
  earthPoints: number;
  membershipLevel: 'Seedling' | 'Sapling' | 'Silver Leaf' | 'Gold Forest';
  streakDays: number;
  treesPlanted: number;
  cupsSaved: number;
  progressToNextLevel: number;
}

// Cafe/Partner Types
export interface Cafe {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: string;
  description: string;
  discount?: string;
  isFeatured?: boolean;
  isOpen?: boolean;
  lat: number;
  lng: number;
  address: string;
}

// Impact Metrics Types
export interface ImpactMetrics {
  cupsSaved: number;
  treesPlanted: number;
  plasticSaved: number; // in kg
  co2Reduced: number; // in kg
  waterSaved: number; // in liters
}

// Reward Types
export interface Reward {
  id: string;
  name: string;
  description: string;
  image: string;
  pointsCost: number;
  type: 'product' | 'discount' | 'experience';
  isLimited?: boolean;
  isRedeemed?: boolean;
}

// Activity Types
export interface Activity {
  id: string;
  type: 'scan' | 'tree' | 'reward';
  title: string;
  subtitle: string;
  timestamp: string;
  icon: string;
}

// Navigation Types
export type TabType = 'home' | 'map' | 'scan' | 'rewards' | 'profile';

// Scan History Types
export interface ScanItem {
  id: string;
  name: string;
  image: string;
  timestamp: string;
  pointsEarned: number;
}

// Weekly Activity
export interface WeeklyActivity {
  day: string;
  scans: number;
  isToday?: boolean;
}
