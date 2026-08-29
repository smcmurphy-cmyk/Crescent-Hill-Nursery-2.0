import React, { useState, useMemo } from 'react';
import { Plant, Page } from '../types';
import { MOCK_PLANTS } from '../constants';
import { Search, Sun, Droplets, X, Sparkles, ArrowRight } from 'lucide-react';
import { PlantDetailView } from './PlantDetailView';

interface PlantCatalogProps {
  selectedPlantId?: string | null;
  onSelectPlantId?: (id: string | null) => void;
  onNavigatePage?: (page: Page) => void;
}

export const PlantCatalog: React.FC<PlantCatalogProps> = ({
  selectedPlantId,
  onSelectPlantId,
  onNavigatePage
}) => {
  // Initialize filter as empty string to show all plants by default
  const [filter, setFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [internalSelectedPlant, setInternalSelectedPlant] = useState<Plant | null>(null);

  // If a selectedPlantId prop is passed, find that plant
  const activePlant = useMemo(() => {
    if (selectedPlantId) {
      return MOCK_PLANTS.find(p => p.id === selectedPlantId) || null;
    }
    return internalSelectedPlant;
  }, [selectedPlantId, internalSelectedPlant]);

  const handleSelectPlant = (plant: Plant | null) => {
    if (onSelectPlantId) {
      onSelectPlantId(plant ? plant.id : null);
    }
    setInternalSelectedPlant(plant);
  };

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredPlants = useMemo(() => {
    return MOCK_PLANTS.filter(plant => {
      // If no letter filter is active (empty string), show all that match search
      const matchesLetter = filter === '' || plant.name.toUpperCase().startsWith(filter);
      const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            plant.botanicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (plant.commonName ? plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) : false);
      return matchesLetter && matchesSearch;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [filter, searchTerm]);

  const handleLetterClick = (letter: string) => {
    // Toggle filter: if same letter is clicked, clear the filter
    setFilter(prev => prev === letter ? '' : letter);
  };

  // If a plant is active/selected, display the full plant page format as shown in the screenshot
  if (activePlant) {
    return (
      <PlantDetailView
        plant={activePlant}
        onBack={() => handleSelectPlant(null)}
        onSelectPlant={(newPlant) => handleSelectPlant(newPlant)}
        onNavigatePage={onNavigatePage}
        onContactClick={() => onNavigatePage?.(Page.CONTACT)}
      />
    );
  }

  return (
    <div className="bg-[#fbf9f5] py-10 px-4 sm:px-6 lg:px-8 min-h-screen text-[#2a2926]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#8c562c] uppercase tracking-widest bg-[#f2ebd9] px-3.5 py-1.5 rounded-full border border-[#ded5c3]">
            Comprehensive Nursery Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1c3e17] mt-3 mb-3">
            A–Z Plant Index
          </h2>
          <p className="text-[#5f5a4e] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Explore our curated inventory of Mediterranean, Australian, California native, and drought-tolerant varieties. Click any variety to inspect detailed botanical profiles, high-resolution imagery, and container availability.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col lg:flex-row justify-between items-center gap-6 bg-white p-5 rounded-2xl border border-[#ded5c3] shadow-xs">
          {/* Alphabet Grid - Wrapping enabled to avoid scrollbar */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 w-full max-w-2xl">
            <button
              onClick={() => setFilter('')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                filter === ''
                  ? 'bg-[#24491e] text-white shadow-xs'
                  : 'bg-[#f8f5ee] text-[#524e43] hover:bg-[#eae4d4] border border-[#ded5c3]'
              }`}
            >
              ALL
            </button>
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={`px-2.5 py-1.5 min-w-[2.1rem] rounded-md text-xs font-bold transition-all ${
                  filter === letter 
                    ? 'bg-[#24491e] text-white shadow-xs scale-105 z-10' 
                    : 'bg-[#f8f5ee] text-[#524e43] hover:bg-[#eae4d4] border border-[#ded5c3]'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search botanical or common name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#ded5c3] bg-[#fbf9f5] text-[#2a2926] placeholder-[#857f71] focus:outline-none focus:ring-2 focus:ring-[#24491e] focus:border-transparent text-sm transition-all shadow-inner"
            />
            <Search className="absolute left-3.5 top-3 text-[#24491e] h-4 w-4" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-[#857f71] hover:text-[#2a2926]"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-4 px-2 text-xs font-semibold text-[#6e685a]">
          <span>Showing {filteredPlants.length} {filteredPlants.length === 1 ? 'variety' : 'varieties'}{filter ? ` starting with '${filter}'` : ''}</span>
          <span>Click any plant card to open its full profile</span>
        </div>

        {/* List View with Direct Plant Page Click Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlants.map((plant) => (
            <div 
              key={plant.id} 
              onClick={() => handleSelectPlant(plant)}
              className="bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 border border-[#ded5c3] hover:border-[#24491e] cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex gap-4 items-start">
                
                {/* Thumbnail Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-xs shrink-0 bg-[#ebe4d6] border border-[#ded5c3]">
                  <img 
                    src={plant.imageUrl} 
                    alt={plant.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-[#24491e]/85 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {plant.category}
                  </div>
                </div>

                {/* Plant Text Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-bold text-[#8c562c] uppercase tracking-wider">
                      {plant.tag || (plant.waterNeeds === 'Low' ? 'Drought Tolerant' : 'Easy Care')}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif italic font-bold text-[#1c3e17] group-hover:text-[#c25e26] transition-colors leading-snug line-clamp-1">
                    {plant.botanicalName || plant.name}
                  </h3>
                  
                  <p className="text-xs font-serif text-[#d8723c] font-medium mb-1.5 line-clamp-1">
                    {plant.name}
                  </p>
                  
                  <p className="text-[#5f5a4e] text-xs mb-3 line-clamp-2 leading-relaxed">
                    {plant.description}
                  </p>
                </div>
              </div>

              {/* Card Footer with Specs and Link */}
              <div className="mt-3 pt-3 border-t border-[#f0ebd9] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-[#6e685a]">
                  <div className="flex items-center gap-1">
                    <Sun size={13} className="text-amber-500" />
                    <span>{plant.sunNeeds}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets size={13} className="text-blue-500" />
                    <span>{plant.waterNeeds}</span>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#24491e] group-hover:text-[#c25e26] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
                  Open Plant Page <ArrowRight size={13} />
                </span>
              </div>

            </div>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#ded5c3] border-dashed">
            <p className="text-xl text-[#6e685a] font-serif">
              {filter ? `No plants found starting with "${filter}".` : "No plants match your search."}
            </p>
            <button 
              onClick={() => {setFilter(''); setSearchTerm('');}}
              className="mt-4 px-6 py-2 bg-[#24491e] hover:bg-[#1a3516] text-white rounded-full font-bold transition-colors shadow-xs"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
