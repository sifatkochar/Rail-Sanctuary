/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Passenger, Train, TrainClass } from '../types';
import { User, Plus, Trash2, HelpCircle, Info, Landmark } from 'lucide-react';

interface PassengersStepProps {
  selectedTrain: Train;
  selectedClass: TrainClass;
  date: string;
  passengers: Passenger[];
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
  onConfirm: () => void;
  onBack: () => void;
}

export default function PassengersStep({
  selectedTrain,
  selectedClass,
  date,
  passengers,
  setPassengers,
  onConfirm,
  onBack,
}: PassengersStepProps) {
  
  // Local list of pre-booked (already occupied) seats
  const bookedSeats = [3, 11, 14, 18, 22]; 
  const totalSeats = 24; // Seats map shows 1 to 24

  // State to track selected seat numbers
  const [selectedSeats, setSelectedSeats] = useState<number[]>([5]); // Starts with Seat 5 selected, matching mockup

  // Sync selected seats into passengers list
  useEffect(() => {
    const updated = [...passengers];
    // Clear seat numbers
    updated.forEach(p => p.seatNumber = null);
    // Re-assign selected seats to passengers
    selectedSeats.forEach((seatNum, idx) => {
      if (updated[idx]) {
        updated[idx].seatNumber = seatNum;
      }
    });
    setPassengers(updated);
  }, [selectedSeats, passengers.length]);

  const handleAddPassenger = () => {
    const id = Date.now().toString() + Math.random().toString().substr(2, 5);
    setPassengers([
      ...passengers,
      { id, name: '', age: '', gender: 'Male', seatNumber: null },
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    if (passengers.length === 1) return; // Must have at least 1 passenger
    const newPass = passengers.filter((_, idx) => idx !== index);
    setPassengers(newPass);

    // Also remove one seat selection if there are more seats selected than passengers
    if (selectedSeats.length > newPass.length) {
      setSelectedSeats(selectedSeats.slice(0, newPass.length));
    }
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const updated = passengers.map((p, idx) => {
      if (idx === index) {
        return { ...p, [field]: value };
      }
      return p;
    });
    setPassengers(updated);
  };

  const handleSeatClick = (seatNum: number) => {
    if (bookedSeats.includes(seatNum)) return; // Can't select booked seats

    if (selectedSeats.includes(seatNum)) {
      // Toggle off
      setSelectedSeats(selectedSeats.filter(s => s !== seatNum));
    } else {
      // Toggle on, but limit to passenger count
      if (selectedSeats.length < passengers.length) {
        setSelectedSeats([...selectedSeats, seatNum]);
      } else {
        // If already full, replace the oldest selection
        if (passengers.length === 1) {
          setSelectedSeats([seatNum]);
        } else {
          setSelectedSeats([...selectedSeats.slice(1), seatNum]);
        }
      }
    }
  };

  // Check if senior citizens are present (Age >= 60)
  const hasSeniorCitizen = passengers.some(p => p.age && parseInt(p.age) >= 60);

  // Fare calculations matching mockup formula:
  const baseFarePerPassenger = selectedClass.baseFare;
  const reservationFeePerPassenger = 40.0;
  const convenienceFeeFixed = 17.70;

  const totalBaseFare = baseFarePerPassenger * passengers.length;
  const totalReservationFee = reservationFeePerPassenger * passengers.length;
  const totalFare = totalBaseFare + totalReservationFee + convenienceFeeFixed;

  const handleProceed = () => {
    // Validate passenger inputs
    const incomplete = passengers.some(p => !p.name.trim() || !p.age);
    if (incomplete) {
      alert('Please fill in the Full Name and Age for all passengers.');
      return;
    }

    // Validate that seats are selected for all passengers
    if (selectedSeats.length < passengers.length) {
      alert(`Please select preferred seats for all ${passengers.length} passengers in the seat map.`);
      return;
    }

    onConfirm();
  };

  // Render seats helper
  const renderSeat = (num: number) => {
    const isBooked = bookedSeats.includes(num);
    const isSelected = selectedSeats.includes(num);
    
    let btnStyle = "w-12 h-12 rounded-none font-sans font-bold text-xs flex items-center justify-center transition-all cursor-pointer ";
    if (isBooked) {
      btnStyle += "bg-[#E8E6E1]/50 text-on-surface-variant/30 border border-black/5 cursor-not-allowed opacity-40";
    } else if (isSelected) {
      btnStyle += "bg-primary text-white border border-primary font-bold";
    } else {
      btnStyle += "bg-[#E8E6E1]/20 text-[#1A1A1A] hover:bg-primary/15 border border-black/5";
    }

    return (
      <button
        key={num}
        type="button"
        disabled={isBooked}
        onClick={() => handleSeatClick(num)}
        className={btnStyle}
        title={isBooked ? `Seat ${num} (Booked)` : isSelected ? `Seat ${num} (Selected)` : `Seat ${num} (Available)`}
      >
        {num}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
      {/* Left Column: Form & Seat selector */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Passenger Details Card */}
        <section className="bg-white rounded-none p-6 md:p-8 border border-black/5 custom-shadow">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-primary mb-2 block">Travel Manifest</span>
          <h2 className="font-serif text-3xl font-bold text-on-background mb-2">Passenger Details</h2>
          <p className="text-on-surface-variant/80 font-serif text-sm italic mb-8">
            Please enter names as they appear on government-issued ID cards.
          </p>

          <div className="space-y-8">
            {passengers.map((passenger, index) => (
              <div
                key={passenger.id}
                className="passenger-entry bg-[#FDFCFB]/60 p-5 md:p-6 rounded-none border border-black/5 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif font-bold text-on-background flex items-center gap-2 text-lg">
                    <User className="w-5 h-5 text-primary/80" />
                    Passenger {index + 1}
                  </h3>
                  {passengers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePassenger(index)}
                      className="text-error hover:text-error/85 p-2 rounded-none hover:bg-error-container/10 transition-all cursor-pointer flex items-center gap-1 text-[10px] uppercase tracking-wider font-sans font-bold"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Name Input */}
                  <div className="md:col-span-6">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Full Name</label>
                    <input
                      type="text"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-none p-3.5 text-sm outline-none transition-all font-medium"
                    />
                  </div>

                  {/* Age Input */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Age</label>
                    <input
                      type="number"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      placeholder="28"
                      min="1"
                      max="120"
                      className="w-full bg-white border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-none p-3.5 text-sm outline-none transition-all font-medium"
                    />
                  </div>

                  {/* Gender Select */}
                  <div className="md:col-span-4">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Gender</label>
                    <select
                      value={passenger.gender}
                      onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                      className="w-full bg-white border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-none p-3.5 text-sm outline-none transition-all font-medium cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                    </select>
                  </div>
                </div>

                {/* Assigned Seat number indicator */}
                {passenger.seatNumber && (
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#D44D26] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    Assigned Seat: #{passenger.seatNumber}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddPassenger}
            className="mt-8 flex items-center gap-2 text-primary hover:text-[#1A1A1A] font-sans font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Another Passenger
          </button>
        </section>

        {/* Seat Selection Card */}
        <section className="bg-white rounded-none p-6 md:p-8 border border-black/5 custom-shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-primary mb-2 block">Space Selection</span>
              <h2 className="font-serif text-3xl font-bold text-on-background">Select Preferred Seats</h2>
              <p className="text-on-surface-variant/85 text-xs font-bold uppercase tracking-wider mt-1.5">
                Coach {selectedClass.code === 'SL' ? 'S3' : selectedClass.code === 'CC' ? 'C2' : 'B1'} - {selectedClass.name}
              </p>
            </div>
            {/* Seat Map Legend */}
            <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-wider font-sans font-bold text-on-surface-variant/80">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-[#E8E6E1]/30 border border-black/10 rounded-none"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-primary border border-primary rounded-none"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-[#E8E6E1]/50 border border-black/10 rounded-none opacity-60"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>

          {/* Seat Map instructions */}
          <div className="mb-6 bg-primary-container/20 p-4 rounded-none text-xs font-sans font-bold uppercase tracking-wider text-primary border border-primary/25 flex justify-between items-center">
            <span>
              Assigning {passengers.length} seat(s). Click on empty spots to choose.
            </span>
            <span className="bg-[#1A1A1A] px-2.5 py-1 rounded-none text-white border border-black/10 font-sans tracking-widest text-[10px]">
              {selectedSeats.length} / {passengers.length} SELECTED
            </span>
          </div>

          {/* Seat Map Box */}
          <div className="bg-[#FDFCFB]/60 rounded-none p-6 overflow-x-auto border border-black/5">
            <div className="min-w-[550px] flex flex-col items-center">
              {/* Coach Wall Front */}
              <div className="w-full h-1 bg-black/10 rounded-none mb-8 relative flex items-center justify-center">
                <span className="absolute -top-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest font-sans">
                  Front of Coach (Engine Side)
                </span>
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-6 gap-x-8 gap-y-4">
                {/* Seat Columns 1-6 */}
                <div className="col-span-6 grid grid-cols-6 gap-2.5">
                  {[1, 2, 3, 4, 5, 6].map(num => renderSeat(num))}
                </div>

                {/* aisle indicator space */}
                <div className="col-span-6 h-6 flex items-center justify-center border-t border-b border-dashed border-black/10 my-1">
                  <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-on-surface-variant/50">Aisle / Passage</span>
                </div>

                {/* Seat Columns 7-12 */}
                <div className="col-span-6 grid grid-cols-6 gap-2.5">
                  {[7, 8, 9, 10, 11, 12].map(num => renderSeat(num))}
                </div>

                <div className="col-span-6 h-6 flex items-center justify-center border-t border-b border-dashed border-black/10 my-1">
                  <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-on-surface-variant/50">Aisle / Passage</span>
                </div>

                {/* Seat Columns 13-18 */}
                <div className="col-span-6 grid grid-cols-6 gap-2.5">
                  {[13, 14, 15, 16, 17, 18].map(num => renderSeat(num))}
                </div>

                <div className="col-span-6 h-6 flex items-center justify-center border-t border-b border-dashed border-black/10 my-1">
                  <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-on-surface-variant/50">Aisle / Passage</span>
                </div>

                {/* Seat Columns 19-24 */}
                <div className="col-span-6 grid grid-cols-6 gap-2.5">
                  {[19, 20, 21, 22, 23, 24].map(num => renderSeat(num))}
                </div>
              </div>

              {/* Coach Wall Back */}
              <div className="w-full h-1 bg-black/10 rounded-none mt-8 relative flex items-center justify-center">
                <span className="absolute -bottom-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest font-sans">
                  Back of Coach
                </span>
              </div>
            </div>
          </div>

          {/* Priority Seating Warning Alert */}
          <div className={`mt-8 p-5 border rounded-none flex items-start gap-4 transition-colors ${
            hasSeniorCitizen 
              ? 'bg-amber-50 border-amber-200 text-amber-900' 
              : 'bg-primary-container/10 border-primary-container/30 text-on-primary-container'
          }`}>
            <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${hasSeniorCitizen ? 'text-amber-600' : 'text-primary'}`} />
            <div>
              <p className="font-serif font-bold text-base">
                Priority Berth Allocation Notice
              </p>
              <p className="text-xs leading-relaxed mt-1 font-sans text-on-surface-variant">
                Senior citizens (60+) are eligible for priority lower berth allocation. Please ensure appropriate seat preferences are chosen.
                {hasSeniorCitizen && (
                  <span className="block mt-2 font-bold text-amber-700 font-sans">
                    💡 Senior citizen traveler detected! Select lower seats (like odd numbers 1, 3, 5, etc. on window/lower sides) for convenience.
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: Sidebar Summary Card */}
      <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
        <div className="bg-white rounded-none p-6 md:p-8 border border-black/5 custom-shadow">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-primary mb-1 block">Roster Summary</span>
          <h2 className="font-serif text-2xl font-bold text-on-background mb-6 pb-2 border-b border-black/5">Journey Summary</h2>
          
          <div className="space-y-4 mb-6 pb-6 border-b border-black/5">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-serif font-bold text-lg text-on-background">{selectedTrain.name}</p>
                <p className="text-[10px] uppercase tracking-widest font-mono text-on-surface-variant/70 mt-1">{selectedTrain.number}</p>
              </div>
              <div className="text-right">
                <p className="font-serif font-bold text-sm text-primary">{date}</p>
                <p className="text-[9px] uppercase tracking-widest font-sans font-bold text-on-surface-variant/60 mt-1">{selectedClass.name}</p>
              </div>
            </div>

            {/* Travel Timeline Indicator */}
            <div className="flex items-center gap-3 bg-[#FDFCFB]/80 p-4 border border-black/5">
              <div className="text-center flex-shrink-0">
                <p className="font-serif font-bold text-base text-on-background">{selectedTrain.departTime}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-primary mt-1">{selectedTrain.fromCode}</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="h-[1px] bg-black/10 flex-1"></div>
                <span className="font-sans text-[8px] text-on-surface-variant/50 font-bold uppercase tracking-widest">To</span>
                <div className="h-[1px] bg-black/10 flex-1"></div>
              </div>
              <div className="text-center flex-shrink-0">
                <p className="font-serif font-bold text-base text-on-background">{selectedTrain.arriveTime}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-primary mt-1">{selectedTrain.toCode}</p>
              </div>
            </div>
          </div>

          {/* Pricing Breakdowns */}
          <div className="space-y-3 mb-8 font-sans text-xs uppercase tracking-wider">
            <div className="flex justify-between text-on-surface-variant/90 font-bold">
              <span>Base Fare ({passengers.length})</span>
              <span>₹{totalBaseFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant/90 font-bold">
              <span>Reservation</span>
              <span>₹{totalReservationFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant/90 font-bold">
              <span>Convenience Fee</span>
              <span>₹{convenienceFeeFixed.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between font-serif text-lg font-bold text-on-background pt-4 border-t border-black/5 normal-case tracking-normal">
              <span>Total Fare</span>
              <span>₹{totalFare.toFixed(2)}</span>
            </div>
          </div>

          {/* Confirm & Back Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleProceed}
              className="w-full bg-secondary hover:bg-primary text-white py-4 rounded-none font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer"
            >
              Confirm &amp; Pay
            </button>
            <button
              onClick={onBack}
              className="w-full bg-[#E8E6E1]/40 hover:bg-[#E8E6E1]/80 text-[#1A1A1A] py-3.5 rounded-none font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer border border-black/10"
            >
              Back to Train Search
            </button>
          </div>

          <p className="text-center font-sans text-[10px] uppercase tracking-wider text-on-surface-variant/60 mt-6 leading-normal px-2">
            By confirming, you agree to our <a className="underline text-primary hover:opacity-80" href="#">Terms</a> and <a className="underline text-primary hover:opacity-80" href="#">Refund Policy</a>.
          </p>
        </div>

        {/* Assistance Card */}
        <div className="bg-[#FDFCFB]/80 rounded-none p-5 border border-black/5 flex items-center gap-4">
          <div>
            <p className="font-serif font-bold text-sm text-on-background">Need Booking Help?</p>
            <p className="text-on-surface-variant/80 text-xs font-semibold">1800-RAIL-SANCT (toll-free)</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
