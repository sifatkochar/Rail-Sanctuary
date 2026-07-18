# Rail Sanctuary

A web-based Indian Railways ticket booking application mockup — built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS v4**.

Designed with [Stitch](https://stitch.withgoogle.com/), built with [AI Studio](https://aistudio.google.com/) and [Antigravity](https://antigravity.google/).

## Features

- Search trains by origin, destination, and date
- Browse ticket classes with live fare and seat availability
- Add and manage passenger details
- Mock payment flow with a detailed fare breakdown
- Printable ticket view with PNR and confirmation status
- Booking history with a cancellation option
- Schedules and station code lookup

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS v4**
- Fonts: Playfair Display (headings), Atkinson Hyperlegible Next (body)
- State managed in React and persisted to `localStorage`

## Project Structure

```
railsanctuary/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── types.ts
    ├── index.css
    ├── data/
    │   └── trains.ts
    └── components/
        ├── Navbar.tsx
        ├── Footer.tsx
        ├── SearchStep.tsx
        ├── PassengersStep.tsx
        ├── PaymentStep.tsx
        ├── TicketView.tsx
        ├── MyBookings.tsx
        ├── Schedules.tsx
        └── Stations.tsx
```

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

## Note

This is a **mockup/demo application** — payments and bookings are simulated and not connected to any real railway system.

## This web application was built as a hands-on project during Google's Build with AI Bootcamp.