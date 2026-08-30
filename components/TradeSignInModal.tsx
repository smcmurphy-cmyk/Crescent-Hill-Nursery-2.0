import React, { useState } from 'react';
import { 
  Building2, 
  KeyRound, 
  Eye, 
  EyeOff, 
  X, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck,
  Loader2
} from 'lucide-react';

interface TradeSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (companyName: string) => void;
}

export const TradeSignInModal: React.FC<TradeSignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedCompany = companyName.trim();
    const trimmedPass = password.trim();

    if (!trimmedCompany) {
      setError('Please enter your company or business name.');
      return;
    }

    if (!trimmedPass) {
      setError('Please enter your trade password or passcode.');
      return;
    }

    setIsLoading(true);

    // Simulate swift verification
    setTimeout(() => {
      setIsLoading(false);
      
      // Save session if rememberMe is enabled
      const authData = {
        companyName: trimmedCompany,
        timestamp: Date.now(),
        authenticated: true
      };

      if (rememberMe) {
        try {
          localStorage.setItem('crescent_trade_auth', JSON.stringify(authData));
        } catch (e) {
          // ignore localstorage errors in restricted iframes
        }
      }

      try {
        sessionStorage.setItem('crescent_trade_auth', JSON.stringify(authData));
      } catch (e) {}

      onSuccess(trimmedCompany);
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Forest Green & Gold accents */}
        <div className="bg-[#2a4521] text-white p-6 sm:p-7 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-white/75 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/10 rounded-xl border border-white/15">
              <ShieldCheck size={24} className="text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block">
                Trade & Wholesale Only
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                Sign In to View Prices
              </h3>
            </div>
          </div>
          
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Please identify your company to access live container inventory, tiered trade prices, and availability.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-start gap-2.5 animate-in shake">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Company Name Field */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Company / Business Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Building2 size={18} />
              </div>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Coastal Botanical Designs, LLC"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#2a4521]/20 focus:border-[#2a4521] outline-none transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Trade Password / Passcode <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <KeyRound size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter trade password"
                className="w-full pl-10 pr-11 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#2a4521]/20 focus:border-[#2a4521] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#2a4521] border-stone-300 focus:ring-[#2a4521]"
              />
              <span>Remember company for this session</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2a4521] hover:bg-[#1e3417] active:scale-[0.99] text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-75"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Authenticating Trade Access...</span>
              </>
            ) : (
              <>
                <span>Access Live Inventory</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
