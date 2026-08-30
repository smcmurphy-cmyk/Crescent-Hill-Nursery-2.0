import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { FramedEmblemLogo } from './Navbar';
import { 
  Leaf, 
  Calendar, 
  FileText, 
  Lock, 
  Facebook, 
  Instagram, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Video,
  Upload
} from 'lucide-react';

interface HeroSectionProps {
  setPage: (page: Page) => void;
  setShowPricedModal: (show: boolean) => void;
  FACEBOOK_URL: string;
  INSTAGRAM_URL: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setPage,
  setShowPricedModal,
  FACEBOOK_URL,
  INSTAGRAM_URL
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Autoplay was prevented, retrying with muted:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, []);

  return (
    <div className="relative min-h-[640px] md:min-h-[720px] lg:min-h-[780px] w-full bg-[#142310] overflow-hidden flex items-center">
      
      {/* 1. Background Video Layer - Plays seamlessly on loop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03] transform"
        >
          <source src="/hero-drone.mp4" type="video/mp4" />
          <source src="/paso-robles-hills.webm" type="video/webm" />
          {/* Fallback image if video fails */}
          <img 
            src="/hero-poster.jpg" 
            alt="Crescent Hill Nursery Landscape" 
            className="w-full h-full object-cover" 
          />
        </video>

        {/* 2. Dual Contrast Overlays - keeps video vibrant and moving while ensuring bold white text pops */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-[#0f240b]/20 mix-blend-multiply"></div>
      </div>

      {/* 3. Hero Foreground Content (Bold Bright Lettering & Brand Emblems) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col justify-center items-start">
        
        {/* Brand Eyebrow with Emblem Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md mb-4 sm:mb-5 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e88144] animate-pulse"></span>
          <span className="text-[#f5a76e] font-bold tracking-[0.2em] uppercase text-[11px] sm:text-xs md:text-sm drop-shadow-sm">
            FAMILY OWNED SINCE 2001 · CRESCENT HILL NURSERY, INC.
          </span>
        </div>

        {/* Main Bold Bright Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 sm:mb-8 leading-[1.03] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] max-w-4xl">
          Where Gardens <br />
          <span className="text-[#faf8f2] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">Come to Life</span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-base sm:text-lg md:text-xl text-stone-100 font-medium mb-8 sm:mb-10 max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Expert guidance, thousands of healthy plants, and a passion for helping your garden thrive — right here in your community.
        </p>

        {/* 6 Action Buttons Grid (2 Rows of 3 buttons) */}
        <div className="w-full max-w-4xl space-y-3.5 sm:space-y-4">
          
          {/* Row 1: Shop Plants, Events & Calendar, Availability List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
            
            {/* Button 1: Shop Plants (Forest Green) */}
            <button 
              onClick={() => setPage(Page.CATALOG)}
              className="bg-[#223f1a]/95 hover:bg-[#2e5323] active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-5 py-3.5 rounded-lg border border-[#487838]/60 shadow-xl backdrop-blur-xs flex items-center justify-center sm:justify-start gap-3 transition-all duration-200 group cursor-pointer"
            >
              <Leaf size={20} className="text-emerald-300 group-hover:scale-110 transition-transform" />
              <span className="drop-shadow-xs">Shop Plants</span>
            </button>

            {/* Button 2: Events & Calendar (Terracotta / Burnt Orange) */}
            <button 
              onClick={() => setPage(Page.EVENTS_CALENDAR)}
              className="bg-[#cb6228] hover:bg-[#b4531e] active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-5 py-3.5 rounded-lg shadow-xl border border-amber-400/30 flex items-center justify-center sm:justify-start gap-3 transition-all duration-200 group cursor-pointer"
            >
              <Calendar size={20} className="text-amber-100 group-hover:scale-110 transition-transform" />
              <span className="drop-shadow-xs">Events & Calendar</span>
            </button>

            {/* Button 3: Availability List (Forest Green) */}
            <button 
              onClick={() => setPage(Page.AVAILABILITY)}
              className="bg-[#223f1a]/95 hover:bg-[#2e5323] active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-5 py-3.5 rounded-lg border border-[#487838]/60 shadow-xl backdrop-blur-xs flex items-center justify-center sm:justify-start gap-3 transition-all duration-200 group cursor-pointer"
            >
              <FileText size={20} className="text-emerald-300 group-hover:scale-110 transition-transform" />
              <span className="drop-shadow-xs">Availability List</span>
            </button>

          </div>

          {/* Row 2: Priced Availability, Follow on Facebook, Follow on Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
            
            {/* Button 4: Priced Availability (Dark Slate) */}
            <button 
              onClick={() => setShowPricedModal(true)}
              className="bg-[#1b252f]/95 hover:bg-[#283645] active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-5 py-3.5 rounded-lg border border-white/20 shadow-xl backdrop-blur-xs flex items-center justify-center sm:justify-start gap-3 transition-all duration-200 group cursor-pointer"
            >
              <Lock size={20} className="text-stone-300 group-hover:scale-110 transition-transform" />
              <span className="drop-shadow-xs">Priced Availability</span>
            </button>

            {/* Button 5: Follow on Facebook (Facebook Blue) */}
            <a 
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877f2] hover:bg-[#1569d6] active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-5 py-3.5 rounded-lg shadow-xl border border-blue-400/30 flex items-center justify-center sm:justify-start gap-3 transition-all duration-200 group"
            >
              <Facebook size={20} className="fill-white text-white group-hover:scale-110 transition-transform" />
              <span className="drop-shadow-xs">Follow on Facebook</span>
            </a>

            {/* Button 6: Follow on Instagram (Instagram Gradient) */}
            <a 
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-5 py-3.5 rounded-lg shadow-xl border border-orange-400/30 flex items-center justify-center sm:justify-start gap-3 transition-all duration-200 group"
            >
              <Instagram size={20} className="text-white group-hover:scale-110 transition-transform" />
              <span className="drop-shadow-xs">Follow on Instagram</span>
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};
