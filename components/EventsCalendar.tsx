import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Filter, 
  FileText, 
  ArrowLeft, 
  Check, 
  CalendarPlus, 
  Download, 
  Share2, 
  X,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export type EventCategory = 'All' | 'Workshop' | 'Sale' | 'Community' | 'Class' | 'Special Event';

export interface DirectEvent {
  id: string;
  title: string;
  month: string;
  day: string;
  year: string;
  dateString: string;
  time: string;
  location: string;
  description: string;
  category: 'Workshop' | 'Sale' | 'Community' | 'Class' | 'Special Event';
  isPast: boolean;
  hasPdf: boolean;
  pdfTitle?: string;
  plantHighlights?: string[];
}

const EVENTS_DATA: DirectEvent[] = [
  {
    id: 'moss-landing-street-fair',
    title: 'Moss Landing Street Fair',
    month: 'JUL',
    day: '26',
    year: '2024',
    dateString: 'July 26, 2024',
    time: '8:00 AM - 5:00 PM',
    location: 'Moss Landing Harbor District · Moss Landing, CA',
    description: 'Join us in historic Moss Landing for a vibrant day of art, antiques, delicious coastal food, and direct nursery plant offerings! Meet our head growers and shop rare Mediterranean shrubs, flowering maples, and California natives at special fair prices.',
    category: 'Special Event',
    isPast: true,
    hasPdf: true,
    pdfTitle: 'Moss Landing Street Fair - Nursery Guide.pdf',
    plantHighlights: ["Abutilon 'Crouching Tiger'", "Salvia 'Amistad'", "Protea 'Pink Ice'", "Dudleya brittonii"]
  },
  {
    id: 'benicia-peddlers-fair',
    title: 'Benicia Peddlers Fair',
    month: 'AUG',
    day: '10',
    year: '2024',
    dateString: 'August 10, 2024',
    time: '8:00 AM - 5:00 PM',
    location: 'First Street Downtown · Benicia, CA',
    description: "One of Northern California's premier outdoor antique and artisan fairs. Crescent Hill Nursery will feature wholesale-direct selections of rare shrubs, flowering maples (Abutilons), Proteas, and drought-tolerant perennials.",
    category: 'Special Event',
    isPast: true,
    hasPdf: true,
    pdfTitle: 'Benicia Peddlers Fair - Plant Specimen List.pdf',
    plantHighlights: ["Grevillea 'Moonlight'", "Abutilon 'Tiger Eye'", "Acacia 'Cousin Itt'", "Leucadendron 'Safari Sunset'"]
  },
  {
    id: 'carmel-homecrafters-marketplace',
    title: 'Carmel Homecrafters Marketplace',
    month: 'NOV',
    day: '21',
    year: '2026',
    dateString: 'November 21, 2026',
    time: '9:00 AM - 3:00 PM',
    location: 'Sunset Center, 8th & San Carlos · Carmel-by-the-Sea, CA',
    description: 'Join us at the legendary Carmel Homecrafters Marketplace. We will be bringing our finest signature floral arrangements, holiday botanical centerpieces, and a curated selection of winter-hardy California natives at direct-grower pricing.',
    category: 'Special Event',
    isPast: false,
    hasPdf: true,
    pdfTitle: 'Carmel Homecrafters Marketplace - Event Flyer.pdf',
    plantHighlights: ["Winter King Proteas", "Native Coastal Lilies", "Drought-Hardy Succulent Bowls", "Holiday Eucalyptus Bunches"]
  },
  {
    id: 'native-seed-sowing-workshop',
    title: 'Native Seed Sowing & Propagation Workshop',
    month: 'JAN',
    day: '15',
    year: '2024',
    dateString: 'January 15, 2024',
    time: '10:00 AM - 1:00 PM',
    location: 'Crescent Hill Main Greenhouse · Aromas, CA',
    description: 'Learn the secrets of collecting, stratifying, and propagating California native wildflowers and shrubs from seed. Hands-on laboratory with seed starter flats provided to all attendees.',
    category: 'Workshop',
    isPast: true,
    hasPdf: true,
    pdfTitle: 'Seed Sowing Workshop Handbook.pdf',
    plantHighlights: ["California Poppy (Eschscholzia)", "Blue Wild Indigo", "California Fuchsia", "Showy Milkweed"]
  },
  {
    id: 'spring-wholesale-direct-blowout',
    title: 'Spring Wholesale Direct Blowout Sale',
    month: 'MAY',
    day: '18',
    year: '2024',
    dateString: 'May 18, 2024',
    time: '8:00 AM - 4:00 PM',
    location: 'Crescent Hill Nursery Grounds · Aromas, CA',
    description: 'Our annual seasonal kickoff where the full wholesale growing grounds open to retail enthusiasts at volume pricing. Thousands of 1-gallon and 5-gallon specimens available directly off the benches.',
    category: 'Sale',
    isPast: true,
    hasPdf: true,
    pdfTitle: 'Spring Wholesale Direct Price Guide.pdf',
    plantHighlights: ["1-Gallon Perennials", "5-Gallon Specimen Shrubs", "Hummingbird Attractors", "Native Grasses"]
  },
  {
    id: 'drought-tolerant-design-class',
    title: 'Drought-Tolerant Landscape Design Masterclass',
    month: 'APR',
    day: '13',
    year: '2024',
    dateString: 'April 13, 2024',
    time: '11:00 AM - 2:00 PM',
    location: 'Main Demonstration Garden · Aromas, CA',
    description: 'Practical guide to establishing low-water, fire-resilient Mediterranean gardens. Covers hydro-zoning, organic mulching, drip irrigation best practices, and year-round floral bloom cycles.',
    category: 'Class',
    isPast: true,
    hasPdf: true,
    pdfTitle: 'Drought Tolerant Design Guidebook.pdf',
    plantHighlights: ["Arctostaphylos 'Howard McMinn'", "Ceanothus 'Yankee Point'", "Salvia apiana", "Festuca californica"]
  },
  {
    id: 'monterey-bay-pollinator-festival',
    title: 'Monterey Bay Pollinator & Wildlife Fair',
    month: 'SEP',
    day: '28',
    year: '2024',
    dateString: 'September 28, 2024',
    time: '10:00 AM - 3:00 PM',
    location: 'Pacific Grove Community Park · Pacific Grove, CA',
    description: 'Celebrating native bees, monarch butterflies, and hummingbirds with educational displays, botanical talks, and our mobile garden trailer loaded with nectar-rich plants.',
    category: 'Community',
    isPast: true,
    hasPdf: true,
    pdfTitle: 'Pollinator Fair Botanical Checklist.pdf',
    plantHighlights: ["Asclepias speciosa", "Salvia leucantha", "Penstemon heterophyllus", "Epilobium canum"]
  }
];

