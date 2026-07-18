/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Train, Calendar, User, HelpCircle, Ticket } from 'lucide-react';

interface NavbarProps {
  currentView: 'booking' | 'bookings' | 'stations' | 'schedules';
  setView: (view: 'booking' | 'bookings' | 'stations' | 'schedules') => void;
  bookingStep: number;
}

export default function Navbar({ currentView, setView, bookingStep }: NavbarProps) {
  return (
    <header className="w-full sticky top-0 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-black/5 z-50">
      <div className="flex justify-between items-center px-8 max-w-[1200px] mx-auto h-20">
        {/* Brand Logo - Styled as Editorial Monomark */}
        <button
          onClick={() => setView('booking')}
          className="flex items-baseline gap-1 font-sans text-xl font-bold uppercase tracking-widest text-on-background hover:opacity-90 transition-opacity cursor-pointer"
          id="nav-logo"
        >
          <span>RailSanctuary</span>
          <span className="w-2 h-2 bg-primary rounded-full"></span>
        </button>

        {/* Navigation Links - Editorial uppercase wide-tracked style */}
        <nav className="hidden md:flex items-center gap-10">
          <button
            onClick={() => setView('schedules')}
            className={`font-sans text-xs uppercase tracking-[0.2em] font-medium py-2 transition-colors duration-200 cursor-pointer ${
              currentView === 'schedules'
                ? 'text-primary font-bold border-b border-primary'
                : 'text-on-surface-variant/80 hover:text-primary'
            }`}
          >
            Schedules
          </button>
          <button
            onClick={() => setView('bookings')}
            className={`font-sans text-xs uppercase tracking-[0.2em] font-medium py-2 transition-colors duration-200 cursor-pointer ${
              currentView === 'bookings'
                ? 'text-primary font-bold border-b border-primary'
                : 'text-on-surface-variant/80 hover:text-primary'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setView('stations')}
            className={`font-sans text-xs uppercase tracking-[0.2em] font-medium py-2 transition-colors duration-200 cursor-pointer ${
              currentView === 'stations'
                ? 'text-primary font-bold border-b border-primary'
                : 'text-on-surface-variant/80 hover:text-primary'
            }`}
          >
            Stations
          </button>
          <a
            href="#"
            className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-on-surface-variant/80 hover:text-primary transition-colors duration-200"
          >
            Offers
          </a>
        </nav>

        {/* Quick Utilities / Sign In */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-on-surface-variant mr-1">
            <button
              onClick={() => setView('bookings')}
              className="p-2 hover:bg-surface-container/50 text-on-background/80 hover:text-primary rounded-full transition-colors cursor-pointer relative"
              title="My Bookings"
            >
              <Ticket className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-surface-container/50 text-on-background/80 hover:text-primary rounded-full transition-colors" title="Help & Support">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          
          <button className="bg-secondary hover:bg-primary text-white border border-secondary hover:border-primary px-5 py-2.5 rounded-none font-sans font-bold text-xs uppercase tracking-wider active:scale-95 transition-all duration-200 cursor-pointer">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
