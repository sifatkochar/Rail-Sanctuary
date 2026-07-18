/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchStep from './components/SearchStep';
import PassengersStep from './components/PassengersStep';
import PaymentStep from './components/PaymentStep';
import TicketView from './components/TicketView';
import MyBookings from './components/MyBookings';
import Schedules from './components/Schedules';
import Stations from './components/Stations';
import { Train, TrainClass, Passenger, Booking } from './types';
import { Check, ArrowRight } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'booking' | 'bookings' | 'stations' | 'schedules' | 'ticket'>('booking');
  const [bookingStep, setBookingStep] = useState<number>(2); // Starts at step 2 to showcase the exact Passenger Details screen on load!

  // Default selections matching mockup on initial render
  const [selectedTrain, setSelectedTrain] = useState<Train>({
    id: '12124',
    name: 'Deccan Queen Exp',
    number: 'Train #12124',
    fromCode: 'PUNE',
    fromName: 'Pune Junction',
    toCode: 'CSMT',
    toName: 'Mumbai CSMT',
    departTime: '07:15',
    arriveTime: '10:25',
    duration: '3h 10m',
    classes: [
      { code: '3E', name: '3rd AC Economy', baseFare: 845, availableSeats: 32 },
      { code: 'CC', name: 'AC Chair Car', baseFare: 495, availableSeats: 48 },
      { code: 'SL', name: 'Sleeper Class', baseFare: 295, availableSeats: 15 },
    ],
  });

  const [selectedClass, setSelectedClass] = useState<TrainClass>({
    code: '3E',
    name: '3rd AC Economy',
    baseFare: 845,
    availableSeats: 32,
  });

  const [selectedDate, setSelectedDate] = useState<string>('2024-10-24');

  // Pre-load Rahul Sharma from mockup as passenger 1
  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: '1', name: 'Rahul Sharma', age: '28', gender: 'Male', seatNumber: 5 }
  ]);

  // Prepopulate bookings list with a past booking to feel alive
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('railsanctuary_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'PNR8320491',
        trainName: 'Deccan Queen Exp',
        trainNumber: 'Train #12124',
        date: '2024-09-10',
        classCode: '3E',
        className: '3rd AC Economy',
        passengers: [
          { id: 'p-prev-1', name: 'Rahul Sharma', age: '28', gender: 'Male', seatNumber: 8 }
        ],
        fromCode: 'PUNE',
        fromName: 'Pune Junction',
        toCode: 'CSMT',
        toName: 'Mumbai CSMT',
        departTime: '07:15',
        arriveTime: '10:25',
        baseFare: 845.00,
        reservationCharges: 40.00,
        convenienceFee: 17.70,
        totalFare: 902.70,
        status: 'Confirmed',
        bookingDate: '2024-09-08'
      }
    ];
  });

  const [activeTicket, setActiveTicket] = useState<Booking | null>(null);

  // Sync bookings to localStorage
  useEffect(() => {
    localStorage.setItem('railsanctuary_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleSelectTrainClass = (train: Train, cls: TrainClass, date: string) => {
    setSelectedTrain(train);
    setSelectedClass(cls);
    setSelectedDate(date);
    
    // Set default passenger matching the selected seat count
    setPassengers([
      { id: '1', name: '', age: '', gender: 'Male', seatNumber: 5 }
    ]);

    setBookingStep(2);
    setView('booking');
  };

  const handlePassengerConfirm = () => {
    setBookingStep(3);
  };

  const handlePaymentSuccess = (paymentMethod: string) => {
    // Generate new booking record
    const baseFarePerPassenger = selectedClass.baseFare;
    const reservationFeePerPassenger = 40.0;
    const convenienceFeeFixed = 17.70;

    const totalBaseFare = baseFarePerPassenger * passengers.length;
    const totalReservationFee = reservationFeePerPassenger * passengers.length;
    const finalFare = totalBaseFare + totalReservationFee + convenienceFeeFixed;

    const pnr = 'PNR' + Math.floor(1000000 + Math.random() * 9000000);
    const todayStr = new Date().toISOString().split('T')[0];

    const newBooking: Booking = {
      id: pnr,
      trainName: selectedTrain.name,
      trainNumber: selectedTrain.number,
      date: selectedDate,
      classCode: selectedClass.code,
      className: selectedClass.name,
      passengers: [...passengers],
      fromCode: selectedTrain.fromCode,
      fromName: selectedTrain.fromName,
      toCode: selectedTrain.toCode,
      toName: selectedTrain.toName,
      departTime: selectedTrain.departTime,
      arriveTime: selectedTrain.arriveTime,
      baseFare: totalBaseFare,
      reservationCharges: totalReservationFee,
      convenienceFee: convenienceFeeFixed,
      totalFare: finalFare,
      status: 'Confirmed',
      bookingDate: todayStr,
    };

    setBookings([newBooking, ...bookings]);
    setActiveTicket(newBooking);
    setView('ticket');
    setBookingStep(1); // Reset step funnel
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status: 'Cancelled' as const };
      }
      return b;
    });
    setBookings(updated);
  };

  const handleViewTicket = (booking: Booking) => {
    setActiveTicket(booking);
    setView('ticket');
  };

  const handleNavigateToView = (targetView: 'booking' | 'bookings' | 'stations' | 'schedules') => {
    setView(targetView);
    // If navigating back to booking flow, keep or reset step
    if (targetView === 'booking') {
      setBookingStep(1);
    }
  };

  return (
    <div className="text-on-background font-sans min-h-screen bg-background flex flex-col justify-between selection:bg-primary-container/40 selection:text-primary">
      
      {/* Top Navigation Bar */}
      <Navbar currentView={view === 'ticket' ? 'bookings' : view} setView={handleNavigateToView} bookingStep={bookingStep} />

      {/* Main App Canvas */}
      <main className="max-w-[1200px] w-full mx-auto px-6 py-10 flex-grow">
        
        {/* Progress Stepper - Only display when in booking view and on active booking flow steps */}
        {view === 'booking' && (
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              
              {/* Step 1: Search */}
              <button
                onClick={() => setBookingStep(1)}
                className="flex flex-col items-center gap-2 cursor-pointer focus:outline-none group"
              >
                <div className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 rounded-none ${
                  bookingStep > 1 
                    ? 'bg-secondary-container text-on-secondary-container border-black/5' 
                    : 'bg-primary text-white font-serif font-extrabold border-primary ring-4 ring-primary/5'
                }`}>
                  {bookingStep > 1 ? <Check className="w-4 h-4" /> : <span className="font-serif">I</span>}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-sans font-bold ${bookingStep === 1 ? 'text-primary' : 'text-on-surface-variant/80'}`}>
                  Search
                </span>
              </button>

              <div className={`h-[1px] flex-1 mx-4 transition-all duration-300 ${bookingStep > 1 ? 'bg-primary/40' : 'bg-black/5'}`}></div>

              {/* Step 2: Passengers */}
              <button
                onClick={() => {
                  if (bookingStep > 1) setBookingStep(2);
                }}
                disabled={bookingStep < 2}
                className={`flex flex-col items-center gap-2 focus:outline-none ${bookingStep >= 2 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <div className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 rounded-none ${
                  bookingStep === 2 
                    ? 'bg-primary text-white font-serif font-extrabold border-primary ring-4 ring-primary/5'
                    : bookingStep > 2
                      ? 'bg-secondary-container text-on-secondary-container border-black/5'
                      : 'bg-surface-container text-on-surface-variant/50 border-black/5'
                }`}>
                  {bookingStep > 2 ? <Check className="w-4 h-4" /> : <span className="font-serif">II</span>}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-sans font-bold ${
                  bookingStep === 2 
                    ? 'text-primary' 
                    : bookingStep > 2 
                      ? 'text-on-surface-variant/80' 
                      : 'text-on-surface-variant/50'
                }`}>
                  Passengers
                </span>
              </button>

              <div className={`h-[1px] flex-1 mx-4 transition-all duration-300 ${bookingStep > 2 ? 'bg-primary/40' : 'bg-black/5'}`}></div>

              {/* Step 3: Payment */}
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 rounded-none ${
                  bookingStep === 3 
                    ? 'bg-primary text-white font-serif font-extrabold border-primary ring-4 ring-primary/5' 
                    : 'bg-surface-container text-on-surface-variant/50 border-black/5'
                }`}>
                  <span className="font-serif">III</span>
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-sans font-bold ${bookingStep === 3 ? 'text-primary font-black' : 'text-on-surface-variant/50'}`}>
                  Payment
                </span>
              </div>
            </div>
          </div>
        )}

        {/* View Router */}
        <div className="w-full">
          {view === 'booking' && (
            <>
              {bookingStep === 1 && (
                <SearchStep onSelectTrainClass={handleSelectTrainClass} />
              )}
              {bookingStep === 2 && (
                <PassengersStep
                  selectedTrain={selectedTrain}
                  selectedClass={selectedClass}
                  date={selectedDate}
                  passengers={passengers}
                  setPassengers={setPassengers}
                  onConfirm={handlePassengerConfirm}
                  onBack={() => setBookingStep(1)}
                />
              )}
              {bookingStep === 3 && (
                <PaymentStep
                  totalFare={selectedClass.baseFare * passengers.length + 40.0 * passengers.length + 17.7}
                  onPaymentSuccess={handlePaymentSuccess}
                  onBack={() => setBookingStep(2)}
                />
              )}
            </>
          )}

          {view === 'bookings' && (
            <MyBookings
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onViewTicket={handleViewTicket}
              onSearchTrains={() => handleNavigateToView('booking')}
            />
          )}

          {view === 'schedules' && <Schedules />}

          {view === 'stations' && <Stations />}

          {view === 'ticket' && activeTicket && (
            <TicketView
              booking={activeTicket}
              onBookAnother={() => handleNavigateToView('booking')}
              onGoToBookings={() => handleNavigateToView('bookings')}
            />
          )}
        </div>
      </main>

      {/* Footer Navigation Bar */}
      <Footer setView={handleNavigateToView} />
    </div>
  );
}
