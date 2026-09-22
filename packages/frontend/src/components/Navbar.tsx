import React, { useState } from 'react';
import { Page } from '../types';
import { 
  Menu, 
  X, 
  Phone, 
  ShoppingCart, 
  Instagram, 
  Facebook, 
  MapPin, 
  Calendar, 
  FileText, 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  Truck, 
  Mail,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  cartCount?: number;
  onCartClick?: () => void;
}

export const FramedEmblemLogo: React.FC<{ className?: string; textColor?: string }> = ({ 
  className = "", 
  textColor = "text-stone-900" 
}) => (
  <div className={`flex items-center gap-3.5 ${className}`}>
    {/* Outer gold-brown rectangular frame */}
    <div className="relative border-2 border-[#5c3e23] bg-[#fbf9f4] p-1 sm:p-1.5 rounded-sm shadow-xs flex items-center justify-center shrink-0">
      <svg 
        viewBox="0 0 100 100" 
        className="w-9 h-9 sm:w-11 sm:h-11"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Double circular inner ring */}
        <circle cx="50" cy="50" r="43" stroke="#365829" strokeWidth="2.5" fill="#fbf8f0" />
        <circle cx="50" cy="50" r="39" stroke="#78502d" strokeWidth="1" fill="none" opacity="0.6" />
        
        {/* Soil mound */}
        <path d="M34 76 Q50 72 66 76" stroke="#4e3522" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M38 80 Q50 77 62 80" stroke="#78502d" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Plant Stem */}
        <path d="M50 74 L50 48" stroke="#385829" strokeWidth="3" strokeLinecap="round" />
        
        {/* Botanical leaves */}
        <path d="M50 65 Q31 62 26 51 Q37 53 48 59" fill="#3d6235" stroke="#25401c" strokeWidth="1" />
        <path d="M50 65 Q69 62 74 51 Q63 53 52 59" fill="#4d783b" stroke="#25401c" strokeWidth="1" />
        <path d="M50 57 Q35 49 29 39 Q41 43 49 51" fill="#476f36" stroke="#25401c" strokeWidth="1" />
        <path d="M50 57 Q65 49 71 39 Q59 43 51 51" fill="#588544" stroke="#25401c" strokeWidth="1" />
        
        {/* Banksia/Protea flower cone */}
        <path d="M41 49 C35 41 36 31 45 22 C47 27 46 38 42 49" fill="#b85222" />
        <path d="M59 49 C65 41 64 31 55 22 C53 27 54 38 58 49" fill="#b85222" />
        
        <ellipse cx="50" cy="35" rx="14" ry="17" fill="#d97736" stroke="#8a3a14" strokeWidth="1.2" />
        
        {/* Textured flower scales */}
        <circle cx="50" cy="23" r="1.5" fill="#f8d488" />
        <circle cx="45" cy="27" r="1.5" fill="#f8d488" />
        <circle cx="55" cy="27" r="1.5" fill="#f8d488" />
        <circle cx="41" cy="32" r="1.5" fill="#f8d488" />
        <circle cx="50" cy="31" r="1.5" fill="#fae2a6" />
        <circle cx="59" cy="32" r="1.5" fill="#f8d488" />
        <circle cx="44" cy="37" r="1.5" fill="#f8d488" />
        <circle cx="50" cy="37" r="1.5" fill="#fae2a6" />
        <circle cx="56" cy="37" r="1.5" fill="#f8d488" />
        <circle cx="45" cy="43" r="1.5" fill="#f8d488" />
        <circle cx="55" cy="43" r="1.5" fill="#f8d488" />
        <circle cx="50" cy="47" r="1.2" fill="#fae2a6" />

        {/* Crown pistils */}
        <path d="M44 19 L42 15 M50 18 L50 13 M56 19 L58 15" stroke="#a6441b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>

    {/* Brand typography */}
    <span className={`font-serif font-bold text-xl sm:text-2xl md:text-3xl ${textColor} tracking-tight leading-tight select-none`}>
      Crescent Hill Nursery Inc.
    </span>
  </div>
);

