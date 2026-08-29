import React from 'react';
import { Map, ExternalLink, Globe, MapPin, Layers } from 'lucide-react';

export const NativeSpeciesMap: React.FC = () => {
  const resources = [
    { 
      name: "USDA Plants Database", 
      url: "https://plants.usda.gov/",
      description: "The primary national resource for standardized information about vascular plants, mosses, and lichens across the United States."
    },
    { 
      name: "NWF Host Plants by Ecoregion", 
      url: "https://www.nwf.org/Native-Plant-Habitats/Plant-Native/Why-Native/Host-Plants-by-Ecoregion",
      description: "Identify the critical host plants that support the greatest number of butterfly and moth species in your specific ecoregion."
    },
    { 
      name: "EPA Ecoregions of North America", 
      url: "https://www.epa.gov/eco-research/ecoregions-north-america",
      description: "Access detailed spatial frameworks for environmental management and research of North American ecosystems."
    }
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-stone-100 p-3 rounded-2xl text-crescent-accent">
            <Map size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-crescent-green">Native Species Mapping</h1>
            <p className="text-stone-500 italic mt-1 text-lg">Understanding our local ecosystems through data.</p>
          </div>
        </div>

        <div className="h-px w-full bg-stone-100 mb-12"></div>

        <p className="text-stone-600 mb-10 text-lg leading-relaxed">
          Mapping native species is essential for successful ecological restoration. By understanding the ecoregions and host plants native to your specific area, you can build a garden that functions as a vital corridor for local wildlife.
        </p>

        <div className="grid gap-6">
          {resources.map((res, index) => (
            <a 
              key={index}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-stone-50 rounded-3xl border border-stone-200 hover:border-crescent-accent hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white rounded-2xl border border-stone-100 text-stone-400 group-hover:text-crescent-accent transition-colors shadow-inner">
                  {index === 0 ? <Globe size={28} /> : index === 1 ? <MapPin size={28} /> : <Layers size={28} />}
                </div>
                <div className="max-w-xl">
                  <h3 className="font-bold text-stone-900 text-xl group-hover:text-crescent-green transition-colors mb-2">
                    {res.name}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {res.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 md:mt-0 flex items-center gap-2 text-stone-400 group-hover:text-crescent-accent font-bold uppercase text-[10px] tracking-widest whitespace-nowrap bg-stone-100 group-hover:bg-crescent-light px-4 py-2 rounded-full transition-colors self-start md:self-center">
                Explore Map <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 p-12 bg-stone-900 rounded-[3rem] text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-serif font-bold mb-6 text-crescent-accent">The Power of Place</h2>
            <p className="text-stone-300 leading-relaxed text-lg mb-6">
              Every garden at Crescent Hill is an opportunity to heal a small piece of the planet. These tools allow you to look beyond the boundaries of your property and see how your plants connect to the broader North American landscape.
            </p>
            <div className="flex items-center gap-3 text-sm font-bold tracking-tighter text-stone-400">
               <span className="h-px w-8 bg-crescent-accent"></span>
               RESTORING BIODIVERSITY, ONE PLOT AT A TIME
            </div>
          </div>
          <div className="absolute -right-20 -top-20 opacity-10 transform scale-150 -rotate-12 pointer-events-none">
             <Map size={320} />
          </div>
        </div>
      </div>
    </div>
  );
};