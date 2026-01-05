import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Product Images
const PRODUCT_IMAGES = {
  diagnostic: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919582758_0f378e82.jpg',
  rehabilitation: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919602194_aac70a52.png',
  cosmetic: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919615670_56703ba5.jpg',
  veterinary: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919629319_1eff1c8a.jpg',
  wearable: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919643434_52a777a5.jpg',
  laser: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919819643_9468f059.png',
  ultrasound: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765920093147_7a2abfb6.png',
  ecg: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765920107487_d31836fe.jpg',
  surgical: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765920124408_f0376899.jpg',
  bloodAnalysis: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765920142529_1f863537.jpg',
  exoskeleton: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765920170801_1b07d863.png',
  dental: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765920184416_218d5b41.jpg',
  vetXray: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765920213573_18078f54.png',
  sportsTracker: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765920236273_dac9189e.png',
  skinAnalysis: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765920257264_127534e7.png',
  patientMonitor: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765920271592_22d15d2c.jpg',
};

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const CompareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// Product Data
const products = [
  {
    id: 1,
    name: 'AI MRI Scanner Pro',
    category: 'Diagnostic Systems',
    industry: 'Healthcare',
    image: PRODUCT_IMAGES.diagnostic,
    gallery: [PRODUCT_IMAGES.diagnostic, PRODUCT_IMAGES.ultrasound, PRODUCT_IMAGES.patientMonitor],
    price: { basic: 125000, professional: 185000, enterprise: 275000 },
    rating: 4.9,
    reviews: 127,
    description: 'Advanced AI-powered MRI scanner with real-time image analysis and predictive diagnostics capabilities.',
    specifications: {
      'AI Processing': 'Neural Network v4.2',
      'Scan Resolution': '4K Ultra HD',
      'Processing Speed': '< 2 seconds',
      'Connectivity': 'WiFi 6, Ethernet, DICOM',
      'Power': '220V / 50-60Hz',
      'Dimensions': '180 x 220 x 160 cm',
      'Weight': '2,500 kg',
      'Warranty': '5 years',
    },
    useCases: ['Hospital radiology departments', 'Diagnostic imaging centers', 'Research institutions', 'Specialty clinics'],
    features: ['Real-time AI analysis', 'Automated reporting', 'Cloud integration', '3D reconstruction', 'Multi-language support'],
    inStock: true,
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'SmartRehab Exoskeleton',
    category: 'Rehabilitation Equipment',
    industry: 'Sports',
    image: PRODUCT_IMAGES.exoskeleton,
    gallery: [PRODUCT_IMAGES.exoskeleton, PRODUCT_IMAGES.rehabilitation, PRODUCT_IMAGES.sportsTracker],
    price: { basic: 45000, professional: 68000, enterprise: 95000 },
    rating: 4.8,
    reviews: 89,
    description: 'AI-driven rehabilitation exoskeleton for accelerated recovery and performance enhancement.',
    specifications: {
      'AI Processing': 'Adaptive Motion AI',
      'Weight Capacity': 'Up to 120 kg',
      'Battery Life': '8 hours',
      'Connectivity': 'Bluetooth 5.0, WiFi',
      'Power': 'Rechargeable Li-ion',
      'Adjustable Size': 'S to XXL',
      'Weight': '12 kg',
      'Warranty': '3 years',
    },
    useCases: ['Physical therapy centers', 'Sports rehabilitation', 'Elderly care facilities', 'Athletic training'],
    features: ['Adaptive resistance', 'Gait analysis', 'Progress tracking', 'Remote monitoring', 'Customizable programs'],
    inStock: true,
    badge: 'New',
  },
  {
    id: 3,
    name: 'DermaScan AI Pro',
    category: 'Cosmetic AI Devices',
    industry: 'Healthcare',
    image: PRODUCT_IMAGES.skinAnalysis,
    gallery: [PRODUCT_IMAGES.skinAnalysis, PRODUCT_IMAGES.cosmetic, PRODUCT_IMAGES.laser],
    price: { basic: 18000, professional: 28000, enterprise: 42000 },
    rating: 4.7,
    reviews: 156,
    description: 'Professional-grade AI skin analysis system for comprehensive dermatological assessments.',
    specifications: {
      'AI Processing': 'DermAI Engine 3.0',
      'Camera Resolution': '50 MP',
      'Analysis Types': '47 skin conditions',
      'Connectivity': 'WiFi, USB-C',
      'Power': '110-240V',
      'Display': '15" Touch Screen',
      'Weight': '8 kg',
      'Warranty': '2 years',
    },
    useCases: ['Dermatology clinics', 'Cosmetic centers', 'Spa facilities', 'Skincare retailers'],
    features: ['Multi-spectrum imaging', 'Age prediction', 'Treatment recommendations', 'Before/after comparison', 'Client database'],
    inStock: true,
    badge: 'Popular',
  },
  {
    id: 4,
    name: 'VetDiag X-Ray System',
    category: 'Veterinary AI Tools',
    industry: 'Veterinary',
    image: PRODUCT_IMAGES.vetXray,
    gallery: [PRODUCT_IMAGES.vetXray, PRODUCT_IMAGES.veterinary],
    price: { basic: 55000, professional: 78000, enterprise: 110000 },
    rating: 4.9,
    reviews: 73,
    description: 'AI-enhanced veterinary X-ray system with automatic pathology detection for animals of all sizes.',
    specifications: {
      'AI Processing': 'VetAI Diagnostic Suite',
      'Image Resolution': '4K',
      'Animal Size Range': 'Small to Large',
      'Connectivity': 'DICOM, WiFi, Ethernet',
      'Power': '220V / 50-60Hz',
      'Table Size': '120 x 60 cm',
      'Weight': '450 kg',
      'Warranty': '4 years',
    },
    useCases: ['Veterinary hospitals', 'Animal clinics', 'Zoo facilities', 'Research labs'],
    features: ['Auto-positioning', 'Species recognition', 'Fracture detection', 'Organ analysis', 'Growth tracking'],
    inStock: true,
    badge: null,
  },
  {
    id: 5,
    name: 'CardioWatch Elite',
    category: 'Wearable Health Tech',
    industry: 'Sports',
    image: PRODUCT_IMAGES.sportsTracker,
    gallery: [PRODUCT_IMAGES.sportsTracker, PRODUCT_IMAGES.wearable, PRODUCT_IMAGES.ecg],
    price: { basic: 450, professional: 750, enterprise: 1200 },
    rating: 4.6,
    reviews: 342,
    description: 'Professional-grade wearable for continuous cardiac monitoring and athletic performance tracking.',
    specifications: {
      'AI Processing': 'CardioAI Chip',
      'Battery Life': '14 days',
      'Water Resistance': '50m',
      'Connectivity': 'Bluetooth 5.2, NFC',
      'Sensors': 'ECG, SpO2, HR, Temp',
      'Display': '1.4" AMOLED',
      'Weight': '45g',
      'Warranty': '2 years',
    },
    useCases: ['Athletes', 'Cardiac patients', 'Fitness enthusiasts', 'Clinical trials'],
    features: ['24/7 monitoring', 'Arrhythmia detection', 'Sleep analysis', 'Stress tracking', 'Emergency alerts'],
    inStock: true,
    badge: 'Best Value',
  },
  {
    id: 6,
    name: 'LaserPro Treatment System',
    category: 'Cosmetic AI Devices',
    industry: 'Healthcare',
    image: PRODUCT_IMAGES.laser,
    gallery: [PRODUCT_IMAGES.laser, PRODUCT_IMAGES.cosmetic, PRODUCT_IMAGES.skinAnalysis],
    price: { basic: 35000, professional: 52000, enterprise: 78000 },
    rating: 4.8,
    reviews: 98,
    description: 'AI-guided laser treatment system for non-invasive cosmetic and dermatological procedures.',
    specifications: {
      'AI Processing': 'LaserGuide AI',
      'Laser Types': '5 wavelengths',
      'Treatment Area': 'Face & Body',
      'Connectivity': 'WiFi, USB',
      'Power': '220V / 50Hz',
      'Cooling System': 'Integrated',
      'Weight': '85 kg',
      'Warranty': '3 years',
    },
    useCases: ['Medical spas', 'Dermatology clinics', 'Cosmetic surgery centers', 'Wellness centers'],
    features: ['Skin type detection', 'Auto-calibration', 'Treatment protocols', 'Safety interlocks', 'Results tracking'],
    inStock: false,
    badge: null,
  },
  {
    id: 7,
    name: 'UltraSound AI 4D',
    category: 'Diagnostic Systems',
    industry: 'Healthcare',
    image: PRODUCT_IMAGES.ultrasound,
    gallery: [PRODUCT_IMAGES.ultrasound, PRODUCT_IMAGES.diagnostic, PRODUCT_IMAGES.patientMonitor],
    price: { basic: 85000, professional: 125000, enterprise: 180000 },
    rating: 4.9,
    reviews: 112,
    description: '4D ultrasound system with AI-powered image enhancement and automated measurements.',
    specifications: {
      'AI Processing': 'SonoAI 4D Engine',
      'Image Modes': '2D, 3D, 4D, Doppler',
      'Probes Included': '3 specialized',
      'Connectivity': 'DICOM, WiFi, USB',
      'Power': '110-240V',
      'Display': '21.5" HD Monitor',
      'Weight': '120 kg',
      'Warranty': '4 years',
    },
    useCases: ['OB/GYN clinics', 'Cardiology', 'Emergency departments', 'Mobile diagnostics'],
    features: ['Auto-measurements', 'Fetal assessment', 'Cardiac analysis', 'Elastography', 'Tele-ultrasound'],
    inStock: true,
    badge: null,
  },
  {
    id: 8,
    name: 'CardioMonitor Pro',
    category: 'Diagnostic Systems',
    industry: 'Healthcare',
    image: PRODUCT_IMAGES.ecg,
    gallery: [PRODUCT_IMAGES.ecg, PRODUCT_IMAGES.patientMonitor, PRODUCT_IMAGES.wearable],
    price: { basic: 12000, professional: 18000, enterprise: 28000 },
    rating: 4.7,
    reviews: 203,
    description: 'AI-powered ECG and cardiac monitoring system with arrhythmia detection and predictive analytics.',
    specifications: {
      'AI Processing': 'CardioAI Pro',
      'Leads': '12-lead ECG',
      'Analysis Time': '< 10 seconds',
      'Connectivity': 'WiFi, Bluetooth, USB',
      'Power': 'Battery + AC',
      'Display': '10" Touch Screen',
      'Weight': '3.5 kg',
      'Warranty': '3 years',
    },
    useCases: ['Cardiology clinics', 'Emergency rooms', 'Primary care', 'Telemedicine'],
    features: ['AI interpretation', 'Risk scoring', 'Trend analysis', 'Remote monitoring', 'EHR integration'],
    inStock: true,
    badge: null,
  },
  {
  {
  id: 9,
  name: 'SurgiBot Assistant',
  category: 'Diagnostic Systems',
  industry: 'Healthcare',
  image: PRODUCT_IMAGES.surgical,
  gallery: [PRODUCT_IMAGES.surgical, PRODUCT_IMAGES.diagnostic],
  price: { basic: 450000, professional: 650000, enterprise: 950000 },
  rating: 5.0,
  reviews: 34,
  description: 'AI-assisted surgical robot for minimally invasive procedures with precision guidance.',
  specifications: {
    'AI Processing': 'SurgiAI Neural Net',
    'Degrees of Freedom': '7 per arm',
    'Precision': '< 0.1mm',
    'Connectivity': 'Dedicated Network',
    'Power': '380V 3-phase',
    'Footprint': '3 x 3 meters',
    'Weight': '1,800 kg',
    'Warranty': '5 years',
  },
  useCases: ['Surgical centers', 'University hospitals', 'Specialty surgery', 'Training facilities'],
  features: ['Tremor filtering', '3D visualization', 'Haptic feedback', 'Procedure recording', 'AI guidance'],
  inStock: true, // <-- Made available for sales
  badge: 'Premium',
}

    id: 10,
    name: 'HemaAnalyzer AI',
    category: 'Diagnostic Systems',
    industry: 'Healthcare',
    image: PRODUCT_IMAGES.bloodAnalysis,
    gallery: [PRODUCT_IMAGES.bloodAnalysis, PRODUCT_IMAGES.diagnostic],
    price: { basic: 65000, professional: 95000, enterprise: 140000 },
    rating: 4.8,
    reviews: 87,
    description: 'Automated blood analysis system with AI-powered cell classification and anomaly detection.',
    specifications: {
      'AI Processing': 'HemaAI Engine',
      'Parameters': '60+ blood markers',
      'Throughput': '120 samples/hour',
      'Connectivity': 'LIS, WiFi, Ethernet',
      'Power': '220V / 50-60Hz',
      'Sample Volume': '< 100μL',
      'Weight': '180 kg',
      'Warranty': '4 years',
    },
    useCases: ['Clinical laboratories', 'Hospitals', 'Blood banks', 'Research facilities'],
    features: ['Auto-sampling', 'Quality control', 'Reflex testing', 'Delta checks', 'Panic value alerts'],
    inStock: true,
    badge: null,
  },
  {
    id: 11,
    name: 'DentalScan 3D',
    category: 'Diagnostic Systems',
    industry: 'Healthcare',
    image: PRODUCT_IMAGES.dental,
    gallery: [PRODUCT_IMAGES.dental, PRODUCT_IMAGES.diagnostic],
    price: { basic: 42000, professional: 62000, enterprise: 88000 },
    rating: 4.7,
    reviews: 145,
    description: 'AI-powered intraoral scanner with instant 3D modeling and treatment planning capabilities.',
    specifications: {
      'AI Processing': 'DentAI Vision',
      'Scan Accuracy': '< 10 microns',
      'Scan Speed': '< 60 seconds',
      'Connectivity': 'WiFi, USB-C',
      'Power': 'Wireless charging',
      'Display': 'Integrated LED',
      'Weight': '280g (wand)',
      'Warranty': '3 years',
    },
    useCases: ['Dental clinics', 'Orthodontics', 'Prosthodontics', 'Dental labs'],
    features: ['Real-time rendering', 'Caries detection', 'Shade matching', 'Treatment simulation', 'Lab integration'],
    inStock: true,
    badge: null,
  },
  {
    id: 12,
    name: 'VitalStation ICU',
    category: 'Diagnostic Systems',
    industry: 'Healthcare',
    image: PRODUCT_IMAGES.patientMonitor,
    gallery: [PRODUCT_IMAGES.patientMonitor, PRODUCT_IMAGES.ecg, PRODUCT_IMAGES.diagnostic],
    price: { basic: 22000, professional: 35000, enterprise: 52000 },
    rating: 4.9,
    reviews: 178,
    description: 'Comprehensive AI patient monitoring station for ICU and critical care environments.',
    specifications: {
      'AI Processing': 'VitalAI Predictive',
      'Parameters': 'ECG, SpO2, NIBP, Temp, EtCO2',
      'Alarms': 'Multi-level AI alerts',
      'Connectivity': 'HL7, WiFi, Ethernet',
      'Power': 'UPS integrated',
      'Display': '19" Multi-touch',
      'Weight': '12 kg',
      'Warranty': '4 years',
    },
    useCases: ['ICU units', 'Operating rooms', 'Emergency departments', 'Recovery rooms'],
    features: ['Early warning system', 'Trend prediction', 'Central monitoring', 'Mobile alerts', 'EHR sync'],
    inStock: true,
    badge: 'Top Rated',
  },
];

