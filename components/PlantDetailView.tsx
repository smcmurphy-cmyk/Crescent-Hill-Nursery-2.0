import React, { useState, useEffect } from 'react';
import { Plant, Page, PlantCategory } from '../types';
import { MOCK_PLANTS } from '../constants';
import { 
  Sun, 
  Droplets, 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Mail, 
  Share2, 
  Check, 
  Info, 
  Maximize2,
  Calendar,
  Layers,
  Wind,
  Compass,
  FileDown,
  ExternalLink,
  ChevronLeft,
  ShoppingBag
} from 'lucide-react';

interface PlantDetailViewProps {
  plant: Plant;
  onBack: () => void;
  onSelectPlant?: (plant: Plant) => void;
  onNavigatePage?: (page: Page) => void;
  onContactClick?: () => void;
}

export const PlantDetailView: React.FC<PlantDetailViewProps> = ({
  plant,
  onBack,
  onSelectPlant,
  onNavigatePage,
  onContactClick
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Scroll to top when plant changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImageIndex(0);
  }, [plant.id]);

  // Curated botanical values: Latin name on top, Variety underneath
  const cleanBotanicalName = plant.botanicalName || plant.name;
  const varietyName = plant.name;
  const tag = plant.tag || (plant.waterNeeds === 'Low' ? 'Drought Tolerant' : 'Easy Care');

  // Multi-image gallery for detailed visual inspection
  const gallery = plant.galleryImages && plant.galleryImages.length > 0 
    ? plant.galleryImages 
    : [
        plant.imageUrl,
        `https://picsum.photos/seed/${plant.id}-foliage/1000/800`,
        `https://picsum.photos/seed/${plant.id}-bloom/1000/800`,
        `https://picsum.photos/seed/${plant.id}-landscape/1000/800`,
      ];

  // Specific botanical traits
  const matureSize = plant.matureSize || (
    plant.category === PlantCategory.TREES 
      ? '15–25 ft. H × 12–20 ft. W' 
      : plant.category === PlantCategory.SHRUBS 
        ? '3–6 ft. H × 4–8 ft. W' 
        : '1–3 ft. H × 2–4 ft. W'
  );

  const hardinessZone = plant.hardinessZone || (
    plant.waterNeeds === 'Low' ? 'USDA Zones 9–11 (Hardy to 20°F)' : 'USDA Zones 8–11 (Hardy to 15°F)'
  );

  const bloomTime = plant.bloomTime || (
    plant.category === PlantCategory.PERENNIALS 
      ? 'Spring through Autumn' 
      : 'Late Winter to Spring'
  );

  const soilNeeds = plant.soilNeeds || 'Well-drained, sandy loam, acidic to neutral pH';
  const growthHabit = plant.growthHabit || (
    plant.category === PlantCategory.SHRUBS 
      ? 'Mounding, arching weeping branches' 
      : 'Clumping, upright architectural form'
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-[#fbf9f5] min-h-screen text-[#2a2926] pb-20">
      
      {/* 1. BREADCRUMBS BAR (Matches screenshot beige bar) */}
      <div className="bg-[#ede7db] border-b border-[#ded7ca]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 text-xs sm:text-sm text-[#5a564c] flex items-center gap-1.5 flex-wrap">
          <button 
            onClick={() => onNavigatePage ? onNavigatePage(Page.HOME) : onBack()} 
            className="hover:text-[#1c3e17] font-medium transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-[#8c8677]">/</span>
          <button 
            onClick={onBack} 
            className="hover:text-[#1c3e17] font-medium transition-colors cursor-pointer"
          >
            A–Z Plant Index
          </button>
          <span className="text-[#8c8677]">/</span>
          <span className="font-serif italic font-semibold text-[#1c3e17]">
            {cleanBotanicalName}
          </span>
          {varietyName && varietyName !== cleanBotanicalName && (
            <span className="text-[#686355] font-serif text-xs sm:text-sm font-medium">
              – {varietyName}
            </span>
          )}
        </div>
      </div>

      {/* 2. HERO BANNER (Matches screenshot rich green banner with serif italic title & terracotta subtitle) */}
      <div className="bg-[#24491e] text-white py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 shadow-inner relative overflow-hidden">
        {/* Subtle decorative leaf watermark in background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end pr-8">
          <svg viewBox="0 0 100 100" className="w-96 h-96" fill="currentColor">
            <path d="M50 5 C30 25 10 50 10 75 C10 89 21 100 35 100 C55 100 90 60 90 25 C90 10 80 5 50 5 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
            {/* Pill badge (e.g. Easy Care) */}
            <span className="bg-[#d7ebd2] text-[#1c3e17] px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-tight shadow-xs inline-flex items-center gap-1">
              <Sparkles size={13} className="text-[#2b6823]" />
              {tag}
            </span>
            {/* Category tag */}
            <span className="text-[#c7e4c3] text-sm sm:text-base font-medium">
              {plant.category}
            </span>
          </div>

          {/* Botanical / Latin Name in display serif italic on top */}
          <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#faf8f2] tracking-tight leading-tight drop-shadow-xs">
            {cleanBotanicalName}
          </h1>

          {/* Variety Underneath in Terracotta */}
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#d8723c] font-medium mt-1.5 sm:mt-2">
            {varietyName}
          </p>

          {/* Common Name if distinct */}
          {plant.commonName && plant.commonName !== varietyName && plant.commonName !== cleanBotanicalName && (
            <p className="text-xs sm:text-sm text-[#d7ebd2] font-sans mt-1.5 flex items-center gap-1.5">
              <span className="opacity-80">Common Name:</span>
              <span className="text-white font-semibold">{plant.commonName}</span>
            </p>
          )}
        </div>
      </div>

      {/* 3. MAIN CONTENT: IMAGES BELOW & DETAILED SPECIFICATIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        
        {/* Back navigation & quick actions */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-4 border-b border-[#e8e2d5]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2e5227] hover:text-[#1c3e17] bg-[#f0ebd9] hover:bg-[#e6dfca] px-4 py-2 rounded-lg transition-all"
          >
            <ArrowLeft size={16} /> Back to Plant Collection
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5a564c] hover:text-[#1c3e17] bg-white border border-[#dcd4c3] px-3.5 py-2 rounded-lg hover:bg-stone-50 transition-colors shadow-xs"
              title="Share plant link"
            >
              {copiedLink ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
              {copiedLink ? 'Link Copied' : 'Share'}
            </button>
            <button
              onClick={() => onContactClick ? onContactClick() : onNavigatePage?.(Page.CONTACT)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#c25e26] hover:bg-[#a94f1c] px-4 py-2 rounded-lg transition-colors shadow-xs"
            >
              <Mail size={14} /> Inquire About Availability
            </button>
          </div>
        </div>

        {/* Two-Column Showcase: High-Res Image Gallery + Key Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Visual Gallery ("Images below") */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Featured Image */}
            <div className="relative rounded-2xl overflow-hidden bg-[#ebe4d6] border border-[#ded5c3] shadow-md group aspect-[4/3]">
              <img
                src={gallery[selectedImageIndex] || plant.imageUrl}
                alt={`${cleanBotanicalName} - view ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
              />

              {/* Tag Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="bg-[#1e3e1a]/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Wholesale Grown
                </span>
                {plant.waterNeeds === 'Low' && (
                  <span className="bg-[#d8723c]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Low Water
                  </span>
                )}
              </div>

              {/* Expand to fullscreen button */}
              <button 
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-sm transition-all opacity-80 hover:opacity-100"
                title="View full size photo"
              >
                <Maximize2 size={16} />
              </button>

              {/* Image index badge */}
              <div className="absolute bottom-4 left-4 text-[11px] bg-white/90 text-stone-800 font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                Photo {selectedImageIndex + 1} of {gallery.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all group ${
                    selectedImageIndex === idx 
                      ? 'border-[#24491e] ring-2 ring-[#24491e]/20 scale-102 shadow-sm' 
                      : 'border-[#ded5c3] opacity-75 hover:opacity-100 hover:border-[#8f8574]'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${cleanBotanicalName} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {selectedImageIndex === idx && (
                    <div className="absolute inset-0 bg-[#24491e]/10 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            {/* Photo captions & Nursery note */}
            <div className="p-4 bg-[#f3eee3] rounded-xl border border-[#e2d8c5] text-xs text-[#635f54] flex items-start gap-2.5">
              <Info size={16} className="text-[#8c562c] shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#3b382f]">Nursery Grower Note:</strong> Photographs depict mature field-grown specimens, habit forms, and container stock grown at our Castroville, California facilities. Actual habit may vary depending on local microclimate and soil conditions.
              </p>
            </div>

            {/* About This Plant Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e0d7c5] shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c3e17]">
                  About {varietyName}
                </h2>
                {plant.description.includes('[WE ARE CURRENTLY NOT GROWING THIS PLANT') && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Informational Only · Not Currently Grown
                  </span>
                )}
              </div>

              {plant.description.includes('[WE ARE CURRENTLY NOT GROWING THIS PLANT') && (
                <div className="p-4 bg-[#fff9ed] rounded-xl border border-[#f0debe] text-xs text-[#7e5c1a] flex items-start gap-2.5">
                  <Info size={16} className="text-[#c4841d] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#593e0b]">Cultivar Status Note:</strong> We are currently not growing this plant in our active nursery production cycles. Information and specifications are maintained in our botanical archive for collector reference and horticultural inquiries.
                  </p>
                </div>
              )}

              <div className="prose text-[#4a473e] text-base leading-relaxed space-y-4">
                {/* Main Plant Write-up */}
                <p className="text-base sm:text-lg leading-relaxed text-[#2c2923] font-sans">
                  {plant.description
                    .replace(/\[WE ARE CURRENTLY NOT GROWING THIS PLANT\.\s*FOR INFORMATION ONLY\]\s*/i, '')
                    .trim()}
                </p>

                <p className="text-sm text-[#666155] border-t border-[#ede6d8] pt-4">
                  Adapted to coastal California microclimates and dry Mediterranean conditions. <em>{cleanBotanicalName}</em> performs best with well-draining soil and responds readily to seasonal care.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Specifications & Support */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Specs Matrix */}
            <div className="bg-white rounded-2xl p-6 border border-[#e0d7c5] shadow-xs space-y-5">
              <h2 className="font-serif text-xl font-bold text-[#1c3e17] pb-3 border-b border-[#ede6d8] flex items-center justify-between">
                <span>Botanical Profile</span>
                <span className="text-xs font-sans uppercase font-bold text-[#8c562c] bg-[#f7f0e4] px-2.5 py-1 rounded-md">
                  California Ready
                </span>
              </h2>

              {/* Latin Name and Variety Identification */}
              <div className="bg-[#f5efe4] p-3.5 rounded-xl border border-[#e4dcce] space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8c562c] block">Latin / Botanical Name</span>
                  <span className="font-serif italic font-bold text-base text-[#1c3e17]">{cleanBotanicalName}</span>
                </div>
                <div className="pt-1 border-t border-[#ded5c3]/60">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8c562c] block">Variety / Cultivar</span>
                  <span className="font-serif font-semibold text-sm text-[#d8723c]">{varietyName}</span>
                </div>
                {plant.commonName && plant.commonName !== varietyName && (
                  <div className="pt-1 border-t border-[#ded5c3]/60">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8c562c] block">Common Name</span>
                    <span className="text-xs font-medium text-[#4a473e]">{plant.commonName}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                
                {/* Sun Exposure */}
                <div className="bg-[#fbf9f5] p-3.5 rounded-xl border border-[#ede7dc]">
                  <div className="flex items-center gap-2 text-[#8c562c] font-bold text-xs uppercase tracking-wide mb-1">
                    <Sun size={15} className="text-amber-500" />
                    Sun Exposure
                  </div>
                  <div className="font-bold text-[#2e4d25]">
                    {plant.sunNeeds}
                  </div>
                  <div className="text-[11px] text-[#736e61]">
                    {plant.sunNeeds === 'Full Sun' ? '6+ hours direct sun daily' : 'Filtered or morning sun'}
                  </div>
                </div>

                {/* Water Needs */}
                <div className="bg-[#fbf9f5] p-3.5 rounded-xl border border-[#ede7dc]">
                  <div className="flex items-center gap-2 text-[#8c562c] font-bold text-xs uppercase tracking-wide mb-1">
                    <Droplets size={15} className="text-blue-500" />
                    Water Needs
                  </div>
                  <div className="font-bold text-[#2e4d25]">
                    {plant.waterNeeds} Water
                  </div>
                  <div className="text-[11px] text-[#736e61]">
                    {plant.waterNeeds === 'Low' ? 'Drought hardy once rooted' : 'Regular garden moisture'}
                  </div>
                </div>

                {/* Mature Dimensions */}
                <div className="bg-[#fbf9f5] p-3.5 rounded-xl border border-[#ede7dc]">
                  <div className="flex items-center gap-2 text-[#8c562c] font-bold text-xs uppercase tracking-wide mb-1">
                    <Layers size={15} className="text-emerald-600" />
                    Mature Size
                  </div>
                  <div className="font-bold text-[#2e4d25]">
                    {matureSize}
                  </div>
                  <div className="text-[11px] text-[#736e61]">
                    Height × Canopy Spread
                  </div>
                </div>

                {/* Hardiness */}
                <div className="bg-[#fbf9f5] p-3.5 rounded-xl border border-[#ede7dc]">
                  <div className="flex items-center gap-2 text-[#8c562c] font-bold text-xs uppercase tracking-wide mb-1">
                    <Wind size={15} className="text-teal-600" />
                    Cold Hardiness
                  </div>
                  <div className="font-bold text-[#2e4d25]">
                    {hardinessZone}
                  </div>
                  <div className="text-[11px] text-[#736e61]">
                    Mediterranean suited
                  </div>
                </div>

              </div>

              {/* Additional specs rows */}
              <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-[#f0ebd9]">
                  <span className="text-[#736e61]">Growth Habit</span>
                  <span className="font-semibold text-right text-[#2a2926]">{growthHabit}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#f0ebd9]">
                  <span className="text-[#736e61]">Bloom Season</span>
                  <span className="font-semibold text-right text-[#2a2926]">{bloomTime}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#f0ebd9]">
                  <span className="text-[#736e61]">Soil & Drainage</span>
                  <span className="font-semibold text-right text-[#2a2926]">{soilNeeds}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#736e61]">Foliage Longevity</span>
                  <span className="font-semibold text-right text-[#2a2926]">Evergreen</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. CARE & HORTICULTURAL GUIDELINES */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e0d7c5] shadow-xs space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c3e17]">
              Care & Horticultural Guidelines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[#4a473e]">
              <div className="p-4 bg-[#f8f5ee] rounded-xl border border-[#ded5c3]">
                <strong className="block font-serif text-base text-[#1c3e17] mb-1.5">Watering</strong>
                Water regularly through the first growing season to encourage deep root establishment. After year one, reduce to infrequent deep soaks during dry summer months.
              </div>
              <div className="p-4 bg-[#f8f5ee] rounded-xl border border-[#ded5c3]">
                <strong className="block font-serif text-base text-[#1c3e17] mb-1.5">Pruning</strong>
                Prune lightly in late spring after flowering flushes to maintain graceful mounding shape or remove any stray dead twigs. Avoid heavy shearing into old wood.
              </div>
              <div className="p-4 bg-[#f8f5ee] rounded-xl border border-[#ded5c3]">
                <strong className="block font-serif text-base text-[#1c3e17] mb-1.5">Soil & Mulch</strong>
                Plant in free-draining soil. Apply a 2–3 inch layer of organic bark or gravel mulch around root zone, keeping the mulch clear of the main trunk crown.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. LIGHTBOX MODAL FOR EXPANDED PHOTO INSPECTION */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-sm transition-all"
          >
            ✕
          </button>
          
          <div className="max-w-5xl max-h-[85vh] relative" onClick={e => e.stopPropagation()}>
            <img
              src={gallery[selectedImageIndex] || plant.imageUrl}
              alt={cleanBotanicalName}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-2xl mx-auto"
            />
            <div className="text-center mt-3 text-white space-y-0.5">
              <p className="font-serif italic text-lg sm:text-xl font-bold">{cleanBotanicalName}</p>
              <p className="text-[#e88144] font-serif text-sm sm:text-base font-medium">{varietyName}</p>
              <p className="text-stone-400 text-xs mt-1">
                {plant.commonName && plant.commonName !== varietyName ? `${plant.commonName} · ` : ''}Photo {selectedImageIndex + 1} of {gallery.length}
              </p>
            </div>

            {/* Lightbox Prev / Next */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
