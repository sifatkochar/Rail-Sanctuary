/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TRAINS, STATIONS } from '../data/trains';
import { Clock, MapPin, Search, Calendar, ChevronRight } from 'lucide-react';

export default function Schedules() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrains = TRAINS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.fromCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.toCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="border-b border-black/5 pb-4">
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-primary mb-1 block">Timetable Explorer</span>
        <h2 className="font-serif text-3xl font-bold text-on-background">Train Schedules</h2>
        <p className="text-on-surface-variant/80 font-serif text-sm italic mt-1">
          Explore complete timelines, durations, and intermediate stops of express trains.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-[#FDFCFB]/80 rounded-none p-4 border border-black/10 custom-shadow flex items-center gap-3">
        <Search className="w-5 h-5 text-primary flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Train Name, Number (e.g., 12124), or Station (e.g., PUNE)..."
          className="bg-transparent w-full border-none outline-none text-sm font-sans text-on-surface placeholder:text-on-surface-variant/60"
        />
      </div>

      {/* Timetable List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTrains.map((train) => (
          <div
            key={train.id}
            className="bg-white rounded-none p-6 border border-black/5 custom-shadow hover:border-primary/20 transition-all"
          >
            <div className="flex justify-between items-baseline pb-4 border-b border-black/5 mb-5">
              <div>
                <h3 className="font-serif font-bold text-xl text-on-background">{train.name}</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant mt-1">{train.number}</p>
              </div>
              <span className="bg-[#E8E6E1]/50 text-primary text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-none border border-black/10">
                Daily Train
              </span>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-center justify-between text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/70">From:</span>
                </div>
                <span className="font-serif text-sm font-bold text-[#1A1A1A]">{train.fromName} ({train.fromCode})</span>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/70">To:</span>
                </div>
                <span className="font-serif text-sm font-bold text-[#1A1A1A]">{train.toName} ({train.toCode})</span>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant pt-3 border-t border-black/5">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/70">Departure Time:</span>
                </div>
                <span className="font-serif text-sm font-bold text-primary">{train.departTime}</span>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/70">Arrival Time:</span>
                </div>
                <span className="font-serif text-sm font-bold text-primary">{train.arriveTime}</span>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/70">Total Duration:</span>
                </div>
                <span className="font-serif text-sm italic font-bold text-secondary">{train.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
