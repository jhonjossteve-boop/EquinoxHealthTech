import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Image URLs
const IMAGES = {
  hero: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919567635_870bf374.png',
  diagnostic: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919582758_0f378e82.jpg',
  rehabilitation: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919602194_aac70a52.png',
  cosmetic: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919615670_56703ba5.jpg',
  veterinary: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919629319_1eff1c8a.jpg',
  wearable: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919643434_52a777a5.jpg',
  hospital: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919668236_6325c959.jpg',
  vetClinic: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919690661_650f353e.png',
  sports: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919716623_bd19c002.png',
  research: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919743500_bca1b5f2.png',
  retail: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919763342_cbdbcfee.jpg',
  team: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919792659_17387a0b.png',
  laser: 'https://d64gsuwffb70l.cloudfront.net/6941caf3c38792a8b7385e1b_1765919819643_9468f059.png',
};

// Icons
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17h8M8 17a2 2 0 11-4 0m4 0a2 2 0 10-4 0m12 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0M9 5h6l3 4v8H6V9l3-4z" />
  </svg>
);

const CogIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SupportIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const DollarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Data
const productCategories = [
  { id: 1, name: 'Health Diagnostic Systems', description: 'Imaging, scanning, and predictive analytics for accurate diagnoses', image: IMAGES.diagnostic, industry: 'Healthcare' },
  { id: 2, name: 'Smart Rehabilitation Equipment', description: 'Adaptive therapy tools for recovery and performance enhancement', image: IMAGES.rehabilitation, industry: 'Sports' },
  { id: 3, name: 'Cosmetic Health Devices', description: 'Skin analysis, laser treatments, and non-invasive enhancements', image: IMAGES.cosmetic, industry: 'Healthcare' },
  { id: 4, name: 'Veterinary Health Tools', description: 'Monitoring, diagnostics, and treatment support for animals', image: IMAGES.veterinary, industry: 'Veterinary' },
  { id: 5, name: 'Wearable Health Tech', description: 'Real-time tracking for athletes, patients, and pets', image: IMAGES.wearable, industry: 'Sports' },
  { id: 6, name: 'Health Laser Treatment Systems', description: 'Advanced laser technology for medical and cosmetic applications', image: IMAGES.laser, industry: 'Healthcare' },
];

const industries = [
  { id: 1, name: 'Healthcare Sector', description: 'Hospitals, clinics, diagnostic labs, rehabilitation centers, cosmetic practices, elderly care', image: IMAGES.hospital, icon: <HeartIcon /> },
  { id: 2, name: 'Animal Care', description: 'Veterinary hospitals, pet wellness centers, animal rehabilitation clinics', image: IMAGES.vetClinic, icon: <ShieldIcon /> },
  { id: 3, name: 'Sports & Fitness', description: 'Professional sports clubs, athletic training centers, physical therapy, sports medicine', image: IMAGES.sports, icon: <TargetIcon /> },
  { id: 4, name: 'Research & Education', description: 'Universities, medical schools, AI research labs, innovation hubs', image: IMAGES.research, icon: <BookIcon /> },
  { id: 5, name: 'Retail & Distribution', description: 'Medical equipment retlers, e-commerce platforms, B2B distributors', image: IMAGES.retail, icon: <TruckIcon /> },
];

const whyChooseUs = [
  { icon: <GlobeIcon />, title: 'Global Sourcing', description: 'Access to top-tier Health systems from leading manufacturers worldwide' },
  { icon: <TruckIcon />, title: 'Fast Logistics', description: 'Secure and efficient import logistics with reliable delivery timelines' },
  { icon: <CogIcon />, title: 'Customizable Solutions', description: 'Tailored configurations to meet your specific operational needs' },
  { icon: <SupportIcon />, title: 'Technical Support', description: 'Dedicated onboarding and ongoing technical assistance' },
  { icon: <DollarIcon />, title: 'Transparent Pricing', description: 'Clear partnership terms with no hidden costs or surprises' },
  { icon: <ShieldIcon />, title: 'Quality Assurance', description: 'Rigorous testing and certification for all equipment' },
];

