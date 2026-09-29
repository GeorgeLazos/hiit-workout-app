# HIIT Workout App

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

> A lightweight High-Intensity Interval Training (HIIT) web app that lets users build their own activities, compose them into workouts, run them with a guided timer, and review their training history.

Built as a full‑stack JavaScript project with a vanilla HTML/CSS/JS front end and a Node.js + Express back end.

---

## Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [AI Assistance](#ai-assistance)
- [Future Ideas](#future-ideas)
- [Known Bugs](#known-bugs)
- [License](#license)

---

## About

The HIIT Workout App is designed to make interval training simple and customisable. Users can:

- Define their own **activities** (name, duration, optional notes).
- Combine activities into reusable **workouts**.
- Run a workout at one of three **difficulty levels**, with a built‑in timer that handles work and rest intervals.
- Track **past workouts** to stay motivated.

The goal is to provide a clean, distraction‑free training experience that runs entirely in the browser, with the server providing persistence and routing.

## Key Features

### Create Activity
Build activities from scratch via the **Create Activity** page by entering a name, duration, and optional notes. The page lists all existing activities and lets you delete any of them. Input validation prevents invalid data from being saved.

### Create a Workout
Compose workouts from your activity library on the **Create Workout** page. Click an activity in the *Activities* list to add it to your new workout, or click it again in the *New Workout* section to remove it — a tap‑to‑add / tap‑to‑remove design chosen for speed and simplicity. Validation ensures workouts have a name and at least one activity.

### Start a Workout
The landing page hosts the **Start a Workout** section — chosen as the home‑screen feature because it is the app's primary use case. Pick a workout, choose one of three difficulty levels, and press **Start**. You are taken to a dedicated timer page where you can pause or quit at any time. When the workout finishes, the page redirects you back to the main menu.

### Past Workouts
The **Past Workouts** page shows a counter of completed workouts and a chronological list of every workout finished. This is intended both as a motivator and as a foundation for future achievements such as medals or streaks.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript     |
| Backend  | Node.js, Express 4                  |
| Tooling  | ESLint (`eslint-config-portsoc`)    |

## Project Structure

```
workout_app/
├── client/         # Front-end assets
│   ├── images/
│   ├── pages/      # HTML pages
│   ├── scripts/    # Client-side JS (timer, page logic)
│   └── styles/     # CSS stylesheets
├── server/
│   └── server.js   # Express server entry point
├── package.json
├── LICENSE
└── README.md
```

## Installation

**Prerequisites:** [Node.js](https://nodejs.org/) 18 or later and npm.

1. Clone the repository:
   ```bash
   git clone https://github.com/GeorgeLazos/hiit-workout-app.git
   cd hiit-workout-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   If needed:
   ```bash
   npm run setup
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Usage

1. From the landing page, create at least one **Activity**.
2. Combine activities into a **Workout**.
3. Select the workout, pick a difficulty level, and press **Start**.
4. Follow the on‑screen timer through each interval — pause or exit at any time.
5. Visit **Past Workouts** to review your history.

## AI Assistance

This project was developed with selective AI assistance, primarily for learning JavaScript (a first‑time language for the author at the time of writing).

- **JavaScript** — used to debug the timer logic around `setInterval()` and the `delay()` function in `timer.js`, and to learn JS syntax via GitHub Copilot's *Explain* feature.
- **CSS** — used to learn how to highlight buttons on hover.

<details>
<summary>Example prompt sequences</summary>

**Timer prompts**

> *How does setInterval() work?*
>
> `setInterval()` repeatedly calls a function at a fixed delay (in ms) and returns an interval ID that can be passed to `clearInterval()` to stop it.

> *How does setTimeout() work?*
>
> `setTimeout()` schedules a function to run once after a given delay (in ms). It is non‑blocking — surrounding code continues to execute while the timer counts down.

**CSS prompts**

> *How can I make a button highlighted when I hover over it?*
>
> Use the `:hover` pseudo‑class to change `background-color` and `color` on hover.

</details>

## Future Ideas

- More granular difficulty system with additional levels.
- Persistent database storage in place of in‑memory data.
- Calorie tracking.
- Online features: leaderboards and group workouts.
- Inline activity creation from within the workout builder, via a modal.
- Achievement medals based on workouts completed.

## Known Bugs

- On **High** difficulty, rest periods are longer than on lower difficulties — making sessions easier rather than harder (and vice versa).

## License

This project is released under the [MIT License](LICENSE).

© 2026 Georgios Lazos
