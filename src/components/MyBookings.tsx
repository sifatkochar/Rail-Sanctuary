/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Booking } from '../types';
import { Calendar, Trash2, ArrowRight, ShieldAlert, FileText, CheckCircle2, Ticket } from 'lucide-react';

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onViewTicket: (booking: Booking) => void;
  onSearchTrains: () => void;
}

export default function MyBookings({
  bookings,
  onCancelBooking,
  onViewTicket,
  onSearchTrains,
}: MyBookingsProps) {
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const confirmCancellation = (bookingId: string) => {
    onCancelBooking(bookingId);
    setCancellingId(null);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 border-b border-black/5 pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-primary mb-1 block">Account Records</span>
          <h2 className="font-serif text-3xl font-bold text-on-background">My Bookings</h2>
          <p className="text-on-surface-variant/80 font-serif text-sm italic mt-1">
            Review your digital ticket history, seat reservations, and cancellations.
          </p>
        </div>
        <button
          onClick={onSearchTrains}
          className="bg-secondary hover:bg-primary text-white font-sans font-bold text-xs uppercase tracking-[0.15em] px-5 py-3 rounded-none transition-all cursor-pointer"
        >
          Book New Ticket
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-none p-16 text-center border border-black/5 custom-shadow max-w-lg mx-auto space-y-6">
          <div className="w-16 h-16 bg-[#E8E6E1]/55 flex items-center justify-center rounded-none mx-auto text-[#1A1A1A]">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-on-background">No Active Bookings</h3>
          <p className="text-on-surface-variant/80 font-serif text-sm italic max-w-sm mx-auto leading-relaxed">
            You haven't purchased any tickets yet. Explore comfort travel routes and secure seat reservations easily.
          </p>
          <button
            onClick={onSearchTrains}
            className="bg-secondary hover:bg-primary text-white font-sans font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-none transition-colors cursor-pointer"
          >
            Find Trains Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {bookings.map((booking) => {
            const isConfirmed = booking.status === 'Confirmed';
            
            return (
              <div
                key={booking.id}
                className={`bg-white rounded-none border ${
                  isConfirmed ? 'border-black/5 hover:border-primary/20' : 'border-black/5 bg-neutral-50/50'
                } p-6 md:p-8 custom-shadow relative overflow-hidden transition-all duration-200`}
              >
                {/* Status bar accent */}
                <div className={`absolute top-0 left-0 bottom-0 w-1 ${isConfirmed ? 'bg-primary' : 'bg-[#E8E6E1]'}`}></div>

                {/* Card Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 pb-4 border-b border-black/5">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono text-xs font-bold text-[#1A1A1A] bg-[#E8E6E1]/50 border border-black/10 px-2.5 py-0.5 rounded-none uppercase">
                        PNR #{booking.id}
                      </span>
                      <span className={`font-sans text-[9px] px-2 py-0.5 rounded-none uppercase tracking-widest font-extrabold ${
                        isConfirmed 
                          ? 'bg-secondary-container text-on-secondary-container' 
                          : 'bg-error-container text-on-error-container'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold mt-3 text-on-background">{booking.trainName}</h3>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60 mt-1">{booking.trainNumber} • {booking.className}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-extrabold uppercase text-on-surface-variant tracking-wider block">Booking Date</span>
                    <p className="font-serif text-sm font-bold text-primary mt-1">{booking.bookingDate}</p>
                  </div>
                </div>

                {/* Journey timing info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-8">
                  <div className="md:col-span-4">
                    <p className="font-serif text-3xl font-medium text-on-background">{booking.departTime}</p>
                    <p className="font-sans text-xs uppercase tracking-widest font-bold text-primary mt-1">{booking.fromCode}</p>
                    <p className="font-sans text-xs text-on-surface-variant/70 truncate">{booking.fromName}</p>
                  </div>

                  <div className="md:col-span-4 flex items-center justify-center gap-3 text-on-surface-variant/75">
                    <div className="h-[1px] bg-black/10 flex-1"></div>
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-serif italic text-xs font-bold text-[#1A1A1A]">{booking.date}</span>
                    <div className="h-[1px] bg-black/10 flex-1"></div>
                  </div>

                  <div className="md:col-span-4 text-left md:text-right">
                    <p className="font-serif text-3xl font-medium text-on-background">{booking.arriveTime}</p>
                    <p className="font-sans text-xs uppercase tracking-widest font-bold text-primary mt-1">{booking.toCode}</p>
                    <p className="font-sans text-xs text-on-surface-variant/70 truncate">{booking.toName}</p>
                  </div>
                </div>

                {/* Passenger list summaries inside ticket */}
                <div className="bg-[#FDFCFB]/80 p-4 rounded-none border border-black/5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="sm:col-span-2">
                    <span className="text-[10px] font-bold uppercase text-on-surface-variant/70 tracking-wider block mb-2">Passengers</span>
                    <div className="flex flex-wrap gap-2">
                      {booking.passengers.map((p) => (
                        <span
                          key={p.id}
                          className="bg-white border border-black/10 px-2.5 py-1 rounded-none text-xs font-bold text-on-surface flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          {p.name} ({p.gender === 'Male' ? 'M' : p.gender === 'Female' ? 'F' : 'NB'} • Seat #{p.seatNumber})
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold uppercase text-on-surface-variant/70 tracking-wider block mb-1">Total Paid</span>
                    <p className="font-serif text-xl font-bold text-[#1A1A1A]">₹{booking.totalFare.toFixed(2)}</p>
                  </div>
                </div>

                {/* Operations bar */}
                <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    {cancellingId === booking.id ? (
                      <div className="p-4 bg-error-container/10 border border-error-container/30 rounded-none max-w-md animate-fade-in">
                        <div className="flex items-start gap-3">
                          <ShieldAlert className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-sans font-bold uppercase tracking-wider text-error">Confirm Cancellation?</p>
                            <p className="text-xs font-serif italic text-on-surface-variant mt-1.5 leading-relaxed">
                              A standard dynamic cancel penalty of ₹100.00 will be charged. ₹{(booking.totalFare - 100).toFixed(2)} will be refunded to your source account immediately.
                            </p>
                            <div className="flex gap-2.5 mt-3.5">
                              <button
                                onClick={() => confirmCancellation(booking.id)}
                                className="bg-error hover:bg-error/90 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-2 rounded-none cursor-pointer transition-colors"
                              >
                                Yes, Cancel
                              </button>
                              <button
                                onClick={() => setCancellingId(null)}
                                className="bg-white hover:bg-[#E8E6E1]/30 border border-black/10 text-on-surface text-[10px] uppercase tracking-widest font-bold px-3 py-2 rounded-none cursor-pointer"
                              >
                                Keep Ticket
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      isConfirmed && (
                        <button
                          onClick={() => setCancellingId(booking.id)}
                          className="text-error hover:text-error/85 font-sans font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 cursor-pointer py-2 px-3 hover:bg-error-container/10 rounded-none transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Cancel Reservation
                        </button>
                      )
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewTicket(booking)}
                      className="bg-[#1A1A1A] hover:bg-[#D44D26] text-white font-sans font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-none transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      View Boarding Pass
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
