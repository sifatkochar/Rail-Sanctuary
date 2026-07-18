/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { STATIONS, getTrainsForRoute } from '../data/trains';
import { Train, TrainClass } from '../types';
import { Search, ArrowUpDown, Calendar, Clock, UserCheck, AlertCircle } from 'lucide-react';

interface SearchStepProps {
  onSelectTrainClass: (train: Train, selectedClass: TrainClass, date: string) => void;
}

export default function SearchStep({ onSelectTrainClass }: SearchStepProps) {
  const [fromCode, setFromCode] = useState('PUNE');
  const [toCode, setToCode] = useState('CSMT');
  const [date, setDate] = useState('2024-10-24'); // Matches mockup date
  const [searched, setSearched] = useState(true); // Default searched so it shows trains immediately
  const [trainsList, setTrainsList] = useState<Train[]>(getTrainsForRoute('PUNE', 'CSMT'));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromCode === toCode) {
      alert('Source and Destination stations cannot be the same!');
      return;
    }
    const results = getTrainsForRoute(fromCode, toCode);
    setTrainsList(results);
    setSearched(true);
  };

  const handleSwapStations = () => {
    const temp = fromCode;
    setFromCode(toCode);
    setToCode(temp);
    setTrainsList(getTrainsForRoute(toCode, temp));
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Search Bar Container */}
      <section className="bg-white rounded-none p-6 md:p-10 border border-black/5 custom-shadow">
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-primary mb-2 block">Journey Curation</span>
        <h2 className="font-serif text-3xl font-bold text-on-background mb-2">Search Trains</h2>
        <p className="text-on-surface-variant/80 font-serif text-sm italic mb-8">
          Find comfortable, scenic, and peaceful journeys between major railway hubs.
        </p>

        <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* From Station */}
          <div className="lg:col-span-4 relative">
            <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">From Station</label>
            <select
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="w-full bg-[#FDFCFB] border border-black/10 hover:border-primary focus:border-primary rounded-none p-3.5 text-sm font-medium outline-none transition-all cursor-pointer appearance-none"
            >
              {STATIONS.map((station) => (
                <option key={station.code} value={station.code}>
                  {station.name} ({station.code})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="lg:col-span-1 flex justify-center pb-0.5">
            <button
              type="button"
              onClick={handleSwapStations}
              className="p-3.5 border border-black/10 text-on-background hover:bg-[#1A1A1A] hover:text-white rounded-none transition-all active:scale-90 cursor-pointer"
              title="Swap Stations"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* To Station */}
          <div className="lg:col-span-4">
            <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">To Station</label>
            <select
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="w-full bg-[#FDFCFB] border border-black/10 hover:border-primary focus:border-primary rounded-none p-3.5 text-sm font-medium outline-none transition-all cursor-pointer appearance-none"
            >
              {STATIONS.map((station) => (
                <option key={station.code} value={station.code}>
                  {station.name} ({station.code})
                </option>
              ))}
            </select>
          </div>

          {/* Date of Travel */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Date of Travel</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min="2024-01-01"
                className="w-full bg-[#FDFCFB] border border-black/10 hover:border-primary focus:border-primary rounded-none p-3 text-sm font-medium outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-12 mt-4">
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-primary text-white py-4 rounded-none font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Find Best Trains
            </button>
          </div>
        </form>
      </section>

      {/* Search Results */}
      {searched && (
        <div className="space-y-6">
          <div className="flex justify-between items-baseline px-2 border-b border-black/5 pb-3">
            <h3 className="font-serif text-2xl font-bold text-on-background">
              Available Trains <span className="font-sans text-xs font-normal text-on-surface-variant">({trainsList.length})</span>
            </h3>
            <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Sorted by Departure Time
            </span>
          </div>

          {trainsList.length === 0 ? (
            <div className="bg-white border border-black/5 rounded-none p-16 text-center custom-shadow">
              <AlertCircle className="w-10 h-10 text-primary mx-auto mb-4 opacity-80" />
              <h4 className="font-serif text-xl font-bold mb-2">No Trains Found</h4>
              <p className="text-on-surface-variant/80 font-serif italic text-sm">
                We couldn't find any direct trains between {STATIONS.find(s => s.code === fromCode)?.name} and {STATIONS.find(s => s.code === toCode)?.name} for this route.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {trainsList.map((train) => (
                <div
                  key={train.id}
                  className="bg-white rounded-none p-6 md:p-8 border border-black/5 custom-shadow custom-shadow-hover transition-all"
                >
                  {/* Train Header Info */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 pb-4 border-b border-black/5">
                    <div>
                      <span className="bg-primary/10 text-primary font-sans text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-none mr-3">
                        Superfast
                      </span>
                      <h4 className="inline-block font-serif text-xl font-bold text-on-background">
                        {train.name}
                      </h4>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60 mt-1">{train.number}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-primary">Daily Service</p>
                      <p className="text-[10px] uppercase font-sans text-on-surface-variant/60 mt-1 font-medium">Pantry Car Available</p>
                    </div>
                  </div>

                  {/* Travel Timing Details */}
                  <div className="grid grid-cols-1 md:grid-cols-12 items-center py-8 gap-6">
                    {/* Departure info */}
                    <div className="md:col-span-3">
                      <p className="font-serif text-3xl font-medium text-on-background">{train.departTime}</p>
                      <p className="font-sans text-xs uppercase tracking-widest font-bold text-primary mt-1">{train.fromCode}</p>
                      <p className="font-sans text-xs text-on-surface-variant/70 truncate">{train.fromName}</p>
                    </div>

                    {/* Timeline bar */}
                    <div className="md:col-span-6 flex flex-col items-center justify-center">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant/70 mb-2 font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {train.duration}
                      </span>
                      <div className="relative w-full flex items-center justify-center">
                        <div className="h-[1px] bg-black/10 w-4/5"></div>
                        <div className="absolute w-1.5 h-1.5 bg-primary rounded-full left-[10%]"></div>
                        <span className="absolute bg-white px-3 py-1 rounded-none text-[9px] text-primary border border-primary/20 font-sans uppercase tracking-widest font-bold">
                          Express
                        </span>
                        <div className="absolute w-1.5 h-1.5 bg-primary rounded-full right-[10%]"></div>
                      </div>
                    </div>

                    {/* Arrival info */}
                    <div className="md:col-span-3 text-left md:text-right">
                      <p className="font-serif text-3xl font-medium text-on-background">{train.arriveTime}</p>
                      <p className="font-sans text-xs uppercase tracking-widest font-bold text-primary mt-1">{train.toCode}</p>
                      <p className="font-sans text-xs text-on-surface-variant/70 truncate">{train.toName}</p>
                    </div>
                  </div>

                  {/* Class Selection Options */}
                  <div className="mt-4 pt-6 border-t border-black/5">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70 mb-4">
                      Select Class to Book Ticket:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {train.classes.map((cls) => (
                        <div
                          key={cls.code}
                          className="bg-[#FDFCFB]/50 hover:bg-primary-container/10 border border-black/5 rounded-none p-5 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-baseline mb-2">
                              <span className="font-sans font-bold text-xs uppercase tracking-wider text-primary">{cls.name}</span>
                              <span className="bg-white border border-black/10 px-2 py-0.5 rounded-none text-[9px] font-bold text-on-surface-variant uppercase">
                                {cls.code}
                              </span>
                            </div>
                            <p className="font-serif text-2xl font-bold text-on-background">
                              ₹{cls.baseFare.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="mt-6 flex justify-between items-center gap-2">
                            <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/80 flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5 text-primary" />
                              {cls.availableSeats} Left
                            </span>
                            <button
                              onClick={() => onSelectTrainClass(train, cls, date)}
                              className="bg-secondary hover:bg-primary text-white font-sans font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-none cursor-pointer transition-colors"
                            >
                              Book Class
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
