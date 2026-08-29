import React from 'react';
import { Notebook as NotebookIcon, PenTool } from 'lucide-react';

export const SustainabilityPolicy: React.FC = () => {
  return (
    <div className="bg-stone-100 min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Notebook Container */}
        <div className="bg-white shadow-2xl rounded-sm relative overflow-hidden border-l-[30px] border-crescent-brown ring-1 ring-stone-200">
          
          {/* Notebook Lines Decoration */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" 
               style={{ 
                 backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px)', 
                 backgroundSize: '100% 2.5rem',
                 marginTop: '4rem'
               }}>
          </div>
          
          {/* Vertical Margin Line */}
          <div className="absolute top-0 left-8 h-full w-px bg-red-200 pointer-events-none"></div>

          <div className="relative z-10 p-12 sm:p-20 pt-16">
            <div className="flex justify-between items-start mb-12">
              <div className="space-y-1">
                <h1 className="font-serif font-bold text-3xl text-stone-800">Crescent Hill Nursery</h1>
                <p className="font-hand text-2xl text-crescent-green font-bold">Sustainability Policy <span className="text-xl text-stone-500 font-normal">(We Promise We’re Trying Edition)</span></p>
              </div>
              <div className="text-stone-300 hidden sm:block">
                <NotebookIcon size={48} strokeWidth={1} />
              </div>
            </div>

            <div className="font-hand text-lg sm:text-xl text-stone-700 space-y-10 leading-[2.5rem]">
              <section>
                <h2 className="font-bold text-stone-900 mb-2">1. Water: The Precious Non-Renewable We Pretend Is Renewable</h2>
                <p>
                  We irrigate exclusively with the tears of people who still water their lawns in July. All stock is drought-tolerant (or at least drought-indifferent). Any plant caught begging for a drink is immediately re-homed to a customer with guilt-money to burn. Drip systems? Yes. Overhead sprinklers? Only if we’re filming a slow-motion nature documentary about our own disappointment.
                </p>
              </section>

              <section>
                <h2 className="font-bold text-stone-900 mb-2">2. Soil & Growing Media: Dirt, but Make It Ethical</h2>
                <p>
                  We compost like it’s a competitive sport. Our potting mixes feature coir, pumice, and the shredded dreams of over-waterers. Peat? We haven’t touched the stuff since 2019 and we judge those who still do (silently, with excellent resting judge-face).
                </p>
              </section>

              <section>
                <h2 className="font-bold text-stone-900 mb-2">3. Propagation: Death Is Not an Option (for the Planet)</h2>
                <p>
                  Cuttings &gt; seeds &gt; buying-in baby plants from a nursery 800 miles away that uses fossil-fuel grow lights to raise agaves. We multiply the weird ones so you don’t have to import them from a continent that’s currently on fire.
                </p>
              </section>

              <section>
                <h2 className="font-bold text-stone-900 mb-2">4. Packaging & Shipping: Cardboard Is Our Love Language</h2>
                <p>
                  We ship in 100% recycled, slightly-crumpled boxes that whisper “reduce, reuse, rehome this box to your garage forever.” Plastic pots are re-used until they achieve sentience or develop stress cracks, whichever comes first. No single-use bubble wrap — we prefer the aesthetic terror of naked-root shipping with a dramatic tissue-paper flourish.
                </p>
              </section>

              <section>
                <h2 className="font-bold text-stone-900 mb-2">5. Energy: We’re Basically Solar-Punk (on a Budget)</h2>
                <p>
                  Greenhouse vents open when it’s hot. Fans run when it’s hotter. Lights are used only when it’s actually dark AND we’re potting at 2 a.m. because someone impulse-ordered 47 Aeoniums at midnight. Our carbon footprint is roughly the size of a well-behaved succulent.
                </p>
              </section>

              <section>
                <h2 className="font-bold text-stone-900 mb-2">6. Philosophy</h2>
                <p>
                  We grow weird Mediterranean weirdos so your garden can look expensive while using roughly the same amount of water as a depressed cactus. If the planet must end, at least it’ll end looking fabulous and slightly prickly.
                </p>
              </section>

              <div className="pt-12 border-t border-stone-100 flex flex-col items-end">
                <p className="italic">Signed,</p>
                <p className="text-3xl font-bold text-crescent-green mt-2">The Management</p>
                <p className="text-lg text-stone-500 mt-1">Crescent Hill Nursery</p>
                <p className="text-base text-stone-400 mt-4 text-right max-w-xs leading-tight">
                  “Where rare plants go to live their best low-water life… and judge your irrigation schedule.”
                </p>
                <p className="text-xs text-stone-300 mt-4 italic">
                  (We’re serious about the plants. The snark is just free with purchase.) 🌵
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
            <div className="h-1 w-12 bg-stone-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};