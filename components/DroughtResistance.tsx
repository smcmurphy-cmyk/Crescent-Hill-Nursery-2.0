import React from 'react';
import { FileText, ExternalLink, Droplets } from 'lucide-react';

export const DroughtResistance: React.FC = () => {
  const resources = [
    { name: "LA County Drought Tolerant Plants Guide", url: "https://dpw.lacounty.gov/wwd/web/Documents/DroughtTolerantPlants.pdf" },
    { name: "Valley Water Qualifying Plant List", url: "https://www.valleywater.org/sites/default/files/2018-02/Qualifying-Plant-List.pdf" },
    { name: "SF Public Works Recommended Drought Tolerant Plant List", url: "https://sfpublicworks.org/sites/default/files/856-Recommended%20Drought%20Tolerant%20Plant%20List.pdf" },
    { name: "Pajaro Valley Water Drought Toolkit", url: "https://www.pvwater.org/images/toolkits/Drought.pdf" },
    { name: "San Luis Obispo County Approved Plant List", url: "https://www.slocounty.ca.gov/departments/planning-building/forms-documents/environmental-forms-and-documents/plants-information/county-approved-plant-list" },
    { name: "UC Master Gardeners Sacramento Summer Water Efficient Plant List", url: "https://ucanr.edu/site/uc-master-gardeners-sacramento-county/summer-water-efficient-plant-list" }
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
            <Droplets size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-crescent-green">Drought Resistance Resources</h1>
            <p className="text-stone-500 italic mt-1 text-lg">Curated guides for sustainable, water-wise gardening.</p>
          </div>
        </div>

        <div className="h-px w-full bg-stone-100 mb-12"></div>

        <div className="space-y-6">
          {resources.map((res, index) => (
            <a 
              key={index}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-stone-50 rounded-2xl border border-stone-200 hover:border-crescent-accent hover:bg-white hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl border border-stone-100 text-stone-400 group-hover:text-crescent-accent transition-colors">
                  <FileText size={24} />
                </div>
                <span className="font-bold text-stone-700 text-lg group-hover:text-crescent-green transition-colors leading-tight">
                  {res.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-stone-300 group-hover:text-crescent-accent font-bold uppercase text-[10px] tracking-widest whitespace-nowrap">
                Open Resource <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 p-10 bg-crescent-green rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-serif font-bold mb-4">Why Native Plants?</h2>
            <p className="text-emerald-50 leading-relaxed max-w-2xl text-lg">
              Native plants have evolved to thrive in our specific local climate. By choosing species from these guides, you're not just saving water—you're supporting local pollinators and creating a resilient ecosystem that requires less maintenance and zero chemicals.
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 opacity-10 transform scale-150 rotate-12">
             <Droplets size={240} />
          </div>
        </div>
      </div>
    </div>
  );
};