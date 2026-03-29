import type { User, Cafe, Reward, Activity, ScanItem, WeeklyActivity, ImpactMetrics } from '@/types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Green',
  avatar: new URL('../images/photo.jpg', import.meta.url).href,
  sustainabilityScore: 1240,
  earthPoints: 1240,
  membershipLevel: 'Silver Leaf',
  streakDays: 5,
  treesPlanted: 12,
  cupsSaved: 64,
  progressToNextLevel: 82,
};

export const impactMetrics: ImpactMetrics = {
  cupsSaved: 64,
  treesPlanted: 12,
  plasticSaved: 2.5,
  co2Reduced: 12,
  waterSaved: 150,
};

// Sofia, Bulgaria cafes with real coordinates
export const partnerCafes: Cafe[] = [
  {
    id: '1',
    name: 'Fabrica 126',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    rating: 4.8,
    distance: '0.4 km',
    description: 'Specialty coffee roasters with sustainable practices. Bring your reusable cup for 15% off.',
    discount: '15% off with reusable cup',
    isFeatured: true,
    isOpen: true,
    lat: 42.6977,
    lng: 23.3219,
    address: 'bul. Vitosha 126, Sofia'
  },
  {
    id: '2',
    name: 'Coffee Syndicate',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop',
    rating: 4.6,
    distance: '0.8 km',
    description: 'Artisan coffee with eco-friendly packaging.',
    isOpen: true,
    lat: 42.6947,
    lng: 23.3259,
    address: 'ul. Gladstone 36, Sofia'
  },
  {
    id: '3',
    name: 'Dabov Specialty Coffee',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=200&h=200&fit=crop',
    rating: 4.9,
    distance: '1.2 km',
    description: 'Award-winning specialty coffee roasters.',
    isOpen: true,
    lat: 42.7007,
    lng: 23.3189,
    address: 'ul. Solunska 8, Sofia'
  },
  {
    id: '4',
    name: 'Green Deli Cafe',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=200&h=200&fit=crop',
    rating: 4.4,
    distance: '1.5 km',
    description: 'Organic food and fair trade coffee.',
    isOpen: true,
    lat: 42.6897,
    lng: 23.3249,
    address: 'bul. Bulgaria 69, Sofia'
  },
  {
    id: '5',
    name: 'Chucky\'s Coffee House',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&h=200&fit=crop',
    rating: 4.7,
    distance: '1.9 km',
    description: 'Cozy atmosphere with sustainable coffee sourcing.',
    isOpen: true,
    lat: 42.7027,
    lng: 23.3299,
    address: 'ul. Tsar Shishman 18, Sofia'
  },
  {
    id: '6',
    name: 'Rainbow Factory',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200&h=200&fit=crop',
    rating: 4.5,
    distance: '2.3 km',
    description: 'Third wave coffee with zero-waste initiative.',
    isOpen: false,
    lat: 42.6857,
    lng: 23.3169,
    address: 'ul. Angel Kanchev 4, Sofia'
  },
];

export const rewards: Reward[] = [
  {
    id: '1',
    name: 'Eco-Friendly Coaster Set',
    description: 'Handcrafted from 100% recycled ocean plastic. Each set features unique natural swirls and textures.',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop',
    pointsCost: 500,
    type: 'product',
    isLimited: true,
  },
  {
    id: '2',
    name: 'Free Oat Milk Latte',
    description: 'Valid at any partner Forest Cafe.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop',
    pointsCost: 200,
    type: 'discount',
  },
  {
    id: '3',
    name: '10% Off Your Next Brew',
    description: 'Digital coupon for ethically sourced beans.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
    pointsCost: 150,
    type: 'discount',
  },
  {
    id: '4',
    name: 'Plant a Real Tree',
    description: 'For 1,000 EarthPoints, we will plant a native sapling in the Amazon basin and send you its GPS coordinates.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    pointsCost: 1000,
    type: 'experience',
  },
];

export const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'scan',
    title: 'Oat Matcha',
    subtitle: '2 mins ago',
    timestamp: '2 mins ago',
    icon: 'cup',
  },
  {
    id: '2',
    type: 'scan',
    title: 'House Blend',
    subtitle: '1 hour ago',
    timestamp: '1 hour ago',
    icon: 'cup',
  },
  {
    id: '3',
    type: 'tree',
    title: 'Tree Planted!',
    subtitle: 'Yesterday',
    timestamp: 'Yesterday',
    icon: 'tree',
  },
];

export const scanHistory: ScanItem[] = [
  {
    id: '1',
    name: 'Oat Matcha',
    image: 'https://images.unsplash.com/photo-1515823664972-6d66e79bc394?w=100&h=100&fit=crop',
    timestamp: '2 mins ago',
    pointsEarned: 20,
  },
  {
    id: '2',
    name: 'House Blend',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100&h=100&fit=crop',
    timestamp: '1 hour ago',
    pointsEarned: 15,
  },
  {
    id: '3',
    name: 'Caramel Latte',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&h=100&fit=crop',
    timestamp: 'Yesterday',
    pointsEarned: 20,
  },
];

export const weeklyActivity: WeeklyActivity[] = [
  { day: 'MON', scans: 2 },
  { day: 'TUE', scans: 1 },
  { day: 'WED', scans: 3 },
  { day: 'THU', scans: 0 },
  { day: 'FRI', scans: 2 },
  { day: 'SAT', scans: 1, isToday: true },
  { day: 'SUN', scans: 0 },
];

export const nextReward = {
  name: 'Free Bean Pack',
  progress: 75,
  scansNeeded: 3,
  totalScans: 12,
};