const categories = ['All Categories', 'Diagnostic Systems', 'Rehabilitation Equipment', 'Cosmetic AI Devices', 'Veterinary AI Tools', 'Wearable Health Tech'];
const industries = ['All Industries', 'Healthcare', 'Veterinary', 'Sports', 'Research'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $10,000', min: 0, max: 10000 },
  { label: '$10,000 - $50,000', min: 10000, max: 50000 },
  { label: '$50,000 - $100,000', min: 50000, max: 100000 },
  { label: '$100,000 - $500,000', min: 100000, max: 500000 },
  { label: 'Over $500,000', min: 500000, max: Infinity },
];

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<typeof products[0] | null>(null);
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', company: '', phone: '', quantity: '1', message: '', tier: 'professional' });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      const matchesIndustry = selectedIndustry === 'All Industries' || product.industry === selectedIndustry;
      const matchesPrice = product.price.basic >= selectedPriceRange.min && product.price.basic <= selectedPriceRange.max;
      return matchesSearch && matchesCategory && matchesIndustry && matchesPrice;
    });

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price.basic - b.price.basic);
        break;
      case 'price-high':
        result.sort((a, b) => b.price.basic - a.price.basic);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedIndustry, selectedPriceRange, sortBy]);

  const toggleCompare = (productId: number) => {
    if (compareList.includes(productId)) {
      setCompareList(compareList.filter(id => id !== productId));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, productId]);
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setShowQuoteModal(false);
      setQuoteForm({ name: '', email: '', company: '', phone: '', quantity: '1', message: '', tier: 'professional' });
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  const compareProducts = products.filter(p => compareList.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1a2332]/95 backdrop-blur-md z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00a8a8] to-[#ff6b6b] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-lg">Equinoxhealthtech</span>
                <span className="text-[#00a8a8] font-light text-lg ml-1">Solutions</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Home</Link>
              <Link to="/products" className="text-[#00a8a8] text-sm font-medium">Products</Link>
              <Link to="/#industries" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Industries</Link>
              <Link to="/#about" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">About</Link>
              <Link to="/#contact" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Contact</Link>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              {compareList.length > 0 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="flex items-center px-4 py-2 bg-[#00a8a8]/20 text-[#00a8a8] rounded-full text-sm font-medium hover:bg-[#00a8a8]/30 transition-colors"
                >
                  <CompareIcon />
                  <span className="ml-2">Compare ({compareList.length})</span>
                </button>
              )}
              <Link
                to="/#contact"
                className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all"
              >
                Get Quote
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2">
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1a2332] border-t border-gray-700">
            <div className="px-4 py-4 space-y-2">
              <Link to="/" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg">Home</Link>
              <Link to="/products" className="block px-4 py-3 text-[#00a8a8] bg-gray-700/50 rounded-lg">Products</Link>
              <Link to="/#industries" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg">Industries</Link>
              <Link to="/#contact" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg">Contact</Link>
              {compareList.length > 0 && (
                <button
                  onClick={() => { setShowCompareModal(true); setMobileMenuOpen(false); }}
                  className="w-full mt-2 flex items-center justify-center px-4 py-3 bg-[#00a8a8]/20 text-[#00a8a8] rounded-lg font-medium"
                >
                  <CompareIcon />
                  <span className="ml-2">Compare ({compareList.length})</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a2332] to-[#2a3342] pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">AI Healthcare Equipment Catalog</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore our comprehensive range of AI-powered medical devices and healthcare solutions.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] focus:border-transparent outline-none"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
            >
              <FilterIcon />
              <span className="ml-2">Filters</span>
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none bg-white"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none bg-white"
              >
                {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>

              <select
                value={selectedPriceRange.label}
                onChange={(e) => setSelectedPriceRange(priceRanges.find(r => r.label === e.target.value) || priceRanges[0])}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none bg-white"
              >
                {priceRanges.map(range => <option key={range.label} value={range.label}>{range.label}</option>)}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>

              <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-[#00a8a8] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <GridIcon />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-[#00a8a8] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <ListIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none bg-white text-sm"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none bg-white text-sm"
              >
                {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>

              <select
                value={selectedPriceRange.label}
                onChange={(e) => setSelectedPriceRange(priceRanges.find(r => r.label === e.target.value) || priceRanges[0])}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none bg-white text-sm"
              >
                {priceRanges.map(range => <option key={range.label} value={range.label}>{range.label}</option>)}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none bg-white text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-[#1a2332]">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Product Grid */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${
                viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${viewMode === 'list' ? 'md:w-72 flex-shrink-0' : ''}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full object-cover cursor-pointer ${viewMode === 'list' ? 'h-48 md:h-full' : 'h-56'}`}
                  onClick={() => { setSelectedProduct(product); setSelectedImageIndex(0); }}
                />
                {product.badge && (
                  <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full ${
                    product.badge === 'New' ? 'bg-green-500 text-white' :
                    product.badge === 'Best Seller' ? 'bg-[#ff6b6b] text-white' :
                    product.badge === 'Premium' ? 'bg-purple-600 text-white' :
                    product.badge === 'Popular' ? 'bg-blue-500 text-white' :
                    product.badge === 'Top Rated' ? 'bg-yellow-500 text-white' :
                    'bg-[#00a8a8] text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium">Out of Stock</span>
                  </div>
                )}
                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    compareList.includes(product.id)
                      ? 'bg-[#00a8a8] text-white'
                      : 'bg-white/90 text-gray-600 hover:bg-white'
                  }`}
                >
                  <CompareIcon />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-[#00a8a8] bg-[#00a8a8]/10 px-2 py-1 rounded">{product.category}</span>
                  <span className="text-xs text-gray-500">{product.industry}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1a2332] mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= Math.round(product.rating)} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">{product.rating} ({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Starting at</span>
                  <div className="text-2xl font-bold text-[#1a2332]">{formatPrice(product.price.basic)}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => { setSelectedProduct(product); setSelectedImageIndex(0); }}
                    className="flex-1 px-4 py-2.5 border-2 border-[#00a8a8] text-[#00a8a8] rounded-xl font-medium hover:bg-[#00a8a8] hover:text-white transition-all"
                  >
                    View Details
                  </button>
         
<button
  onClick={() => window.open('https://equinoxhealthtech.online/', '_blank')}
  disabled={!product.inStock}
  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
>
  Request Quote
</button>
``

                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon />
            </div>
            <h3 className="text-xl font-bold text-[#1a2332] mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-[#1a2332]">{selectedProduct.name}</h2>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <CloseIcon />
              </button>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <img
                      src={selectedProduct.gallery[selectedImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    {selectedProduct.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          idx === selectedImageIndex ? 'border-[#00a8a8]' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-[#00a8a8] bg-[#00a8a8]/10 px-3 py-1 rounded-full">{selectedProduct.category}</span>
                    {selectedProduct.badge && (
                      <span className="text-sm font-medium text-[#ff6b6b] bg-[#ff6b6b]/10 px-3 py-1 rounded-full">{selectedProduct.badge}</span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={star <= Math.round(selectedProduct.rating)} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
                  </div>

                  {/* Pricing Tiers */}
                  <div className="mb-6">
                    <h4 className="font-bold text-[#1a2332] mb-3">Pricing Tiers</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="border border-gray-200 rounded-xl p-4 text-center">
                        <div className="text-sm text-gray-500 mb-1">Basic</div>
                        <div className="text-lg font-bold text-[#1a2332]">{formatPrice(selectedProduct.price.basic)}</div>
                      </div>
                      <div className="border-2 border-[#00a8a8] rounded-xl p-4 text-center bg-[#00a8a8]/5">
                        <div className="text-sm text-[#00a8a8] mb-1">Professional</div>
                        <div className="text-lg font-bold text-[#1a2332]">{formatPrice(selectedProduct.price.professional)}</div>
                      </div>
                      <div className="border border-gray-200 rounded-xl p-4 text-center">
                        <div className="text-sm text-gray-500 mb-1">Enterprise</div>
                        <div className="text-lg font-bold text-[#1a2332]">{formatPrice(selectedProduct.price.enterprise)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-bold text-[#1a2332] mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-5 h-5 bg-[#00a8a8]/10 rounded-full flex items-center justify-center text-[#00a8a8] mr-2">
                            <CheckIcon />
                          </div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
            
<button
  onClick={() => window.open('https://equinoxhealthtech.online/', '_blank')}
  disabled={!selectedProduct?.inStock}
  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition-all"
>
  Request Quote
</button>
``

                    <button className="px-6 py-3 border-2 border-[#00a8a8] text-[#00a8a8] rounded-xl font-semibold hover:bg-[#00a8a8] hover:text-white transition-all flex items-center">
                      <DownloadIcon />
                      <span className="ml-2">Brochure</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-[#1a2332] mb-4">Technical Specifications</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">{key}</div>
                      <div className="font-semibold text-[#1a2332]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-[#1a2332] mb-4">Ideal Use Cases</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.useCases.map((useCase, idx) => (
                    <span key={idx} className="px-4 py-2 bg-[#1a2332]/5 text-[#1a2332] rounded-full text-sm">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && compareProducts.length > 0 && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-[#1a2332]">Compare Products ({compareProducts.length})</h2>
              <button onClick={() => setShowCompareModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <CloseIcon />
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-gray-50 rounded-tl-xl">Feature</th>
                    {compareProducts.map((product) => (
                      <th key={product.id} className="p-4 bg-gray-50 last:rounded-tr-xl">
                        <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg mx-auto mb-2" />
                        <div className="font-bold text-[#1a2332]">{product.name}</div>
                        <button
                          onClick={() => toggleCompare(product.id)}
                          className="text-sm text-red-500 hover:underline mt-1"
                        >
                          Remove
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium text-gray-600">Category</td>
                    {compareProducts.map((p) => <td key={p.id} className="p-4 text-center">{p.category}</td>)}
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium text-gray-600">Starting Price</td>
                    {compareProducts.map((p) => <td key={p.id} className="p-4 text-center font-bold text-[#00a8a8]">{formatPrice(p.price.basic)}</td>)}
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium text-gray-600">Rating</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-4 text-center">
                        <div className="flex justify-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon key={star} filled={star <= Math.round(p.rating)} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{p.rating}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium text-gray-600">Availability</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {Object.keys(compareProducts[0].specifications).map((spec) => (
                    <tr key={spec} className="border-b">
                      <td className="p-4 font-medium text-gray-600">{spec}</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="p-4 text-center text-sm">{p.specifications[spec as keyof typeof p.specifications]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {showQuoteModal && quoteProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1a2332]">Request a Quote</h2>
              <button onClick={() => { setShowQuoteModal(false); setQuoteSubmitted(false); }} className="p-2 hover:bg-gray-100 rounded-full">
                <CloseIcon />
              </button>
            </div>

            <div className="p-6">
              {quoteSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a2332] mb-2">Quote Request Submitted!</h3>
                  <p className="text-gray-600">Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <>
                  {/* Product Summary */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                    <img src={quoteProduct.image} alt={quoteProduct.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <h3 className="font-bold text-[#1a2332]">{quoteProduct.name}</h3>
                      <p className="text-sm text-gray-500">{quoteProduct.category}</p>
                    </div>
                  </div>

                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input
                          type="text"
                          required
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={quoteForm.company}
                          onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pricing Tier</label>
                        <select
                          value={quoteForm.tier}
                          onChange={(e) => setQuoteForm({ ...quoteForm, tier: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none bg-white"
                        >
                          <option value="basic">Basic - {formatPrice(quoteProduct.price.basic)}</option>
                          <option value="professional">Professional - {formatPrice(quoteProduct.price.professional)}</option>
                          <option value="enterprise">Enterprise - {formatPrice(quoteProduct.price.enterprise)}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={quoteForm.quantity}
                          onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                      <textarea
                        rows={3}
                        value={quoteForm.message}
                        onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] outline-none resize-none"
                        placeholder="Tell us about your specific needs..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Submit Quote Request
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1a2332] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00a8a8] to-[#ff6b6b] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <span className="font-bold">Equinoxhealthtech</span>
                <span className="text-[#00a8a8] font-light ml-1">Solutions</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Equinoxhealthtech Solutions Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;
