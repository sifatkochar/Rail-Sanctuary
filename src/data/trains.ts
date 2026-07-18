/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Station, Train } from '../types';

export const STATIONS: Station[] = [
  { code: 'PUNE', name: 'Pune Junction' },
  { code: 'CSMT', name: 'Mumbai CSMT' },
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'SBC', name: 'Bengaluru City' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'HWH', name: 'Howrah Junction' },
];

export const TRAINS: Train[] = [
  {
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
  },
  {
    id: '12128',
    name: 'Pune Mumbai Intercity',
    number: 'Train #12128',
    fromCode: 'PUNE',
    fromName: 'Pune Junction',
    toCode: 'CSMT',
    toName: 'Mumbai CSMT',
    departTime: '17:55',
    arriveTime: '21:05',
    duration: '3h 10m',
    classes: [
      { code: 'CC', name: 'AC Chair Car', baseFare: 510, availableSeats: 25 },
      { code: 'SL', name: 'Sleeper Class', baseFare: 300, availableSeats: 40 },
    ],
  },
  {
    id: '12122',
    name: 'Sinhagad Express',
    number: 'Train #12122',
    fromCode: 'PUNE',
    fromName: 'Pune Junction',
    toCode: 'CSMT',
    toName: 'Mumbai CSMT',
    departTime: '06:10',
    arriveTime: '09:55',
    duration: '3h 45m',
    classes: [
      { code: '3E', name: '3rd AC Economy', baseFare: 800, availableSeats: 18 },
      { code: 'CC', name: 'AC Chair Car', baseFare: 450, availableSeats: 50 },
    ],
  },
  {
    id: '22691',
    name: 'Rajdhani Express',
    number: 'Train #22691',
    fromCode: 'SBC',
    fromName: 'Bengaluru City',
    toCode: 'NDLS',
    toName: 'New Delhi',
    departTime: '20:00',
    arriveTime: '05:55',
    duration: '33h 55m',
    classes: [
      { code: '1A', name: 'AC First Class', baseFare: 4850, availableSeats: 6 },
      { code: '2A', name: 'AC 2 Tier', baseFare: 3200, availableSeats: 14 },
      { code: '3A', name: 'AC 3 Tier', baseFare: 2450, availableSeats: 28 },
    ],
  },
  {
    id: '12621',
    name: 'Tamil Nadu Express',
    number: 'Train #12621',
    fromCode: 'MAS',
    fromName: 'Chennai Central',
    toCode: 'NDLS',
    toName: 'New Delhi',
    departTime: '22:00',
    arriveTime: '07:40',
    duration: '33h 40m',
    classes: [
      { code: '2A', name: 'AC 2 Tier', baseFare: 3100, availableSeats: 8 },
      { code: '3A', name: 'AC 3 Tier', baseFare: 2200, availableSeats: 22 },
      { code: 'SL', name: 'Sleeper Class', baseFare: 850, availableSeats: 10 },
    ],
  },
  {
    id: '12301',
    name: 'Howrah Rajdhani',
    number: 'Train #12301',
    fromCode: 'HWH',
    fromName: 'Howrah Junction',
    toCode: 'NDLS',
    toName: 'New Delhi',
    departTime: '16:50',
    arriveTime: '10:00',
    duration: '17h 10m',
    classes: [
      { code: '1A', name: 'AC First Class', baseFare: 4390, availableSeats: 4 },
      { code: '2A', name: 'AC 2 Tier', baseFare: 3050, availableSeats: 12 },
      { code: '3A', name: 'AC 3 Tier', baseFare: 2150, availableSeats: 30 },
    ],
  },
  {
    id: '12245',
    name: 'Duronto Express',
    number: 'Train #12245',
    fromCode: 'HWH',
    fromName: 'Howrah Junction',
    toCode: 'SBC',
    toName: 'Bengaluru City',
    departTime: '10:50',
    arriveTime: '16:00',
    duration: '29h 10m',
    classes: [
      { code: '2A', name: 'AC 2 Tier', baseFare: 3400, availableSeats: 10 },
      { code: '3A', name: 'AC 3 Tier', baseFare: 2500, availableSeats: 40 },
      { code: 'SL', name: 'Sleeper Class', baseFare: 980, availableSeats: 65 },
    ],
  }
];

// Helper to generate dynamic search results between any stations
export function getTrainsForRoute(from: string, to: string): Train[] {
  // First look for exact match
  const matched = TRAINS.filter(t => t.fromCode === from && t.toCode === to);
  if (matched.length > 0) return matched;

  // Otherwise, synthesize a few trains dynamically based on the distance/station names to feel real and responsive
  if (from === to) return [];

  const fromStation = STATIONS.find(s => s.code === from);
  const toStation = STATIONS.find(s => s.code === to);
  if (!fromStation || !toStation) return [];

  return [
    {
      id: `100${from.charCodeAt(0)}${to.charCodeAt(0)}`,
      name: `${fromStation.name.split(' ')[0]} ${toStation.name.split(' ')[0]} SF Express`,
      number: `Train #129${from.charCodeAt(0) % 10}${to.charCodeAt(0) % 10}`,
      fromCode: from,
      fromName: fromStation.name,
      toCode: to,
      toName: toStation.name,
      departTime: '08:30',
      arriveTime: '19:45',
      duration: '11h 15m',
      classes: [
        { code: '3E', name: '3rd AC Economy', baseFare: 1250, availableSeats: 45 },
        { code: '2A', name: 'AC 2 Tier', baseFare: 1950, availableSeats: 12 },
        { code: 'SL', name: 'Sleeper Class', baseFare: 550, availableSeats: 80 },
      ],
    },
    {
      id: `200${from.charCodeAt(0)}${to.charCodeAt(0)}`,
      name: `${fromStation.name.split(' ')[0]} ${toStation.name.split(' ')[0]} Humsafar`,
      number: `Train #229${from.charCodeAt(0) % 10}${to.charCodeAt(0) % 10}`,
      fromCode: from,
      fromName: fromStation.name,
      toCode: to,
      toName: toStation.name,
      departTime: '21:15',
      arriveTime: '09:00',
      duration: '11h 45m',
      classes: [
        { code: '3E', name: '3rd AC Economy', baseFare: 1350, availableSeats: 24 },
        { code: 'SL', name: 'Sleeper Class', baseFare: 600, availableSeats: 35 },
      ],
    }
  ];
}
