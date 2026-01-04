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

// Product redirect links
const PRODUCT_REDIRECTS: Record<number, string> = {
  1: 'https://www.jus.com',
  2: 'https://www.jus2.com',
  3: 'https://www.jus3.com',
  4: 'https://www.jus4.com',
  5: 'https://www.jus5.com',
  6: 'https://www.jus6.com',
  7: 'https://www.jus7.com',
  8: 'https://www.jus8.com',
  9: 'https://www.jus9.com',
  10: 'https://www.jus10.com',
  11: 'https://www.jus11.com',
  12: 'https://www.jus12.com',
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

// Categories, industries, price ranges
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

// Products array (same as yours; truncated here for brevity, you can copy-paste all 12 products)

// ... [Products array is the same as your current code]

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
  const [showFilters, setShowFilters] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filtered products logic (same as your code)
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
      case 'price-low': result.sort((a, b) => a.price.basic - b.price.basic); break;
      case 'price-high': result.sort((a, b) => b.price.basic - a.price.basic); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedIndustry, selectedPriceRange, sortBy]);

  const toggleCompare = (productId: number) => {
    if (compareList.includes(productId)) setCompareList(compareList.filter(id => id !== productId));
    else if (compareList.length < 3) setCompareList([...compareList, productId]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation & Header ... same as your code ... */}

      {/* Product Grid */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}>
            {/* Image & badge ... same as your code ... */}

            {/* Content */}
            <div className="p-6 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-[#00a8a8] bg-[#00a8a8]/10 px-2 py-1 rounded">{product.category}</span>
                <span className="text-xs text-gray-500">{product.industry}</span>
              </div>
              <h3 className="text-xl font-bold text-[#1a2332] mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

              {/* Rating & Price ... same as your code ... */}

              {/* Request Quote Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const url = PRODUCT_REDIRECTS[product.id];
                    if (url) window.location.href = url;
                  }}
                  disabled={!product.inStock}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
