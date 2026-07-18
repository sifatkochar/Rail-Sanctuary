/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { STATIONS } from '../data/trains';
import { Landmark, MapPin, Wifi, ShieldCheck, Heart, Coffee } from 'lucide-react';

export default function Stations() {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="border-b border-black/5 pb-4">
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-primary mb-1 block">Station Directory</span>
        <h2 className="font-serif text-3xl font-bold text-on-background">Major Train Stations</h2>
        <p className="text-on-surface-variant/80 font-serif text-sm italic mt-1">
          Review premium station facilities, lounges, and physical accessibility services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {STATIONS.map((station) => (
          <div
            key={station.code}
            className="bg-white rounded-none p-6 border border-black/5 custom-shadow hover:border-primary/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8E6E1]/50 text-primary flex items-center justify-center rounded-none flex-shrink-0 border border-black/10">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl text-on-background">{station.name}</h3>
                <span className="inline-block bg-[#D44D26] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-none uppercase tracking-widest">
                  Station Code: {station.code}
                </span>
              </div>
            </div>

            <p className="font-serif italic text-xs leading-relaxed text-on-surface-variant/80 mt-4">
              A Class-A1 classified passenger junction equipped with modern visual schedules, clean executive waiting rooms, and integrated security.
            </p>

            <div className="mt-6 pt-4 border-t border-black/5 space-y-3.5">
              <h4 className="text-[10px] font-bold uppercase text-on-surface-variant/70 tracking-widest">
                Available Conveniences
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs font-bold text-[#1A1A1A]">
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-4 h-4 text-primary" />
                  <span>Free High-Speed Wi-Fi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-primary" />
                  <span>Executive Lounges</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>24/7 Police Help Desk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>Medical Aid Center</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