// Backward-compatible Logo export
export const Logo: React.FC<{ size?: string }> = () => <FramedEmblemLogo />;

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, cartCount, onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const INSTAGRAM_URL = "https://www.instagram.com/crescent_hill_nursery_?igsh=NTc4MTIwNjQ2TQ==";
  const FACEBOOK_URL = "https://www.facebook.com/crescenthillnursery/";

  const navLinks = [
    { label: 'Home', value: Page.HOME, icon: Leaf },
    { label: 'Our Plants & Catalog', value: Page.CATALOG, icon: Leaf },
    { label: 'Events & Calendar', value: Page.EVENTS_CALENDAR, icon: Calendar },
    { label: 'Availability List', value: Page.AVAILABILITY, icon: FileText },
    { label: 'About Us', value: Page.ABOUT, icon: Sparkles },
    { label: 'Contact & Directions', value: Page.CONTACT, icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* 1. Top Green Strip (Matching Screenshot) */}
      <div className="bg-[#2a4521] text-white py-1.5 px-4 sm:px-6 lg:px-8 border-b border-black/10 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-3 text-emerald-100/90 text-xs">
            <span className="font-medium">Specializing in Mediterranean, Australian & Rare Native Flora</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Social Icons */}
            <a 
              href={FACEBOOK_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-amber-300 transition-colors p-1"
              aria-label="Facebook"
            >
              <Facebook size={15} />
            </a>
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-amber-300 transition-colors p-1"
              aria-label="Instagram"
            >
              <Instagram size={15} />
            </a>
            <button 
              onClick={() => setPage(Page.CONTACT)} 
              className="text-white hover:text-amber-300 transition-colors p-1"
              title="Location & Directions"
              aria-label="Location"
            >
              <MapPin size={15} />
            </button>
            
            {/* Divider */}
            <span className="text-white/40 font-light select-none">|</span>

            {/* Phone */}
            <a 
              href="tel:8312461128" 
              className="text-white hover:text-amber-300 font-semibold tracking-wide transition-colors"
            >
              (831) 246-1128
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header (Cream background, Framed Logo, Contact Us, Hamburger Menu) */}
      <div className="bg-[#f9f7f2] border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            
            {/* Logo */}
            <div 
              className="cursor-pointer group flex items-center py-2"
              onClick={() => setPage(Page.HOME)}
            >
              <FramedEmblemLogo />
            </div>

            {/* Right Controls: Contact Us button, Menu button */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Contact Us Button (Rust Orange matching mockup) */}
              <button
                onClick={() => setPage(Page.CONTACT)}
                className="bg-[#cb6228] hover:bg-[#b4531e] active:scale-[0.98] text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-2.5 rounded-lg shadow-sm transition-all duration-200 text-sm sm:text-base tracking-wide flex items-center gap-2"
              >
                Contact Us
              </button>

              {/* Hamburger Menu Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 sm:p-2.5 text-stone-800 hover:text-[#cb6228] hover:bg-stone-100/80 rounded-lg focus:outline-none transition-colors ml-1"
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Slide-down / Full Screen Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md bg-[#fdfbf7] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-stone-200 animate-in slide-in-from-right duration-300"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-100/60">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-stone-900">Explore Crescent Hill</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-stone-200/80 text-stone-600 transition-colors"
                aria-label="Close drawer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="p-6 space-y-1.5 flex-1 overflow-y-auto">
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest px-3 mb-2">Main Directory</div>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentPage === link.value;
                return (
                  <button
                    key={link.value}
                    onClick={() => {
                      setPage(link.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left font-medium transition-all group ${
                      isActive 
                        ? 'bg-[#2a4521] text-white shadow-sm' 
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <Icon size={18} className={isActive ? 'text-amber-300' : 'text-stone-400 group-hover:text-[#cb6228]'} />
                      <span className="text-sm font-semibold">{link.label}</span>
                    </div>
                    <ChevronRight size={16} className={`opacity-60 group-hover:translate-x-0.5 transition-transform ${isActive ? 'text-amber-300' : ''}`} />
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer info */}
            <div className="p-6 bg-stone-100 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
                <span>Direct Inquiries:</span>
                <a href="tel:8312461128" className="text-[#cb6228] font-bold hover:underline">(831) 246-1128</a>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
                <span>Central Coast, California</span>
                <span className="text-stone-400">Est. 2001</span>
              </div>
              <div className="flex justify-center gap-6 pt-2 border-t border-stone-200/60">
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-[#1877f2] transition-colors flex items-center gap-1.5 text-xs font-semibold">
                  <Facebook size={16} /> Facebook
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-[#d62976] transition-colors flex items-center gap-1.5 text-xs font-semibold">
                  <Instagram size={16} /> Instagram
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
