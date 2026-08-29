import React, { useState, useMemo, useEffect } from 'react';
import { Page, FloralArrangement } from './types';
import { Navbar, Logo, FramedEmblemLogo } from './components/Navbar';
import { PlantCatalog } from './components/PlantCatalog';
import { DroughtResistance } from './components/DroughtResistance';
import { PlantingCalendar } from './components/PlantingCalendar';
import { NativeSpeciesMap } from './components/NativeSpeciesMap';
import { SustainabilityPolicy } from './components/SustainabilityPolicy';
import { AvailabilityList } from './components/AvailabilityList';
import { EventsCalendar } from './components/EventsCalendar';
import { PlantDetailView } from './components/PlantDetailView';
import { HeroSection } from './components/HeroSection';
import { SERVICES, MOCK_PLANTS, FLORAL_ARRANGEMENTS } from './constants';
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Mail, 
  Instagram, 
  Facebook, 
  Music,
  Phone,
  FileText,
  Package,
  Truck,
  Users,
  CheckCircle,
  Calendar,
  CreditCard,
  ChevronLeft,
  Plus,
  Trash2,
  ShoppingCart,
  X as LucideX,
  ShieldCheck,
  Lock,
  Loader2,
  Sparkles,
  Send,
  ExternalLink,
  BookOpen,
  CalendarDays,
  Camera,
  Leaf,
  Check
} from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setPage] = useState<Page>(Page.HOME);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [cart, setCart] = useState<FloralArrangement[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'info' | 'payment' | 'success'>('info');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);
  const [showPricedModal, setShowPricedModal] = useState(false);

  // Social Links
  const INSTAGRAM_URL = "https://www.instagram.com/crescent_hill_nursery_?igsh=NTc4MTIwNjQ2TQ==";
  const FACEBOOK_URL = "https://www.facebook.com/crescenthillnursery/";
  const TIKTOK_URL = "#"; 

  // Cart logic
  const addToCart = (item: FloralArrangement) => {
    setCart(prev => [...prev, item]);
    setLastAddedItem(item.name);
    setTimeout(() => setLastAddedItem(null), 2000);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    if (cart.length <= 1) setIsMobileCartOpen(false);
  };

  const handleCartIconClick = () => {
    if (currentPage !== Page.MAIL_ORDER) {
      setPage(Page.MAIL_ORDER);
      // Give the page a moment to render before opening the mobile drawer
      setTimeout(() => setIsMobileCartOpen(true), 100);
    } else {
      setIsMobileCartOpen(true);
    }
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  const finalTotal = useMemo(() => {
    return cartTotal + (cartTotal > 150 || cartTotal === 0 ? 0 : 15);
  }, [cartTotal]);

  // Handle simulated payment
  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
      setCart([]); 
    }, 2500);
  };

  useEffect(() => {
    if (currentPage !== Page.CHECKOUT) {
      setCheckoutStep('info');
    }
    window.scrollTo(0, 0);
    // Don't auto-close drawer when navigating to MAIL_ORDER if triggered by cart click
    if (currentPage !== Page.MAIL_ORDER) {
      setIsMobileCartOpen(false);
    }
  }, [currentPage]);

  const renderServiceIcon = (iconName: string) => {
    const iconProps = { size: 32, strokeWidth: 1.5 };
    switch (iconName) {
      case 'Package': return <Package {...iconProps} />;
      case 'Truck': return <Truck {...iconProps} />;
      case 'Users': return <Users {...iconProps} />;
      default: return null;
    }
  };

  // --- SUB-COMPONENTS FOR PAGES ---

  const Hero = () => (
    <HeroSection 
      setPage={setPage}
      setShowPricedModal={setShowPricedModal}
      FACEBOOK_URL={FACEBOOK_URL}
      INSTAGRAM_URL={INSTAGRAM_URL}
    />
  );

  // Priced Availability Wholesale Modal
  const PricedAvailabilityModal = () => {
    if (!showPricedModal) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="bg-[#2a4521] text-white p-6 sm:p-8 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Lock size={24} className="text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl">Wholesale Priced Availability</h3>
                <p className="text-emerald-100 text-xs sm:text-sm">For Registered Trade, Landscape Contractors & Retail Nurseries</p>
              </div>
            </div>
            <button 
              onClick={() => setShowPricedModal(false)}
              className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LucideX size={20} />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Crescent Hill Nursery provides comprehensive wholesale pricing for landscape architects, contractors, retail nurseries, and botanical designers across the Central Coast and California.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-stone-50 border border-stone-200 p-5 rounded-xl">
                <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-2 text-sm">
                  <Check size={16} className="text-[#2a4521]" /> Live Availability List
                </h4>
                <p className="text-xs text-stone-500 mb-4">View current inventory with container sizes, blooming conditions, and descriptions.</p>
                <button 
                  onClick={() => {
                    setShowPricedModal(false);
                    setPage(Page.AVAILABILITY);
                  }}
                  className="w-full bg-[#2a4521] hover:bg-[#1f3518] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Open Live Inventory
                </button>
              </div>

              <div className="bg-stone-50 border border-stone-200 p-5 rounded-xl">
                <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-2 text-sm">
                  <Check size={16} className="text-[#cb6228]" /> Trade Inquiries & Orders
                </h4>
                <p className="text-xs text-stone-500 mb-4">Request delivery schedules, contract growing, or bulk wholesale quotes.</p>
                <button 
                  onClick={() => {
                    setShowPricedModal(false);
                    setPage(Page.CONTACT);
                  }}
                  className="w-full bg-[#cb6228] hover:bg-[#b4531e] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Contact Wholesale Team
                </button>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4 flex items-center justify-between text-xs text-stone-500">
              <span>Direct Wholesale Desk: <strong className="text-stone-800">(831) 246-1128</strong></span>
              <button 
                onClick={() => setShowPricedModal(false)}
                className="text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ServicesPage = () => (
    <div className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif font-bold text-crescent-green mb-6">Our Services</h2>
          <div className="h-1 w-20 bg-crescent-accent mx-auto mb-8"></div>
          <p className="text-stone-600 text-lg max-w-3xl mx-auto leading-relaxed">Beyond our plant catalog, we offer professional expertise to help your garden thrive in the local climate.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-16">
          {SERVICES.map((service) => (
            <button 
              key={service.id} 
              onClick={() => setPage(service.page)}
              className="group flex flex-col items-center text-center focus:outline-none transition-transform hover:-translate-y-2"
            >
              <div className="h-24 w-24 bg-crescent-green text-crescent-accent rounded-full flex items-center justify-center mb-8 shadow-xl group-hover:bg-crescent-accent group-hover:text-crescent-green transition-all duration-500 transform group-hover:rotate-12 border-4 border-white">
                {renderServiceIcon(service.iconName)}
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-5 group-hover:text-crescent-green transition-colors">{service.title}</h3>
              <p className="text-stone-600 leading-loose mb-6">{service.description}</p>
              <span className="text-crescent-accent font-bold uppercase tracking-widest text-sm border-b-2 border-crescent-accent group-hover:text-crescent-green group-hover:border-crescent-green transition-all">Learn More &rarr;</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const CheckoutPage = () => (
    <div className="bg-stone-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        {checkoutStep !== 'success' && (
          <button 
            onClick={() => setPage(Page.MAIL_ORDER)} 
            className="flex items-center gap-2 text-stone-500 hover:text-crescent-green mb-8 transition-colors"
          >
            <ChevronLeft size={20} /> Return to Shop
          </button>
        )}

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-100">
          {checkoutStep === 'success' ? (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-emerald-100 text-crescent-green rounded-full flex items-center justify-center mb-8 animate-bounce">
                <ShieldCheck size={48} />
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Order Confirmed!</h1>
              <p className="text-stone-600 mb-8 max-w-md leading-relaxed">
                Thank you for supporting Crescent Hill Nursery. Your order <span className="font-bold text-crescent-green">#CH-{Math.floor(Math.random() * 90000) + 10000}</span> has been received and our team is preparing your selection for transit.
              </p>
              <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 mb-10 w-full max-w-sm">
                 <div className="flex items-center gap-4 text-left">
                    <Sparkles className="text-crescent-accent" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Sage's Tip</p>
                      <p className="text-sm text-stone-600 italic">"Ensure your new arrivals have plenty of indirect light for the first 48 hours to recover from their journey."</p>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => setPage(Page.HOME)}
                className="bg-crescent-green text-white font-bold px-10 py-4 rounded-lg hover:bg-black transition-all flex items-center gap-2"
              >
                Back to Home <ArrowRight size={20} />
              </button>
            </div>
          ) : (
            <div className="md:flex">
              <div className="md:w-2/3 p-10 border-r border-stone-100">
                <div className="flex items-center gap-4 mb-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${checkoutStep === 'info' ? 'bg-crescent-green text-white' : 'bg-emerald-100 text-crescent-green'}`}>1</div>
                  <div className={`h-1 flex-grow rounded-full ${checkoutStep === 'payment' ? 'bg-emerald-100' : 'bg-stone-100'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${checkoutStep === 'payment' ? 'bg-crescent-green text-white' : 'bg-stone-100 text-stone-400'}`}>2</div>
                </div>

                {checkoutStep === 'info' ? (
                  <div className="animate-in fade-in duration-500">
                    <h2 className="text-2xl font-serif font-bold mb-8">Shipping Information</h2>
                    <form className="space-y-6" onSubmit={e => { e.preventDefault(); setCheckoutStep('payment'); }}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">First Name</label>
                          <input required type="text" className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-crescent-green/20" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Last Name</label>
                          <input required type="text" className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-crescent-green/20" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input required type="email" className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-crescent-green/20" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Shipping Address</label>
                        <input required type="text" className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-crescent-green/20 mb-3" placeholder="Street Address" />
                        <div className="grid grid-cols-3 gap-3">
                           <input required type="text" className="col-span-1 bg-stone-50 border border-stone-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-crescent-green/20" placeholder="City" />
                           <input required type="text" className="col-span-1 bg-stone-50 border border-stone-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-crescent-green/20" placeholder="State" />
                           <input required type="text" className="col-span-1 bg-stone-50 border border-stone-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-crescent-green/20" placeholder="Zip" />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-crescent-green text-white font-bold py-4 rounded-lg hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg">
                        Continue to Payment <ArrowRight size={18} />
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right-10 duration-500">
                    <h2 className="text-2xl font-serif font-bold mb-2">Payment Details</h2>
                    <p className="text-xs text-stone-400 mb-8 uppercase tracking-widest flex items-center gap-2">
                       <Lock size={12} /> Secure encrypted checkout
                    </p>

                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mb-8 flex items-center gap-4">
                       <div className="bg-amber-100 p-2 rounded-full text-amber-600"><Sparkles size={18} /></div>
                       <p className="text-xs text-amber-800 font-medium">Test Mode: You can use any dummy card details for this demonstration.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 border border-stone-200 rounded-xl bg-stone-50 relative overflow-hidden group">
                         <div className="flex justify-between items-center mb-6">
                            <CreditCard className="text-stone-300" size={32} />
                            <div className="flex gap-1">
                               <div className="w-6 h-4 bg-stone-200 rounded-sm"></div>
                               <div className="w-6 h-4 bg-stone-200 rounded-sm"></div>
                               <div className="w-6 h-4 bg-stone-200 rounded-sm"></div>
                            </div>
                         </div>
                         <div className="space-y-4">
                           <div>
                              <label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Card Number</label>
                              <div className="bg-white border border-stone-200 p-3 rounded flex items-center gap-3">
                                <span className="text-stone-300"><CreditCard size={18} /></span>
                                <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-transparent outline-none text-sm tracking-widest" />
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">Expiry Date</label>
                               <input type="text" placeholder="MM/YY" className="w-full bg-white border border-stone-200 p-3 rounded outline-none text-sm" />
                             </div>
                             <div>
                               <label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">CVC</label>
                               <input type="text" placeholder="123" className="w-full bg-white border border-stone-200 p-3 rounded outline-none text-sm" />
                             </div>
                           </div>
                         </div>
                      </div>

                      <div className="pt-4 space-y-4">
                        <button 
                          onClick={handlePayment}
                          disabled={isProcessing}
                          className="w-full bg-crescent-green text-white font-bold py-5 rounded-lg hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-75 disabled:cursor-not-allowed group"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 size={20} className="animate-spin" />
                              Processing Payment...
                            </>
                          ) : (
                            <>
                              Complete Purchase — ${finalTotal.toFixed(2)}
                              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                        <button onClick={() => setCheckoutStep('info')} className="w-full text-stone-400 text-xs font-bold uppercase tracking-widest hover:text-stone-600 transition-colors">
                          Go Back
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="md:w-1/3 bg-stone-50 p-10">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-8 pb-4 border-b border-stone-200">Summary</h3>
                <div className="space-y-4 mb-10 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-sm">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-white rounded border border-stone-200 overflow-hidden shrink-0">
                          <img src={item.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-stone-800 line-clamp-1">{item.name}</p>
                          <p className="text-xs text-stone-400">Floral Arrangement</p>
                        </div>
                      </div>
                      <span className="font-bold text-stone-600">${item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-xs text-stone-500 font-medium">
                  <div className="flex justify-between">
                    <span>Merchandise Subtotal</span>
                    <span className="text-stone-800">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping & Handling</span>
                    <span className={cartTotal > 150 ? "text-emerald-600 font-bold" : "text-stone-800"}>
                      {cartTotal > 150 ? 'FREE' : '$15.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="text-stone-800">$0.00</span>
                  </div>
                  <div className="border-t border-stone-200 pt-6 mt-4 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Total Due</p>
                      <p className="text-3xl font-serif font-bold text-crescent-green">${finalTotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-4 rounded-xl bg-white border border-stone-200">
                  <div className="flex items-center gap-3 text-emerald-600 mb-2">
                    <ShieldCheck size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Growth Guarantee</span>
                  </div>
                  <p className="text-[9px] leading-relaxed text-stone-400">
                    Your plants are covered by our 30-day health guarantee. If they don't thrive, we'll replace them at no cost.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const MailOrderPage = () => (
    <div className="bg-stone-50 py-4 md:py-16">
      <div className="max-w-7xl mx-auto px-4 relative">
        <button onClick={() => setPage(Page.SERVICES)} className="flex items-center gap-2 text-stone-500 hover:text-crescent-green mb-8 transition-colors">
          <ChevronLeft size={20} /> Back to Services
        </button>
        
        {/* Added Notification Toast for feedback on mobile/desktop */}
        {lastAddedItem && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-crescent-green text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle size={20} className="text-crescent-accent" />
            <span className="text-sm font-bold">Added {lastAddedItem}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 mb-8 md:mb-0">
          <div className="md:flex min-h-[500px] md:h-[750px] relative">
            
            {/* LEFT SIDE: Items (Scrollable) */}
            <div className={`w-full md:w-1/2 flex flex-col bg-stone-50 border-r border-stone-100 ${isMobileCartOpen ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-6 md:p-8 bg-crescent-green text-white shrink-0">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-1 md:mb-2">Signature Arrangements</h2>
                <p className="text-emerald-100 text-xs md:text-sm opacity-80">Shipped fresh from our hill to your door.</p>
              </div>
              <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4">
                {FLORAL_ARRANGEMENTS.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-stone-100 flex gap-4 group">
                    <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif font-bold text-base md:text-lg text-gray-900">{item.name}</h3>
                        <span className="text-crescent-green font-bold text-xs md:text-sm bg-emerald-50 px-2 py-0.5 rounded">${item.price}</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-stone-500 leading-relaxed line-clamp-2">{item.description}</p>
                      <button 
                        onClick={() => addToCart(item)}
                        className="mt-2 text-[10px] font-bold uppercase tracking-widest text-crescent-accent hover:text-crescent-green flex items-center gap-1 transition-colors"
                      >
                        <Plus size={10} /> Add to Selection
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: Cart Drawer (Mobile slide-up or Desktop fixed side) */}
            <div className={`
              w-full md:w-1/2 p-6 md:p-10 bg-white flex flex-col
              fixed inset-0 z-50 md:relative md:z-auto md:translate-y-0
              ${isMobileCartOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}
              transition-transform duration-300 ease-in-out
            `}>
              {/* Mobile Close Button */}
              <button 
                onClick={() => setIsMobileCartOpen(false)}
                className="md:hidden absolute top-6 right-6 p-2 bg-stone-100 rounded-full text-stone-500 hover:text-stone-900 transition-colors"
              >
                <LucideX size={24} />
              </button>

              <div className="mb-6 md:mb-8 flex items-center justify-between border-b border-stone-100 pb-4 pr-12 md:pr-0">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 flex items-center gap-3">
                  <ShoppingCart className="text-crescent-green" size={24} />
                  Your Selection
                </h2>
                <span className="bg-crescent-light text-crescent-green px-3 py-1 rounded-full text-xs font-bold">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="flex-grow overflow-y-auto pr-2 space-y-3 mb-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-300 space-y-4">
                    <Package size={48} strokeWidth={1} />
                    <p className="text-sm font-light italic">Your box is currently empty...</p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center justify-between group py-2 border-b border-stone-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-stone-100 overflow-hidden">
                          <img src={item.imageUrl} className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-stone-700">{item.name}</p>
                          <p className="text-[10px] text-stone-400 uppercase tracking-tighter">${item.price}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="p-1.5 text-stone-300 hover:text-red-400 transition-colors"
                      >
                        <LucideX size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 md:p-6 border border-stone-100 mt-auto">
                <div className="space-y-2 mb-4 md:mb-6 text-xs md:text-sm text-stone-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-stone-700">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-bold">{cartTotal > 150 ? 'FREE' : '$15.00'}</span>
                  </div>
                  <div className="border-t border-stone-200 pt-3 flex justify-between items-center">
                    <span className="text-stone-900 font-serif font-bold text-lg">Total</span>
                    <span className="text-crescent-green font-bold text-xl md:text-2xl">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button 
                    disabled={cart.length === 0}
                    onClick={() => setPage(Page.CHECKOUT)}
                    className="w-full bg-crescent-green text-white font-bold py-4 rounded-lg hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm tracking-widest"
                  >
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>
                  <p className="text-[9px] md:text-[10px] text-center text-stone-400">Secure payments powered by Stripe & PayPal. Shipped with care.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const WholesalePage = () => (
    <div className="bg-stone-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => setPage(Page.SERVICES)} className="flex items-center gap-2 text-stone-500 hover:text-crescent-green mb-8 transition-colors">
          <ChevronLeft size={20} /> Back to Services
        </button>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-crescent-accent font-bold uppercase tracking-widest text-sm mb-4 block">For Professionals</span>
            <h1 className="text-5xl font-serif font-bold text-crescent-green mb-8">Wholesale & Trade</h1>
            <p className="text-xl text-stone-600 mb-8 leading-relaxed">Crescent Hill Nursery partners with landscape architects, designers, and retailers to provide bulk quantities of rare Mediterranean and native species.</p>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center gap-6">
                 <div className="bg-crescent-green text-white p-4 rounded-full"><Users size={24} /></div>
                 <div>
                    <h3 className="font-bold text-xl">Designer Discounts</h3>
                    <p className="text-stone-500">Tiered pricing based on volume for registered trade pros.</p>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center gap-6">
                 <div className="bg-crescent-green text-white p-4 rounded-full"><Truck size={24} /></div>
                 <div>
                    <h3 className="font-bold text-xl">Direct Delivery</h3>
                    <p className="text-stone-500">On-site delivery for large-scale landscaping projects.</p>
                 </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-12 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-serif font-bold mb-8">Apply for Wholesale</h2>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Company Name</label>
                <input type="text" className="w-full bg-stone-50 border border-stone-200 p-4 rounded-lg outline-none focus:ring-2 focus:ring-crescent-green/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Trade License ID</label>
                <input type="text" className="w-full bg-stone-50 border border-stone-200 p-4 rounded-lg outline-none focus:ring-2 focus:ring-crescent-green/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Primary Business Type</label>
                <select className="w-full bg-stone-50 border border-stone-200 p-4 rounded-lg outline-none focus:ring-2 focus:ring-crescent-green/20">
                   <option>Landscape Architecture</option>
                   <option>Garden Center</option>
                   <option>Interior Styling</option>
                   <option>Event Planning</option>
                </select>
              </div>
              <button className="w-full bg-crescent-green text-white font-bold py-5 rounded-lg hover:bg-black transition-all">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const ConsultationPage = () => {
    const designs = [
      {
        id: 1,
        title: "Coastal Serenity",
        location: "Carmel-by-the-Sea",
        description: "A low-profile native meadow with sea-mist tolerant perennials.",
        image: "https://images.unsplash.com/photo-1558905619-171424930691?auto=format&fit=crop&w=800&q=80",
        rotation: "-rotate-6",
        translate: "-translate-x-12"
      },
      {
        id: 2,
        title: "High-Desert Modern",
        location: "Paso Robles",
        description: "Structural agaves and local stone sculpture garden.",
        image: "https://images.unsplash.com/photo-1458243311015-e0186107316f?auto=format&fit=crop&w=800&q=80",
        rotation: "rotate-0",
        translate: "translate-x-0"
      },
      {
        id: 3,
        title: "Woodland Sanctuary",
        location: "Santa Cruz Mountains",
        description: "Lush shade-loving ferns and native vine maples.",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
        rotation: "rotate-6",
        translate: "translate-x-12"
      }
    ];

    return (
      <div className="bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={() => setPage(Page.SERVICES)} className="flex items-center gap-2 text-stone-500 hover:text-crescent-green mb-8 transition-colors">
            <ChevronLeft size={20} /> Back to Services
          </button>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-20">
            <div className="p-12 text-center bg-crescent-green text-white">
              <h1 className="text-5xl font-serif font-bold mb-4">Garden Consultation</h1>
              <p className="text-xl text-emerald-100 max-w-2xl mx-auto">Expert eyes on your local soil. We help you choose the right plants for a lifelong garden.</p>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="p-12 border-r border-stone-100">
                <h2 className="text-2xl font-serif font-bold mb-8">What we cover:</h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="bg-amber-100 text-amber-700 p-2 rounded-full mt-1"><CheckCircle size={18} /></div>
                    <div>
                      <span className="font-bold block text-gray-900">Soil Analysis</span>
                      <span className="text-stone-500">Testing pH and nutrients to ensure plant compatibility.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-amber-100 text-amber-700 p-2 rounded-full mt-1"><CheckCircle size={18} /></div>
                    <div>
                      <span className="font-bold block text-gray-900">Microclimate Mapping</span>
                      <span className="text-stone-500">Identifying wind tunnels, sun traps, and frost pockets.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-amber-100 text-amber-700 p-2 rounded-full mt-1"><CheckCircle size={18} /></div>
                    <div>
                      <span className="font-bold block text-gray-900">Species Selection</span>
                      <span className="text-stone-500">Curating a list of resilient, beautiful plants for your zone.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="p-12 bg-stone-50/50">
                <h2 className="text-2xl font-serif font-bold mb-8">Book a session</h2>
                <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-inner">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <Calendar className="text-crescent-green" />
                        <span className="font-bold text-gray-900">Next available: Tuesday</span>
                      </div>
                      <span className="text-crescent-green font-bold">$250 / hr</span>
                    </div>
                    <button className="w-full bg-crescent-accent text-crescent-green font-bold py-4 rounded-lg hover:bg-white border-2 border-transparent hover:border-crescent-accent transition-all shadow-md uppercase tracking-widest text-sm">
                      Schedule In-Person Consultation
                    </button>
                    <p className="text-center mt-6 text-xs text-stone-400">Consultation fees are 25% refundable as store credit towards your first major purchase.</p>
                </div>
              </div>
            </div>
          </div>

          {/* New "Our Designs" Section */}
          <div className="py-20 border-t border-stone-200">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-crescent-light text-crescent-green rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                <Camera size={14} /> Portfolio
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-crescent-green mb-4">Our Designs</h2>
              <p className="text-stone-500 max-w-xl mx-auto italic">Crafting ecological landscapes that honor the spirit of the Central Coast.</p>
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-4 md:h-[500px]">
              {designs.map((design) => (
                <div 
                  key={design.id}
                  className={`
                    w-full md:w-[350px] bg-white p-4 shadow-2xl rounded-sm border border-stone-100
                    transition-all duration-500 ease-out cursor-pointer
                    md:absolute group hover:z-50 hover:scale-105 hover:rotate-0
                    ${design.rotation} ${design.translate}
                  `}
                >
                  <div className="aspect-[4/5] overflow-hidden mb-4 relative">
                    <img 
                      src={design.image} 
                      alt={design.title} 
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-xl text-gray-900">{design.title}</h3>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-crescent-accent flex items-center gap-1">
                        <MapPin size={10} /> {design.location}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed font-hand text-lg pt-2">{design.description}</p>
                  </div>
                  
                  {/* Interactive Seal/Badge on Hover */}
                  <div className="absolute -bottom-4 -right-4 bg-crescent-green text-white w-16 h-16 rounded-full flex flex-col items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 rotate-12 shadow-xl border-4 border-white">
                    <span className="text-[8px] font-bold leading-none uppercase">Project</span>
                    <span className="text-sm font-serif font-bold italic leading-none">Done</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-24 md:mt-12 text-center">
               <p className="text-stone-400 text-sm max-w-lg mx-auto leading-relaxed">
                 Every property tells a story. During our consultation, we'll discuss how to transform your specific landscape into a functional, sustainable work of art like those shown above.
               </p>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-crescent-light rounded-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80" 
                 alt="Nursery grounds" 
                 className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
               />
            </div>
          </div>
          <div>
            <span className="text-crescent-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
            <h2 className="text-5xl font-serif font-bold text-crescent-green mb-8">Rooted in the Rolling Hills</h2>
            <div className="prose prose-xl prose-stone text-stone-600 space-y-6">
              <p className="leading-relaxed">
                Founded in 1998, Crescent Hill Nursery began with a simple mission: to cultivate and share the resilient beauty of Mediterranean and native flora.
              </p>
              <p className="leading-relaxed">
                Our nursery is more than a marketplace; it's a living laboratory where we test varieties for drought tolerance, beauty, and ecological contribution. 
              </p>
              <p className="leading-relaxed">
                Whether you're a professional landscaper or a first-time gardener, we're here to provide the specimens and the knowledge you need to build a legacy in your own backyard.
              </p>
              <div className="pt-8 flex items-center gap-6">
                 <div className="h-px flex-1 bg-stone-200"></div>
                 <div className="font-script text-3xl text-crescent-green">The Krupa Family</div>
                 <div className="h-px flex-1 bg-stone-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="bg-stone-50 py-24">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
        <div className="bg-white rounded-sm shadow-2xl flex flex-col md:flex-row w-full overflow-hidden">
          <div className="md:w-5/12 p-12 bg-crescent-green text-white">
            <h2 className="text-4xl font-serif font-bold mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <MapPin className="mt-1 text-crescent-accent shrink-0" size={24} />
                <p className="text-stone-100 text-lg">1234 Green Valley Road<br/>Crescent Hill, CA 94000</p>
              </div>
              <div className="flex items-start gap-5">
                <Clock className="mt-1 text-crescent-accent shrink-0" size={24} />
                <div className="text-stone-100">
                  <p className="font-bold text-white mb-2">Visitor Hours:</p>
                  <p>Mon - Fri: 9am - 6pm</p>
                  <p>Sat - Sun: 8am - 5pm</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <Phone className="mt-1 text-crescent-accent shrink-0" size={24} />
                <p className="text-stone-100 text-lg">(831) 246-1128</p>
              </div>
              <div className="flex items-start gap-5">
                <Mail className="mt-1 text-crescent-accent shrink-0" size={24} />
                <p className="text-stone-100 text-lg">hello@crescenthill.com</p>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/10">
               <div className="flex space-x-6">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-crescent-accent transition-colors">
                    <Instagram />
                  </a>
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-crescent-accent transition-colors">
                    <Facebook />
                  </a>
                  <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-crescent-accent transition-colors">
                    <Music size={24} />
                  </a>
               </div>
            </div>
          </div>
          
          <div className="md:w-7/12 p-12 bg-white">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Send an Inquiry</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Name</label>
                  <input type="text" className="w-full bg-stone-50 rounded-sm border-stone-200 focus:ring-2 focus:ring-crescent-green/20 p-3 border outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Email</label>
                  <input type="email" className="w-full bg-stone-50 rounded-sm border-stone-200 focus:ring-2 focus:ring-crescent-green/20 p-3 border outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Subject</label>
                <select className="w-full bg-stone-50 rounded-sm border-stone-200 focus:ring-2 focus:ring-crescent-green/20 p-3 border outline-none">
                   <option>General Inquiry</option>
                   <option>Plant Availability</option>
                   <option>Landscaping Consultation</option>
                   <option>Wholesale Question</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Message</label>
                <textarea rows={5} className="w-full bg-stone-50 rounded-sm border-stone-200 focus:ring-2 focus:ring-crescent-green/20 p-3 border outline-none resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-crescent-green text-white font-bold py-4 rounded-sm hover:bg-black transition-all shadow-lg transform active:scale-95">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-[#2a4521] text-white py-16 sm:py-20 border-t border-[#3b5c2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Top Left: Logo, description, and social icons */}
          <div className="space-y-6">
            <div 
              className="cursor-pointer inline-flex items-center" 
              onClick={() => setPage(Page.HOME)}
            >
              <FramedEmblemLogo textColor="text-white" />
            </div>
            
            <p className="text-stone-200/90 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              Family-owned and rooted in the community since 2001. We bring expertise, passion, and thousands of healthy plants to every garden.
            </p>
            
            <div className="flex items-center space-x-3 pt-1">
              <a 
                href={FACEBOOK_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <button 
                onClick={() => setPage(Page.CONTACT)} 
                aria-label="Location & Contact"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <MapPin size={18} />
              </button>
            </div>
          </div>

          {/* Top Right: Explore */}
          <div className="space-y-4 md:pl-8 lg:pl-16">
            <h3 className="text-white font-serif font-bold text-xl sm:text-2xl">
              Explore
            </h3>
            <ul className="space-y-2.5 text-stone-200/90 text-sm sm:text-base">
              <li>
                <button 
                  onClick={() => setPage(Page.HOME)} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setPage(Page.CATALOG)} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Plants & Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setPage(Page.SERVICES)} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setPage(Page.ABOUT)} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setPage(Page.CONTACT)} 
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Bottom Left: Hours (Wholesale Only) */}
          <div className="space-y-4 pt-2 md:pt-4">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-white shrink-0" />
              <h3 className="text-white font-serif font-bold text-xl sm:text-2xl">
                Hours
              </h3>
              <span className="text-stone-300/80 text-sm font-normal ml-1">
                (Wholesale Only)
              </span>
            </div>
            
            <div className="space-y-2.5 text-stone-200/90 text-sm sm:text-base max-w-sm sm:max-w-md">
              <div className="flex justify-between items-center pr-4">
                <span>Monday – Friday</span>
                <span className="font-medium text-white">7am – 3:30pm</span>
              </div>
              <div className="flex justify-between items-center pr-4">
                <span>Saturday</span>
                <span className="font-medium text-white">7am – 12pm</span>
              </div>
              <div className="flex justify-between items-center pr-4">
                <span>Sunday</span>
                <span className="font-medium text-white">Closed</span>
              </div>
            </div>
          </div>

          {/* Bottom Right: Contact Us */}
          <div className="space-y-4 pt-2 md:pt-4 md:pl-8 lg:pl-16">
            <h3 className="text-white font-serif font-bold text-xl sm:text-2xl">
              Contact Us
            </h3>
            
            <div className="space-y-3.5 text-stone-200/90 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <MapPin size={19} className="text-[#cb6228] shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">46 Long Valley Rd</p>
                  <p className="text-white font-medium">Castroville, CA 95012</p>
                  <p className="text-stone-300/80 italic text-xs sm:text-sm mt-0.5">(Order pick-ups only)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={19} className="text-[#cb6228] shrink-0" />
                <a href="tel:8312461128" className="text-white hover:text-amber-300 transition-colors font-medium">
                  (831) 246-1128
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={19} className="text-[#cb6228] shrink-0" />
                <a href="mailto:crescenthillnursery@gmail.com" className="text-white hover:text-amber-300 transition-colors">
                  crescenthillnursery@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Hero />;
      case Page.CATALOG:
        return (
          <PlantCatalog 
            selectedPlantId={selectedPlantId}
            onSelectPlantId={(id) => setSelectedPlantId(id)}
            onNavigatePage={setPage}
          />
        );
      case Page.PLANT_DETAIL: {
        const activePlant = MOCK_PLANTS.find(p => p.id === selectedPlantId) || MOCK_PLANTS[0];
        return (
          <PlantDetailView 
            plant={activePlant}
            onBack={() => {
              setSelectedPlantId(null);
              setPage(Page.CATALOG);
            }}
            onSelectPlant={(newPlant) => setSelectedPlantId(newPlant.id)}
            onNavigatePage={setPage}
            onContactClick={() => setPage(Page.CONTACT)}
          />
        );
      }
      case Page.SERVICES:
        return <ServicesPage />;
      case Page.NEWSLETTER:
        return (
          <PlantCatalog 
            selectedPlantId={selectedPlantId}
            onSelectPlantId={(id) => setSelectedPlantId(id)}
            onNavigatePage={setPage}
          />
        );
      case Page.DROUGHT_RESISTANCE:
        return <DroughtResistance />;
      case Page.PLANTING_CALENDAR:
        return <PlantingCalendar />;
      case Page.NATIVE_SPECIES_MAP:
        return <NativeSpeciesMap />;
      case Page.SUSTAINABILITY_POLICY:
        return <SustainabilityPolicy />;
      case Page.AVAILABILITY:
        return <AvailabilityList onBack={() => setPage(Page.HOME)} />;
      case Page.EVENTS_CALENDAR:
        return <EventsCalendar onBack={() => setPage(Page.HOME)} />;
      case Page.MAIL_ORDER:
        return <MailOrderPage />;
      case Page.WHOLESALE:
        return <WholesalePage />;
      case Page.CONSULTATION:
        return <ConsultationPage />;
      case Page.ABOUT:
        return <AboutPage />;
      case Page.CONTACT:
        return <ContactPage />;
      case Page.CHECKOUT:
        return <CheckoutPage />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] flex flex-col font-sans selection:bg-[#cb6228] selection:text-white">
      <Navbar 
        currentPage={currentPage} 
        setPage={setPage} 
        cartCount={cart.length} 
        onCartClick={handleCartIconClick}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <PricedAvailabilityModal />
    </div>
  );
};

export default App;