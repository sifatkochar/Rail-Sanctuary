/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Booking } from '../types';
import { CheckCircle2, Ticket, QrCode, Printer, BookOpen, Calendar, HelpCircle } from 'lucide-react';

interface TicketViewProps {
  booking: Booking;
  onBookAnother: () => void;
  onGoToBookings: () => void;
}

export default function TicketView({ booking, onBookAnother, onGoToBookings }: TicketViewProps) {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Success Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-secondary-container text-secondary rounded-none flex items-center justify-center mx-auto shadow-sm border border-black/5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.35em] font-sans font-bold text-[#D44D26] block">Transaction Completed</span>
        <h2 className="font-serif text-3xl font-bold text-secondary">Booking Confirmed!</h2>
        <p className="text-on-surface-variant/80 font-serif italic text-sm">
          Your reservation is successfully secured. Boarding pass details are available below.
        </p>
      </div>

      {/* Ticket Wrapper (Editorial layout) */}
      <div className="bg-white rounded-none border border-black/5 custom-shadow overflow-hidden print:border-0 print:shadow-none">
        
        {/* Ticket Header */}
        <div className="bg-[#1A1A1A] text-white p-6 md:p-8 flex justify-between items-baseline relative rounded-none">
          <div>
            <span className="bg-white/10 px-3 py-1 rounded-none text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#D44D26]">
              Indian Railways Ticket
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold mt-3 text-white">{booking.trainName}</h3>
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/70 mt-1.5">{booking.trainNumber} • {booking.className}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-white/60 font-bold block uppercase tracking-wider">PNR Reference</span>
            <span className="font-mono text-sm md:text-base font-bold tracking-widest uppercase text-[#D44D26]">{booking.id}</span>
          </div>

          {/* Minimal visual border slit for tear effect */}
          <div className="absolute w-2 h-4 bg-background rounded-none -bottom-2 -left-1 border-r border-black/5"></div>
          <div className="absolute w-2 h-4 bg-background rounded-none -bottom-2 -right-1 border-l border-black/5"></div>
        </div>

        {/* Journey timing and Stations */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 items-center gap-6 bg-[#FDFCFB] relative">
          <div className="md:col-span-4">
            <span className="text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-widest block">Departure</span>
            <p className="font-serif text-2xl font-bold text-on-background mt-1">{booking.departTime}</p>
            <p className="font-sans text-xs uppercase tracking-widest font-bold text-primary mt-1">{booking.fromCode}</p>
            <p className="font-sans text-xs text-on-surface-variant/70 leading-normal truncate">{booking.fromName}</p>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <span className="font-serif italic text-xs font-bold text-[#1A1A1A] bg-[#E8E6E1]/50 px-3 py-1 rounded-none border border-black/10">
              {booking.date}
            </span>
            <div className="h-[1px] bg-black/10 w-4/5 mt-3 relative">
              <div className="absolute w-1.5 h-1.5 rounded-none bg-[#D44D26] -top-[3px] left-1/2 -ml-[3px]"></div>
            </div>
          </div>

          <div className="md:col-span-4 text-left md:text-right">
            <span className="text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-widest block">Arrival</span>
            <p className="font-serif text-2xl font-bold text-on-background mt-1">{booking.arriveTime}</p>
            <p className="font-sans text-xs uppercase tracking-widest font-bold text-primary mt-1">{booking.toCode}</p>
            <p className="font-sans text-xs text-on-surface-variant/70 leading-normal truncate">{booking.toName}</p>
          </div>

          {/* Dotted separator line */}
          <div className="absolute left-6 right-6 bottom-0 border-b border-dashed border-black/10"></div>
        </div>

        {/* Passenger details & QR Code */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-white">
          
          {/* Passenger Roster */}
          <div className="md:col-span-8 space-y-4">
            <h4 className="font-serif font-bold text-base text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-[#D44D26]" />
              Passenger Boarding List
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-black/10 text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-widest">
                    <th className="pb-2">Passenger</th>
                    <th className="pb-2">Age/Gender</th>
                    <th className="pb-2 text-right">Coach / Seat No.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {booking.passengers.map((p, idx) => (
                    <tr key={p.id} className="text-on-surface">
                      <td className="py-3 font-bold">
                        {p.name}
                      </td>
                      <td className="py-3 text-on-surface-variant/80 font-serif italic text-xs">
                        {p.age} Yrs / {p.gender}
                      </td>
                      <td className="py-3 text-right font-mono text-xs font-bold text-[#D44D26]">
                        Coach {booking.classCode === 'SL' ? 'S3' : booking.classCode === 'CC' ? 'C2' : 'B1'} / Seat #{p.seatNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* QR Code Graphic panel */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 border border-black/10 rounded-none bg-[#FDFCFB]/80 relative">
            <div className="p-3 bg-white border border-black/10 rounded-none">
              <QrCode className="w-24 h-24 text-on-background" />
            </div>
            <span className="text-[10px] font-bold uppercase text-primary mt-4 tracking-widest text-center">
              Scan at Platform
            </span>
            <span className="text-[9px] font-serif italic text-on-surface-variant/80 text-center mt-1 leading-normal">
              Digital Boarding QR Code
            </span>
          </div>
        </div>

        {/* Fare Summary bar inside ticket */}
        <div className="bg-[#E8E6E1]/30 px-6 py-4 flex justify-between items-center text-[10px] uppercase tracking-wider text-on-surface-variant/85 border-t border-black/5">
          <span>Booking Date: {booking.bookingDate}</span>
          <span>Status: <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-none font-bold uppercase text-[9px]">{booking.status}</span></span>
          <span className="font-serif font-bold text-sm text-primary">Fare Paid: ₹{booking.totalFare.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 bg-white hover:bg-[#E8E6E1]/40 border border-black/10 text-[#1A1A1A] py-3.5 rounded-none font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-primary" />
          Print / PDF Save
        </button>
        <button
          onClick={onGoToBookings}
          className="flex items-center justify-center gap-2 bg-white hover:bg-[#E8E6E1]/40 border border-black/10 text-[#1A1A1A] py-3.5 rounded-none font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-primary" />
          Go to My Bookings
        </button>
        <button
          onClick={onBookAnother}
          className="flex items-center justify-center gap-2 bg-secondary hover:bg-primary text-white py-3.5 rounded-none font-sans font-bold text-xs uppercase tracking-[0.15em] transition-all duration-200 cursor-pointer"
        >
          Book Another Train
        </button>
      </div>

      {/* Advisory card */}
      <div className="p-4 bg-primary-container/10 border border-primary/20 rounded-none flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-xs text-on-primary-container leading-relaxed font-medium">
          <p className="font-sans text-xs uppercase tracking-wider font-bold text-primary">Boarding Advisory</p>
          <p className="font-serif italic text-xs leading-relaxed text-on-primary-container/90 mt-1">
            Please reach the platform at least 30 minutes before departure time. You can scan this QR code or show the physical print of this boarding pass along with your ID card (Aadhar, Driving License, or PAN Card) to the ticket checking examiner.
          </p>
        </div>
      </div>
    </div>
  );
}
