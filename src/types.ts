/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TrainClass {
  code: string;
  name: string;
  baseFare: number;
  availableSeats: number;
}

export interface Train {
  id: string;
  name: string;
  number: string;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  classes: TrainClass[];
}

export interface Passenger {
  id: string;
  name: string;
  age: string; // Keep as string for input and parse when calculating
  gender: string;
  seatNumber: number | null;
}

export interface Booking {
  id: string;
  trainName: string;
  trainNumber: string;
  date: string;
  classCode: string;
  className: string;
  passengers: Passenger[];
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  departTime: string;
  arriveTime: string;
  baseFare: number;
  reservationCharges: number;
  convenienceFee: number;
  totalFare: number;
  status: 'Confirmed' | 'Cancelled';
  bookingDate: string;
}

export interface Station {
  code: string;
  name: string;
}
