import React, { useState, useMemo } from 'react';
import { Plant } from '../types'; 
import { 
  Search, 
  Printer, 
  ArrowLeft, 
  PackageCheck,
  ShieldCheck,
  Lock
} from 'lucide-react';

export const AvailabilityList: React.FC<{ 
  plants: Plant[];            
  activeInventory: any[];     
  onBack: () => void;
  isPriced?: boolean;
  companyName?: string;
  onSignOut?: () => void;
  onRequestPriced?: () => void;
}> = ({ plants, activeInventory, onBack, isPriced = false, companyName, onSignOut, onRequestPriced }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState<'all' | '1g' | '2g' | '5g' | 'special'>('all');

  // 1. Stitch the field data and master data together
  const combinedData = useMemo(() => {
    if (!activeInventory) return [];
    return activeInventory.map(item => {
      const masterPlant = plants.find(p => p.id === item.id);
      return {
        ...item,
        name: masterPlant ? masterPlant.name : item.id,
        botanicalName: masterPlant ? masterPlant.botanicalName : ''
      };
    });
  }, [activeInventory, plants]);

  // 2. Filter the combined data based on search and size tabs
  const filteredData = useMemo(() => {
    return combinedData.filter(item => {
      const searchLower = (searchTerm || '').toLowerCase();
      const matchesSearch = 
        (item.name || '').toLowerCase().includes(searchLower) ||
        (item.botanicalName || '').toLowerCase().includes(searchLower) ||
        (item.description || '').toLowerCase().includes(searchLower) ||
        (item.sizeNote2g || '').toLowerCase().includes(searchLower) ||
        (item.sizeNote5g || '').toLowerCase().includes(searchLower) ||
        (item.sizeNoteSpecial || '').toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Filter by size tabs
      if (sizeFilter === '1g') return !!(item.price1g || item.qty1g);
      if (sizeFilter === '2g') return !!(item.price2g || item.qty2g);
      if (sizeFilter === '5g') return !!(item.price5g || item.qty5g);
      if (sizeFilter === 'special') return !!(item.priceSpecial || item.qtySpecial || item.sizeNoteSpecial);

      return true;
    });
  }, [searchTerm, sizeFilter, combinedData]);

  return (
    <div className="bg-[#fcfbf9] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation / Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-stone-200 pb-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <button 
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-[#2a4521] font-medium transition-colors group cursor-pointer"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </button>

              {isPriced && companyName && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-800">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Trade Access: <strong>{companyName}</strong></span>
                  {onSignOut && (
                    <button 
                      onClick={onSignOut}
                      className="ml-1 text-emerald-600 hover:text-red-600 font-bold underline cursor-pointer"
                      title="Sign out of trade session"
                    >
                      (Sign Out)
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="bg-[#2a4521] text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {isPriced ? 'Wholesale & Trade Only' : 'Nursery Stock & Availability'}
              </span>
              <span className="text-xs text-stone-500 font-medium">Updated Weekly</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mt-2">
              {isPriced ? 'Priced Availability List' : 'Availability List'}
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-2xl">
              {isPriced 
                ? 'Live inventory with container quantities, trade pricing, spec notes, and plant conditions.' 
                : 'Current availability of plants in production, container sizes, and growing conditions.'}
            </p>
          </div>

          {/* Search, Size Filter & Print Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Filter Tabs */}
            <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold flex-wrap">
              <button
                onClick={() => setSizeFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${sizeFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                All ({combinedData.length})
              </button>
              <button
                onClick={() => setSizeFilter('1g')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${sizeFilter === '1g' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                1 Gal
              </button>
              <button
                onClick={() => setSizeFilter('2g')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${sizeFilter === '2g' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                2 Gal
              </button>
              <button
                onClick={() => setSizeFilter('5g')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${sizeFilter === '5g' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                5 Gal
              </button>
              <button
                onClick={() => setSizeFilter('special')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${sizeFilter === 'special' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Special
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-grow sm:w-64">
              <input
                type="text"
                placeholder="Search plant or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#2a4521]/20 focus:border-[#2a4521] outline-none text-sm transition-all shadow-xs"
              />
              <Search className="absolute left-3 top-2.5 text-stone-400" size={16} />
            </div>

            {/* Print Button */}
            <button 
              onClick={() => window.print()}
              className="p-2.5 bg-white border border-stone-300 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              title={isPriced ? "Print Price Sheet" : "Print Availability List"}
            >
              <Printer size={18} />
              <span className="sm:hidden text-xs font-semibold">Print</span>
            </button>
          </div>
        </div>

        {/* Banner Section */}
        {isPriced ? (
          <div className="bg-emerald-900 text-white rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-800/80 p-3 rounded-xl border border-emerald-700/50 shrink-0">
                <PackageCheck size={24} className="text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">Wholesale & Trade Direct Ordering</h3>
                <p className="text-emerald-200 text-xs sm:text-sm mt-0.5">
                  Quantity in stock is shown per container tier. Call <strong>(831) 246-1128</strong> to place will-call orders or arrange delivery.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium bg-emerald-950/60 px-3.5 py-2 rounded-xl border border-emerald-800 shrink-0">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{filteredData.length} items shown</span>
            </div>
          </div>
        ) : (
          <div className="bg-[#2a4521] text-white rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-xl border border-white/15 shrink-0">
                <PackageCheck size={24} className="text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">Production & Garden Availability</h3>
                <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
                  Showing available container sizes and crop notes. For questions or custom plant sourcing, call <strong>(831) 246-1128</strong>.
                </p>
              </div>
            </div>
            {onRequestPriced && (
              <button
                onClick={onRequestPriced}
                className="bg-white hover:bg-amber-50 text-[#2a4521] font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Lock size={14} className="text-[#cb6228]" />
                <span>Sign In for Trade Prices</span>
              </button>
            )}
          </div>
        )}

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                <th className="px-4 py-4 w-3/12 min-w-[200px]">Scientific / Plant Name</th>
                <th className="px-3 py-4 w-2/12 text-center min-w-[100px]">1 Gallon</th>
                <th className="px-3 py-4 w-2/12 text-center min-w-[100px]">2 Gal</th>
                <th className="px-3 py-4 w-2/12 text-center min-w-[100px]">5 Gal</th>
                <th className="px-3 py-4 w-2/12 text-center min-w-[120px]">Special Size</th>
                <th className="px-4 py-4 w-3/12 min-w-[180px]">Condition & Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredData.map((item, idx) => (
                <tr 
                  key={`${item.id}-${idx}`} 
                  className="hover:bg-amber-50/40 transition-colors group text-sm"
                >
                  {/* Scientific Name */}
                  <td className="px-4 py-3.5 font-bold text-stone-900 font-serif text-base group-hover:text-[#2a4521] transition-colors">
                    {item.name}
                    {item.botanicalName && (
                      <span className="block text-xs font-sans text-stone-500 font-normal mt-0.5">
                        {item.botanicalName}
                      </span>
                    )}
                  </td>

                  {/* 1 Gallon Column */}
                  <td className="px-3 py-3.5 text-center">
                    {isPriced ? (
                      item.price1g ? (
                        <div className="inline-flex flex-col items-center">
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md text-xs border border-emerald-100 font-mono">
                            {item.price1g}
                          </span>
                          {item.qty1g !== undefined && item.qty1g !== "" && (
                            <span className="text-[11px] text-stone-500 mt-0.5 font-medium">
                              {item.qty1g} in stock
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    ) : (
                      item.price1g || item.qty1g ? (
                        <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                          Available
                        </span>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    )}
                  </td>

                  {/* 2 Gallon Column */}
                  <td className="px-3 py-3.5 text-center">
                    {isPriced ? (
                      item.price2g ? (
                        <div className="inline-flex flex-col items-center">
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md text-xs border border-emerald-100 font-mono">
                            {item.price2g}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5">
                            {item.qty2g !== undefined && item.qty2g !== "" && (
                              <span className="text-[11px] text-stone-500 font-medium">
                                {item.qty2g} in stock
                              </span>
                            )}
                            {item.sizeNote2g && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1 rounded border border-amber-200">
                                {item.sizeNote2g}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    ) : (
                      item.price2g || item.qty2g ? (
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                            Available
                          </span>
                          {item.sizeNote2g && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              {item.sizeNote2g}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    )}
                  </td>

                  {/* 5 Gallon Column */}
                  <td className="px-3 py-3.5 text-center">
                    {isPriced ? (
                      item.price5g ? (
                        <div className="inline-flex flex-col items-center">
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md text-xs border border-emerald-100 font-mono">
                            {item.price5g}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5">
                            {item.qty5g !== undefined && item.qty5g !== "" && (
                              <span className="text-[11px] text-stone-500 font-medium">
                                {item.qty5g} in stock
                              </span>
                            )}
                            {item.sizeNote5g && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1 rounded border border-amber-200">
                                {item.sizeNote5g}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    ) : (
                      item.price5g || item.qty5g ? (
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                            Available
                          </span>
                          {item.sizeNote5g && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              {item.sizeNote5g}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    )}
                  </td>

                  {/* Special Size Column */}
                  <td className="px-3 py-3.5 text-center">
                    {isPriced ? (
                      item.priceSpecial ? (
                        <div className="inline-flex flex-col items-center">
                          <span className="font-semibold text-[#cb6228] bg-amber-50 px-2.5 py-0.5 rounded-md text-xs border border-amber-200 font-mono">
                            {item.priceSpecial}
                          </span>
                          <div className="flex flex-col items-center gap-0.5 mt-1">
                            {item.sizeNoteSpecial && (
                              <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-1.5 rounded border border-stone-300">
                                {item.sizeNoteSpecial}
                              </span>
                            )}
                            {item.qtySpecial !== undefined && item.qtySpecial !== "" && (
                              <span className="text-[11px] text-stone-500 font-medium">
                                {item.qtySpecial} in stock
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    ) : (
                      item.priceSpecial || item.qtySpecial || item.sizeNoteSpecial ? (
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                            Available
                          </span>
                          {item.sizeNoteSpecial && (
                            <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-300">
                              {item.sizeNoteSpecial}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    )}
                  </td>

                  {/* Condition / Description */}
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-stone-600 font-medium leading-snug inline-block">
                      {item.description}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-stone-400 italic">
                    No plants found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Legend & Contact */}
        <div className="mt-8 bg-stone-100 border border-stone-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-stone-800 uppercase tracking-wider">Condition Key:</span>
            <span className="bg-white px-2 py-1 rounded border border-stone-200"><strong>*</strong> Prime / Top Quality</span>
            <span className="bg-white px-2 py-1 rounded border border-stone-200"><strong>bnb</strong> Buds & Blooms</span>
            <span className="bg-white px-2 py-1 rounded border border-stone-200"><strong>stk.</strong> Staked</span>
            <span className="bg-white px-2 py-1 rounded border border-stone-200"><strong>6" cups / 7g / 15g</strong> Specialty pot sizes</span>
          </div>
          <div className="text-stone-500 text-center md:text-right font-medium">
            Orders & Holds: (831) 246-1128 • info@crescenthillnursery.com
          </div>
        </div>

        {/* Print / Footer info */}
        <div className="mt-10 text-center text-stone-400 text-xs flex flex-col items-center gap-3">
          <p className="max-w-md">Crescent Hill Nursery Inc. • Watsonville, CA • Ph. 831-246-1128 • www.crescenthillnursery.com</p>
          <div className="h-px w-24 bg-stone-200"></div>
          <p className="uppercase tracking-widest font-bold">Specializing in Mediterranean, Native & Drought Tolerant Flora</p>
        </div>
      </div>
    </div>
  );
};