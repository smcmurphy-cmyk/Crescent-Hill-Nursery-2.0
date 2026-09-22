import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Filter, 
  Check, 
  CalendarPlus
} from 'lucide-react';

export type EventCategory = 'All' | 'Special Event';

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
  category: 'Special Event';
  isPast: boolean;
}

const EVENTS_DATA: DirectEvent[] = [
  {
    id: 'moss-landing-street-fair',
    title: 'Moss Landing Street Fair',
    month: 'JUL',
    day: '25',
    year: '2027',
    dateString: 'July 25, 2027',
    time: '7:00 AM - 4:00 PM',
    location: 'Moss Landing Harbor District · Moss Landing, CA',
    description: 'Join us in historic Moss Landing for a vibrant day of art, antiques, delicious coastal food, and direct nursery plant offerings! Meet our head growers and shop rare Mediterranean shrubs, flowering maples, and California natives at special fair prices.',
    category: 'Special Event',
    isPast: false
  },
  {
    id: 'benicia-peddlers-fair',
    title: 'Benicia Peddlers Fair',
    month: 'AUG',
    day: '14',
    year: '2027',
    dateString: 'August 14, 2027',
    time: '8:00 AM - 5:00 PM',
    location: 'First Street Downtown · Benicia, CA',
    description: "One of Northern California's premier outdoor antique and artisan fairs. Crescent Hill Nursery will feature wholesale-direct selections of rare shrubs, flowering maples (Abutilons), Proteas, and drought-tolerant perennials.",
    category: 'Special Event',
    isPast: false
  },
  {
    id: 'carmel-homecrafters-marketplace',
    title: 'Carmel Homecrafters Marketplace',
    month: 'NOV',
    day: '20',
    year: '2027',
    dateString: 'November 20, 2027',
    time: '9:00 AM - 3:00 PM',
    location: 'Sunset Center, 8th & San Carlos · Carmel-by-the-Sea, CA',
    description: 'Join us at the legendary Carmel Homecrafters Marketplace. We will be bringing our finest signature floral arrangements, holiday botanical centerpieces, and a curated selection of winter-hardy California natives at direct-grower pricing.',
    category: 'Special Event',
    isPast: false
  }
];

const CATEGORIES: EventCategory[] = [
  'All',
  'Special Event'
];

export const EventsCalendar: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [showPastEvents, setShowPastEvents] = useState<boolean>(true);
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
                    {/* Top Row: Category Badge + Status Badge */}
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
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-2.5 group-hover:text-[#2d5a27] transition-colors leading-snug">
                      {event.title}
                    </h3>

                    {/* Location & Time */}
                    <div className="space-y-1.5 mb-4 text-xs sm:text-sm text-stone-600">
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
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-stone-100 flex items-center gap-3 mt-auto">
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
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};