const cultureValues = [
  { icon: <UsersIcon />, title: 'Collaboration', description: 'Cross-functional teamwork drives our success' },
  { icon: <BookIcon />, title: 'Continuous Learning', description: 'We invest in training and development to stay ahead in AI and healthcare' },
  { icon: <HeartIcon />, title: 'Diversity & Inclusion', description: 'We celebrate diverse perspectives and backgrounds' },
  { icon: <TargetIcon />, title: 'Customer-Centricity', description: 'Every decision is made with the end-user in mind' },
];

const benefits = [
  'Health, dental, and vision insurance',
  'Paid time off and holidays',
  'Remote work flexibility',
  'Professional development stipends',
  'Performance-based bonuses',
  'Retirement savings plans',
  'Wellness programs',
  'Mental health support',
];

const partnershipCategories = [
  { name: 'Healthcare Sector', items: ['Hospitals and clinics', 'Diagnostic labs', 'Rehabilitation centers', 'Cosmetic and dermatology practices', 'Elderly care facilities'] },
  { name: 'Animal Care', items: ['Veterinary hospitals', 'Pet wellness centers', 'Animal rehabilitation clinics'] },
  { name: 'Sports & Fitness', items: ['Professional sports clubs', 'Athletic training centers', 'Physical therapy practices', 'Sports medicine clinics'] },
  { name: 'Research & Education', items: ['Universities and medical schools', 'Health and biomedical research labs', 'Innovation hubs and incubators'] },
  { name: 'Retail & Distribution', items: ['Medical equipment retailers', 'E-commerce platforms for health tech', 'B2B distributors and wholesalers'] },
];

const stats = [
  { value: '500+', label: 'Products Distributed' },
  { value: '50+', label: 'Partner Organizations' },
  { value: '15+', label: 'Countries Served' },
  { value: '99%', label: 'Client Satisfaction' },
];

