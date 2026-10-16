import React from 'react';
import { ShieldCheck, User } from 'lucide-react';
import { BookingCategory, CurrencyCode, CURRENCY_RATES } from '../data/travelData';

export type AppPageView = 'home' | 'search-results' | 'checkout' | 'trips' | 'account' | 'admin';

interface NavbarProps {
  activePage: AppPageView;
  activeCategory: BookingCategory;
  onSelectCategory: (cat: BookingCategory) => void;
  onNavigatePage: (page: AppPageView) => void;
  currency: CurrencyCode;
  onChangeCurrency: (curr: CurrencyCode) => void;
  tripsCount: number;
  userName: string | null;
}

const NAV_ITEMS: { id: BookingCategory; label: string }[] = [
  { id: 'flights', label: 'Flights' },
  { id: 'trains', label: 'Trains' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'buses', label: 'Buses' },
  { id: 'cabs', label: 'Cabs' },
  { id: 'holidays', label: 'Holidays' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  activeCategory,
  onSelectCategory,
  onNavigatePage,
  currency,
  onChangeCurrency,
  tripsCount,
  userName,
}) => {
  const nextCurrency = (): CurrencyCode => {
    const keys = Object.keys(CURRENCY_RATES) as CurrencyCode[];
    const idx = keys.indexOf(currency);
    return keys[(idx + 1) % keys.length];
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigatePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-xs">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21.426 2.574a1.25 1.25 0 0 0-1.32-.24L2.856 9.584a1.25 1.25 0 0 0 .06 2.333l7.02 2.34 2.34 7.02a1.25 1.25 0 0 0 2.333.06l7.05-17.25a1.25 1.25 0 0 0-.233-1.513Z" />
            </svg>
          </span>
          <span>TripYeah</span>
        </a>

        {/* Zone 2: 6 clean navigation links */}
        <nav
          aria-label="Primary travel services"
          className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              activeCategory === item.id &&
              (activePage === 'home' || activePage === 'search-results');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectCategory(item.id)}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Currency, Trips, and Login/Account Portal */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={() => onChangeCurrency(nextCurrency())}
            title="Switch display currency"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200/80 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="inline-block w-3.5 h-2.5 rounded-[2px] bg-gradient-to-b from-orange-500 via-white to-emerald-600 border border-slate-300" />
            <span>{currency} ▾</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigatePage('trips')}
            className={`text-xs sm:text-sm font-semibold transition-colors py-2 px-3 rounded-xl whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'trips'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
            }`}
          >
            Trips {tripsCount > 0 ? `(${tripsCount})` : ''}
          </button>

          <button
            type="button"
            onClick={() => onNavigatePage('account')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#111827] hover:bg-slate-800 rounded-full shadow-xs transition-transform active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {userName ? `Hi, ${userName.split(' ')[0]}` : 'Login / Sign Up'}
          </button>

          <button
            type="button"
            onClick={() => onNavigatePage('account')}
            title="Account Settings & Preferences"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
              activePage === 'account'
                ? 'bg-blue-700 text-white ring-2 ring-blue-300'
                : 'bg-[#2563EB] hover:bg-blue-700 text-white'
            }`}
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
