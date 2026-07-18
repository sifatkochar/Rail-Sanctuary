/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Train } from 'lucide-react';

interface FooterProps {
  setView: (view: 'booking' | 'bookings' | 'stations' | 'schedules') => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="bg-surface-container-low mt-20 border-t border-black/5">
      <div className="flex flex-col md:flex-row justify-between items-start px-8 max-w-[1200px] mx-auto py-16 gap-12">
        <div className="mb-6 md:mb-0 max-w-sm">
          {/* Typographic Logo */}
          <button
            onClick={() => setView('booking')}
            className="flex items-baseline gap-1 font-sans text-xl font-bold uppercase tracking-widest text-on-background mb-4 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>RailSanctuary</span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
          </button>
          
          <p className="text-on-surface-variant font-serif text-sm italic leading-relaxed mb-4">
            Curating high-legibility, low-stress ticket booking services across India. Travel in absolute security, quiet comfort, and mental serenity.
          </p>
          <p className="font-sans text-[10px] uppercase tracking-wider text-on-surface-variant/60">
            © 2026 RailSanctuary India // Volume IX // Registered under Indian Railways Act.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 w-full md:w-auto">
          {/* Company links */}
          <div className="flex flex-col gap-4">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">Company</span>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-sans text-xs text-on-surface-variant/95 hover:text-primary transition-all">About Us</a>
              <a href="#" className="font-sans text-xs text-on-surface-variant/95 hover:text-primary transition-all">Terms of Service</a>
              <a href="#" className="font-sans text-xs text-on-surface-variant/95 hover:text-primary transition-all">Privacy Policy</a>
            </div>
          </div>

          {/* Support links */}
          <div className="flex flex-col gap-4">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">Support</span>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-sans text-xs text-on-surface-variant/95 hover:text-primary transition-all">Help Center</a>
              <a href="#" className="font-sans text-xs text-on-surface-variant/95 hover:text-primary transition-all">Contact Us</a>
              <a href="#" className="font-sans text-xs text-on-surface-variant/95 hover:text-primary transition-all">FAQ</a>
            </div>
          </div>

          {/* Explore links */}
          <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">Explore</span>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-sans text-xs text-on-surface-variant/95 hover:text-primary transition-all">Network Map</a>
              <button
                onClick={() => setView('stations')}
                className="font-sans text-xs text-left text-on-surface-variant/95 hover:text-primary transition-all cursor-pointer"
              >
                Stations
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