const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', message: '', partnerType: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const filteredProducts = selectedIndustry === 'All' 
    ? productCategories 
    : productCategories.filter(p => p.industry === selectedIndustry);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setContactForm({ name: '', email: '', company: '', message: '', partnerType: '' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
    setTimeout(() => setNewsletterSubmitted(false), 3000);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1a2332]/95 backdrop-blur-md z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00a8a8] to-[#ff6b6b] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Equinox</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-lg">HealthTech</span>
                <span className="text-[#00a8a8] font-light text-lg ml-1">Solutions</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-[#00a8a8]' : 'text-gray-300 hover:text-white'}`}
              >
                Home
              </button>
              <Link
                to="/products"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Products
              </Link>
              {['industries', 'about', 'culture', 'partnerships', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors capitalize ${
                    activeSection === section ? 'text-[#00a8a8]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>


            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1a2332] border-t border-gray-700">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg"
              >
                Home
              </button>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg"
              >
                Products
              </Link>
              {['industries', 'about', 'culture', 'partnerships', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg capitalize"
                >
                  {section}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full mt-4 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white px-6 py-3 rounded-full font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>


      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="EquinoxHealthTech Technology" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/95 via-[#1a2332]/80 to-[#1a2332]/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-[#00a8a8]/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#00a8a8] rounded-full mr-2 animate-pulse"></span>
              <span className="text-[#00a8a8] text-sm font-medium">Leading EquinoxHealthTech Innovation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transforming Healthcare Through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a8a8] to-[#00d4d4]">
                Intelligent Technology
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              EquinoxHealthTech Solutions bridges the gap between cutting-edge technology and practical healthcare delivery, 
              making intelligent equipment accessible to every sector that values precision, efficiency, and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('products')}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white rounded-full font-semibold hover:shadow-xl hover:shadow-[#ff6b6b]/30 transition-all group"
              >
                Explore Solutions
                <ArrowRightIcon />
              </button>
              <button
                onClick={() => scrollToSection('partnerships')}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#00a8a8] text-[#00a8a8] rounded-full font-semibold hover:bg-[#00a8a8] hover:text-white transition-all"
              >
                Become a Partner
              </button>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1a2332] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00a8a8] to-[#00d4d4] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00a8a8] font-semibold text-sm uppercase tracking-wider">Our Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2332] mt-2 mb-4">AI-Powered Product Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of intelligent healthcare equipment designed to revolutionize diagnostics, treatment, and wellness.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['All', 'Healthcare', 'Veterinary', 'Sports'].map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  selectedIndustry === industry
                    ? 'bg-[#00a8a8] text-white shadow-lg shadow-[#00a8a8]/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#00a8a8] text-white text-xs font-medium rounded-full">
                      {product.industry}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a2332] mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center text-[#00a8a8] font-semibold hover:text-[#008888] transition-colors group"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#ff6b6b] font-semibold text-sm uppercase tracking-wider">Who We Serve</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2332] mt-2 mb-4">Industries We Transform</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From hospitals to veterinary clinics, sports facilities to research labs, we provide AI solutions across diverse sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="relative group rounded-2xl overflow-hidden h-80 cursor-pointer"
                onClick={() => scrollToSection('partnerships')}
              >
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332] via-[#1a2332]/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#00a8a8] rounded-lg flex items-center justify-center text-white mr-3">
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{industry.name}</h3>
                  </div>
                  <p className="text-gray-300 text-sm">{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a2332] to-[#2a3342]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00a8a8] font-semibold text-sm uppercase tracking-wider">Our Advantages</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">Why Choose EquinoxHealthTech Solutions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine global expertise with local support to deliver exceptional value to our partners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#00a8a8] to-[#00d4d4] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#00a8a8] font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2332] mt-2 mb-6">Company Overview</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                EquinoxHealthTech Solutions Inc. is a U.S.-based importer and distributor of advanced AI-powered healthcare equipment. 
                We specialize in sourcing innovative systems that enhance diagnostics, treatment, and wellness across multiple industries.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#00a8a8]/10 rounded-xl flex items-center justify-center text-[#00a8a8] mr-4 flex-shrink-0">
                    <GlobeIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a2332] mb-1">Our Mission</h3>
                    <p className="text-gray-600 text-sm">
                      To bridge the gap between cutting-edge technology and practical healthcare delivery, making intelligent equipment accessible to every sector.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#ff6b6b]/10 rounded-xl flex items-center justify-center text-[#ff6b6b] mr-4 flex-shrink-0">
                    <TargetIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a2332] mb-1">Our Vision</h3>
                    <p className="text-gray-600 text-sm">
                      To be the most trusted provider of AI-infused healthcare systems, driving transformation across human and animal care industries worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={IMAGES.team}
                alt="Our Team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#00a8a8] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section id="culture" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#ff6b6b] font-semibold text-sm uppercase tracking-wider">Our Culture</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2332] mt-2 mb-4">What Drives Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At EquinoxHealthTech Solutions Inc., we foster a culture of innovation, integrity, and impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {cultureValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#00a8a8] to-[#00d4d4] rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-bold text-[#1a2332] mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#1a2332] mb-6">Employee Benefits</h3>
                <p className="text-gray-600 mb-6">
                  We offer a competitive and supportive environment with comprehensive benefits designed to help our team thrive.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-[#00a8a8]/10 rounded-full flex items-center justify-center text-[#00a8a8] mr-3 flex-shrink-0">
                        <CheckIcon />
                      </div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#1a2332] to-[#2a3342] rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-4">Join Our Team</h4>
                <p className="text-gray-300 mb-6">
                  We're always looking for talented individuals who share our passion for innovation in healthcare technology.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  View Open Positions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partnerships" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00a8a8] font-semibold text-sm uppercase tracking-wider">Partner With Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2332] mt-2 mb-4">Partnership Opportunities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We actively seek partnerships with organizations that can benefit from AI-enhanced healthcare equipment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {partnershipCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-[#00a8a8]/5 transition-colors border border-gray-100"
              >
                <h3 className="font-bold text-[#1a2332] mb-4 flex items-center">
                  <span className="w-8 h-8 bg-[#00a8a8] text-white rounded-lg flex items-center justify-center text-sm mr-3">
                    {index + 1}
                  </span>
                  {category.name}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#00a8a8] rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">
              We welcome inquiries from industry leaders, startups, and entrepreneurs looking to integrate AI into their service offerings.
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00a8a8] to-[#00d4d4] text-white rounded-full font-semibold hover:shadow-xl hover:shadow-[#00a8a8]/30 transition-all"
            >
              Start Partnership Discussion
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#1a2332] to-[#2a3342]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-[#00a8a8] font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">Contact Us</h2>
              <p className="text-gray-400 mb-8">
                Ready to transform your healthcare operations with AI-powered solutions? Reach out to our team today.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00a8a8]/20 rounded-xl flex items-center justify-center text-[#00a8a8] mr-4">
                    <MailIcon />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Email</div>
                    <a href="mailto:info@equinoxhealthtech.com" className="text-white hover:text-[#00a8a8] transition-colors">
                      info@equinoxhealthtech.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00a8a8]/20 rounded-xl flex items-center justify-center text-[#00a8a8] mr-4">
                    <PhoneIcon />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Phone</div>
                    <a href="tel:+1-800-555-0123" className="text-white hover:text-[#00a8a8] transition-colors">
                      +1 (800) 555-0123
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00a8a8]/20 rounded-xl flex items-center justify-center text-[#00a8a8] mr-4">
                    <LocationIcon />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Address</div>
                    <span className="text-white">San Francisco, CA, USA</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-gray-400 text-sm mb-4">Follow Us</div>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-[#00a8a8] transition-colors">
                    <LinkedInIcon />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-[#00a8a8] transition-colors">
                    <TwitterIcon />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-[#00a8a8] transition-colors">
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a2332] mb-2">Thank You!</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] focus:border-transparent outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] focus:border-transparent outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] focus:border-transparent outline-none transition-all"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Type</label>
                    <select
                      value={contactForm.partnerType}
                      onChange={(e) => setContactForm({ ...contactForm, partnerType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select an option</option>
                      <option value="healthcare">Healthcare Sector</option>
                      <option value="veterinary">Animal Care</option>
                      <option value="sports">Sports & Fitness</option>
                      <option value="research">Research & Education</option>
                      <option value="retail">Retail & Distribution</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00a8a8] focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your needs..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#00a8a8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Stay Updated with EquinoxHealthTech Innovations</h3>
          <p className="text-white/80 mb-8">
            Subscribe to our newsletter for the latest product updates, industry insights, and partnership opportunities.
          </p>
          {newsletterSubmitted ? (
            <div className="bg-white/20 rounded-xl p-4 inline-block">
              <span className="text-white font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl focus:ring-2 focus:ring-white outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#1a2332] text-white rounded-xl font-semibold hover:bg-[#2a3342] transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2332] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00a8a8] to-[#ff6b6b] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Equinox</span>
                </div>
                <div>
                  <span className="font-bold">HealthTech</span>
                  <span className="text-[#00a8a8] font-light ml-1">Solutions</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Bridging cutting-edge AI technology with practical healthcare delivery worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#00a8a8] transition-colors">
                  <LinkedInIcon />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00a8a8] transition-colors">
                  <TwitterIcon />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00a8a8] transition-colors">
                  <InstagramIcon />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Products', 'Industries', 'About Us', 'Culture', 'Partnerships'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-bold mb-6">Products</h4>
              <ul className="space-y-3">
                {['AI Diagnostic Systems', 'Rehabilitation Equipment', 'Cosmetic AI Devices', 'Veterinary Tools', 'Wearable Tech'].map((product) => (
                  <li key={product}>
                    <button
                      onClick={() => scrollToSection('products')}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {product}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-6">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center">
                  <MailIcon />
                  <span className="ml-3">info@equinoxhealthtech.com</span>
                </li>
                <li className="flex items-center">
                  <PhoneIcon />
                  <span className="ml-3">+1 (800) 555-0123</span>
                </li>
                <li className="flex items-center">
                  <LocationIcon />
                  <span className="ml-3">San Francisco, CA, USA</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 EquinoxHealthTech Solutions Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
