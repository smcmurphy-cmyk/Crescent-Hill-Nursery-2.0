import React from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, ExternalLink } from 'lucide-react';

interface NurseryEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'Market' | 'Workshop' | 'Nursery Event';
}

const EVENTS: NurseryEvent[] = [
  {
    id: 'e1',
    title: 'Carmel Homecrafters Marketplace 2026',
    date: 'November 21, 2026',
    time: '6:00 AM',
    location: 'Sunset Center, Carmel-by-the-Sea',
    description: 'Join us at the legendary Carmel Homecrafters Marketplace. We will be bringing our finest signature arrangements and a curated selection of winter-hardy natives.',
    type: 'Market'
  },
  {
    id: 'e2',
    title: 'Native Seed Sowing Workshop',
    date: 'January 15, 2026',
    time: '10:00 AM',
    location: 'Crescent Hill Greenhouse',
    description: 'Learn the secrets of propagating California native wildflowers from seed. All materials provided.',
    type: 'Workshop'
  },
  {
    id: 'e3',
    title: 'Spring Equinox Open House',
    date: 'March 20, 2026',
    time: '9:00 AM',
    location: 'Main Nursery Grounds',
    description: 'Celebrate the arrival of spring with guided tours of our display gardens and special first-access to our spring catalog.',
    type: 'Nursery Event'
  }
];

export const EventsCalendar: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="bg-stone-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-crescent-green mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Home
        </button>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-crescent-light text-crescent-green rounded-2xl mb-6 shadow-sm">
            <Calendar size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-crescent-green mb-4">Upcoming Events</h1>
          <div className="h-1 w-20 bg-crescent-accent mx-auto mb-6"></div>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Find us at local marketplaces across the Central Coast or join us at the nursery for seasonal workshops and celebrations.
          </p>
        </div>

        <div className="space-y-8">
          {EVENTS.map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 hover:shadow-xl hover:border-crescent-accent/30 transition-all group relative overflow-hidden"
            >
              {/* Type Badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-bl-2xl group-hover:bg-crescent-accent group-hover:text-white transition-colors">
                  {event.type}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Date Square */}
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-stone-50 rounded-2xl border border-stone-100 shrink-0 text-crescent-green font-serif">
                   <span className="text-sm font-bold uppercase tracking-tighter opacity-60">
                     {event.date.split(' ')[0].substring(0, 3)}
                   </span>
                   <span className="text-3xl font-bold leading-none py-1">
                     {event.date.split(' ')[1].replace(',', '')}
                   </span>
                   <span className="text-xs font-bold opacity-60">
                     {event.date.split(' ')[2]}
                   </span>
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-crescent-green transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-stone-500 text-sm">
                      <Clock size={16} className="text-crescent-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-500 text-sm">
                      <MapPin size={16} className="text-crescent-accent" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-stone-600 leading-relaxed text-sm mb-6">
                    {event.description}
                  </p>

                  <div className="flex gap-4">
                    <button className="px-6 py-2.5 bg-crescent-green text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-stone-900 transition-all shadow-md">
                      Add to Calendar
                    </button>
                    <button className="px-6 py-2.5 border border-stone-200 text-stone-500 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-stone-50 transition-all flex items-center gap-2">
                      Get Directions <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};