const CATEGORIES: EventCategory[] = [
  'All',
  'Workshop',
  'Sale',
  'Community',
  'Class',
  'Special Event'
];

export const EventsCalendar: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [showPastEvents, setShowPastEvents] = useState<boolean>(true);
  const [activePdfModal, setActivePdfModal] = useState<DirectEvent | null>(null);
  const [addedCalendarId, setAddedCalendarId] = useState<string | null>(null);

  // Filter events based on active category and past events toggle
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      // Category filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }
      // Past events toggle
      if (!showPastEvents && event.isPast) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, showPastEvents]);

  // Count upcoming events
  const upcomingCount = useMemo(() => {
    return EVENTS_DATA.filter(e => !e.isPast).length;
  }, []);

  const handleAddToCalendar = (event: DirectEvent) => {
    // Generate iCal ICS download for the event
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Crescent Hill Nursery//Events//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title} - Crescent Hill Nursery`,
      `DESCRIPTION:${event.description.replace(/,/g, '\\,')}`,
      `LOCATION:${event.location.replace(/,/g, '\\,')}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setAddedCalendarId(event.id);
    setTimeout(() => setAddedCalendarId(null), 3000);
  };

  return (
    <div className="bg-[#fbf9f5] min-h-screen">
      
      {/* 1. Hero Green Banner matching the exact uploaded image */}
      <div className="bg-[#2d5a27] text-white pt-16 pb-16 md:pt-20 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#244b1f]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Top Pill Badge: Calendar Icon + Events & Calendar */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 mb-6 backdrop-blur-xs shadow-xs">
            <CalendarIcon size={15} className="text-emerald-300" />
            <span>Events & Calendar</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-[1.1] drop-shadow-xs">
            Wholesale Direct Events
          </h1>

          {/* Description Subtitle */}
          <p className="text-stone-100/95 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light mb-6">
            We invite you to join us for a handful of events throughout the year to get to know our plant collection. These shows provide an excellent opportunity for great deals, good times, and a chance to meet our growers and get all those technical garden questions answered!!
          </p>

          {/* Dynamic Counter: 1 upcoming event */}
          <div className="text-stone-200/90 text-sm font-medium tracking-wide">
            {upcomingCount} upcoming event{upcomingCount === 1 ? '' : 's'}
          </div>

        </div>
      </div>

      {/* 2. Filter Bar with Category Pills and Show Past Events Checkbox */}
      <div className="bg-[#f7f5ef] border-b border-stone-200/90 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-stone-600 font-semibold text-xs sm:text-sm mr-1">
              <Filter size={15} className="text-stone-500" />
              <span>Filter:</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#2d5a27] text-white shadow-xs'
                        : 'bg-[#e7e2d7] text-stone-700 hover:bg-[#ded8cc] active:bg-[#d4cdbf]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Show Past Events Checkbox */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer select-none group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={showPastEvents}
                  onChange={(e) => setShowPastEvents(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded bg-white border border-stone-400 peer-checked:bg-[#2d5a27] peer-checked:border-[#2d5a27] transition-all flex items-center justify-center">
                  {showPastEvents && <Check size={12} className="text-white stroke-[3]" />}
                </div>
              </div>
              <span className="text-stone-700 text-xs sm:text-sm font-medium group-hover:text-stone-900 transition-colors">
                Show past events
              </span>
            </label>
          </div>

        </div>
      </div>

      {/* 3. Event Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200/80 shadow-xs max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
              <CalendarIcon size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">No events match your criteria</h3>
            <p className="text-stone-500 text-sm mb-6">
              Try changing your filter category or checking "Show past events" to browse previous wholesale shows.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setShowPastEvents(true);
              }}
              className="bg-[#2d5a27] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#234920] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-xs border border-stone-200/80 overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-all duration-200 group relative"
              >
                {/* Date Square / Left Column */}
                <div className="w-full sm:w-28 bg-[#2d5a27] text-white flex flex-col items-center justify-center p-4 sm:p-5 shrink-0 select-none">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-200">
                    {event.month}
                  </span>
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-white my-0.5 leading-none">
                    {event.day}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-300/80 tracking-wider">
                    {event.year}
                  </span>
                </div>

                {/* Right Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  
                  <div>
                    {/* Top Row: Category Badge + Status Badge + PDF Icon */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Category Badge */}
                        <span className="bg-[#e4eedb] text-[#2d5a27] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                          {event.category}
                        </span>

                        {/* Past vs Upcoming Status Badge */}
                        {event.isPast ? (
                          <span className="bg-[#ebe6dc] text-[#6e685c] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            Past Event
                          </span>
                        ) : (
                          <span className="bg-[#d1fae5] text-[#065f46] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300/60">
                            Upcoming Event
                          </span>
                        )}
                      </div>

                      {/* PDF Flyer / Specimen List Icon in Top Right */}
                      {event.hasPdf && (
                        <button
                          onClick={() => setActivePdfModal(event)}
                          title="View & Download Event PDF Flyer"
                          className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center text-red-600 transition-all hover:scale-105 shrink-0 cursor-pointer shadow-xs"
                          aria-label="View Event PDF flyer"
                        >
                          <FileText size={16} />
                        </button>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-2.5 group-hover:text-[#2d5a27] transition-colors leading-snug">
                      {event.title}
                    </h3>

                    {/* Location & Time */}
                    <div className="space-y-1.5 mb-3.5 text-xs sm:text-sm text-stone-600">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#cb6228] shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#cb6228] shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    {/* Highlighted Plant Specimens */}
                    {event.plantHighlights && event.plantHighlights.length > 0 && (
                      <div className="mb-4 pt-3 border-t border-stone-100">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5 flex items-center gap-1">
                          <Info size={12} className="text-[#2d5a27]" />
                          <span>Featured Plant Selections</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {event.plantHighlights.map((plant, idx) => (
                            <span 
                              key={idx}
                              className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200/60 font-medium"
                            >
                              {plant}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 mt-auto">
                    <button
                      onClick={() => handleAddToCalendar(event)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                        addedCalendarId === event.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-100 hover:bg-[#2d5a27] hover:text-white text-stone-700'
                      }`}
                    >
                      {addedCalendarId === event.id ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <CalendarPlus size={14} /> Add to Calendar
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setActivePdfModal(event)}
                      className="text-stone-500 hover:text-[#2d5a27] text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Flyer & Details</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* PDF Flyer / Details Modal */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#2d5a27] text-white p-6 flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold text-emerald-100 mb-2">
                  <FileText size={13} />
                  <span>Official Event Document</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  {activePdfModal.title}
                </h3>
                <p className="text-xs text-emerald-200 mt-1">
                  {activePdfModal.dateString} · {activePdfModal.location}
                </p>
              </div>
              
              <button
                onClick={() => setActivePdfModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-stone-700">
              
              {/* PDF Preview Card */}
              <div className="bg-[#f7f5ef] border border-stone-300/80 rounded-xl p-5 flex items-center gap-4">
                <div className="w-14 h-16 bg-red-500 text-white rounded-lg flex flex-col items-center justify-center shrink-0 shadow-md font-bold">
                  <FileText size={24} />
                  <span className="text-[9px] uppercase tracking-wider mt-1">PDF</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-stone-900 text-sm truncate">
                    {activePdfModal.pdfTitle || `${activePdfModal.title}.pdf`}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Official Flyer & Wholesale Direct Price List (2.4 MB)
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold mt-1">
                    Verified by Crescent Hill Nursery, Inc.
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                  About This Show
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {activePdfModal.description}
                </p>
              </div>

              {/* Plant Highlights */}
              {activePdfModal.plantHighlights && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Specimens Brought to Show
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {activePdfModal.plantHighlights.map((p, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-stone-50 p-2 rounded border border-stone-200/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a27]"></span>
                        <span className="font-medium text-stone-800">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Download / Print Actions */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const blob = new Blob([
                      `CRESCENT HILL NURSERY, INC.\n\nEvent: ${activePdfModal.title}\nDate: ${activePdfModal.dateString}\nTime: ${activePdfModal.time}\nLocation: ${activePdfModal.location}\n\nDescription:\n${activePdfModal.description}\n\nFeatured Plants:\n${activePdfModal.plantHighlights?.join('\n') || 'All catalog specimens'}\n\nContact: (831) 246-1128 | Crescent Hill Nursery, Inc.`
                    ], { type: 'text/plain;charset=utf-8' });
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.setAttribute('download', activePdfModal.pdfTitle || 'Event_Flyer.txt');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex-1 bg-[#2d5a27] hover:bg-[#234920] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition-colors cursor-pointer"
                >
                  <Download size={16} />
                  <span>Download Flyer (PDF)</span>
                </button>

                <button
                  onClick={() => handleAddToCalendar(activePdfModal)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm border border-stone-300/80 transition-colors cursor-pointer"
                >
                  <CalendarPlus size={16} />
                  <span>Add to Calendar</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
