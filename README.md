# Weather App

## Overview

Weather App is a focused Ionic and Angular demo that searches for a city and displays its current weather. It uses Open-Meteo for city geocoding and current conditions.

## Main features

- Automatic Toronto weather on startup
- City search by button or Enter key
- Current temperature, humidity, wind speed, and readable condition
- Loading state, duplicate-request prevention, and friendly error messages
- Responsive, keyboard-accessible Ionic interface

## Technology stack

- Ionic 8
- Angular 20 with standalone components
- TypeScript and SCSS
- Angular HttpClient and RxJS
- Capacitor
- Open-Meteo APIs

Ionic supplies the mobile-friendly interface components and application shell. Angular supplies component state, templates, dependency injection, routing, forms, and HTTP communication.

## Data source

Weather and location data are provided by [Open-Meteo](https://open-meteo.com/). The app uses Open-Meteo's geocoding and forecast APIs and does not require an API key.

## Prerequisites

- Node.js compatible with the versions required by Angular 20
- npm
- Ionic CLI for the `ionic serve` command
- Git
- Chrome or Chromium for the default Karma test runner

## Setup

```bash
git clone <repository-url>
cd jsframeworkassign
npm install
ionic serve
```

Open the local URL printed by the Ionic CLI.

## Commands

Production build:

```bash
npm run build -- --configuration production
```

Tests:

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

Lint:

```bash
npm run lint
```

## Project structure

```text
src/
  app/
    home/       Home page, UI, state, and component tests
    services/   Typed Open-Meteo HTTP service and tests
  assets/       Static application assets
  theme/        Ionic theme variables
  index.html    Browser entry document
```

## City-search API flow

1. The page validates the city entered by the user.
2. The Open-Meteo geocoding API resolves the city to a name, country, latitude, and longitude.
3. The coordinates are sent to the Open-Meteo forecast API.
4. The response supplies current temperature, humidity, wind speed, and WMO weather code.
5. The page groups the WMO code into a readable condition and displays the result.

The last successful result remains visible if a later search fails.

## Manual testing

1. Start the app and confirm Toronto loads automatically.
2. Search for a valid city with the Search button.
3. Search for another city by pressing Enter.
4. Confirm the spinner appears and search controls are disabled while loading.
5. Submit an empty city and verify the validation message.
6. Search for an invalid city and verify the not-found message.
7. Disconnect the network temporarily and verify the failure message.
8. Confirm the previous successful result remains visible after an error.
9. Check the layout on narrow mobile and wider desktop viewports.

## Accessibility

The search controls have accessible labels and visible keyboard focus. Loading updates use a polite live status, errors use an alert, decorative icons are hidden from assistive technology, and text colors are selected for clear contrast.

## Troubleshooting

- If `ionic` is not recognized, install the Ionic CLI or run the equivalent npm start script.
- If installation fails, verify the active Node.js version and retry `npm install`.
- If tests cannot launch ChromeHeadless, install Chrome or Chromium and configure `CHROME_BIN`.
- If weather requests fail, confirm the device is online and Open-Meteo is reachable.
- On Windows PowerShell systems that block `npm.ps1`, run the equivalent command with `npm.cmd`.

## Deployment

Future live URL: `https://ionic-weather-app.onrender.com/home`

## Team

- Team member 1: `Alen Thomas`
- Team member 2: `Unnikrishnan Satheeshkumar`
- Team member 3: `Vaishnav Vijayan`
- Team member 4: `Aqwin Valath Vinod`
- Team member 5: `Alice Poudel`
- Team member 6: `Alphin Xavier`

