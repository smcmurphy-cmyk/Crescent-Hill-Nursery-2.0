import React from 'react';
import { Calendar, ExternalLink, Sun, CloudRain, Leaf } from 'lucide-react';

export const PlantingCalendar: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-stone-100 p-3 rounded-2xl text-crescent-accent">
            <Calendar size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-crescent-green">Seasonal Planting Calendar</h1>
            <p className="text-stone-500 italic mt-1 text-lg">Timing is everything in a thriving garden.</p>
          </div>
        </div>

        <div className="h-px w-full bg-stone-100 mb-12"></div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
            <Sun className="text-amber-500 mb-4" size={24} />
            <h3 className="font-bold mb-2">Spring</h3>
            <p className="text-sm text-stone-600">The ideal time for most natives to establish roots before the summer heat.</p>
          </div>
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
            <Leaf className="text-crescent-green mb-4" size={24} />
            <h3 className="font-bold mb-2">Autumn</h3>
            <p className="text-sm text-stone-600">Perfect for planting hardy shrubs and trees as they enter dormancy.</p>
          </div>
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
            <CloudRain className="text-blue-400 mb-4" size={24} />
            <h3 className="font-bold mb-2">Winter</h3>
            <p className="text-sm text-stone-600">Best for sowing native wildflower seeds and preparing soil beds.</p>
          </div>
        </div>

        <div className="bg-crescent-light/30 border border-crescent-accent/20 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-serif font-bold text-crescent-green mb-4">Detailed California Planting Guide</h2>
          <p className="text-stone-600 mb-8 max-w-2xl mx-auto text-lg">
            For specific dates tailored to our unique California micro-climates, we recommend the Old Farmer's Almanac planting tool.
          </p>
          
          <a 
            href="https://www.almanac.com/gardening/planting-calendar/CA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-crescent-green text-white font-bold rounded-xl hover:bg-stone-900 transition-all shadow-xl group"
          >
            Access Full Planting Calendar <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <p className="mt-6 text-xs text-stone-400 uppercase tracking-widest font-bold">
            Redirects to Almanac.com
          </p>
        </div>

        <div className="mt-16 text-sm text-stone-500 leading-relaxed italic border-t border-stone-100 pt-8">
          Note: Local variations in elevation and coastal influence can shift these dates by 2-3 weeks. When in doubt, "Ask Sage" using our virtual assistant in the bottom corner for hyper-local advice.
        </div>
      </div>
    </div>
  );
};