# AutoCare Repair Management System

## Overview

AutoCare is a web-based management system built for auto repair shops to track vehicle repair jobs from intake to pickup. It replaces the paper logbooks and scattered spreadsheets many small repair shops still rely on, giving staff a single place to book new jobs, monitor progress, and see performance at a glance.

## Problem Statement

Small auto repair shops often track jobs manually — on paper tickets, whiteboards, or basic spreadsheets. This makes it hard to know how many jobs are currently pending vs. in progress, easy to lose track of a customer's job status, and there's no simple way to notify a customer when their vehicle is ready. As a shop takes on more work, this manual tracking becomes error-prone and time-consuming.

## Solution

AutoCare gives a repair shop a lightweight, browser-based system to manage the full lifecycle of a repair job:

- Staff can log in securely and book a new repair job with full customer, vehicle, and repair details.
- Every job automatically appears on a live Workshop queue that can be searched and filtered by customer, status, or mechanic.
- Job status updates (Pending → In Progress → Completed → Collected) are one click away, and the customer is notified automatically when their job status changes.
- A dashboard and analytics page summarize job counts and the most common repair types, so shop owners can see workload at a glance.

## Technologies Used

- **HTML5** — structures all 5 pages of the application.
- **CSS3** — custom styling with CSS variables for theming, CSS Grid/Flexbox for layout, and media queries for full responsiveness across mobile, tablet, and desktop.
- **JavaScript (vanilla, no frameworks)** — powers all interactivity: form validation, DOM rendering, search/filtering, and the mobile nav toggle.
- **Web Storage API (localStorage)** — persists users, repair jobs, and notification logs directly in the browser, no backend required.
- **Font Awesome** — icon set used throughout the navigation and UI.
- **Google Fonts (Inter)** — primary typeface.

## Key Features

- **Dynamic Content**: The Dashboard, Workshop queue, and Analytics report are all built by reading job data out of `localStorage` and rendering it into the DOM at runtime — nothing on those pages is hardcoded HTML.
- **API Integration**: `NotificationAPI.js` is a custom-built API layer that simulates sending a customer notification email. It returns a real Promise with an artificial network delay and can reject (e.g. if no email is on file), so the rest of the app has to handle it exactly like a real third-party API call — including showing the user an on-screen message if the "send" fails.
- **Local Storage**: User accounts, repair jobs, and a notification log all persist in the browser via `localStorage`, so data survives page refreshes and browser restarts.
- **Error Handling**: Form inputs are validated before a job or account is created (e.g. required fields, numeric cost checks, password length/match). Failed notification "sends" are caught and surfaced to the user as an on-screen pop-up rather than failing silently.
- **Responsive Design**: A custom hamburger nav collapses the menu on small screens, and layout (stat cards, tables, forms) reflows across three breakpoints — desktop, tablet, and mobile.

## Instructions

### How to Run

1. Download or clone this repository
 git clone https://github.com/dugsiiyeinc/Auto-Care-Repair-Management-System.git.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari) — no build step or server required.
3. Sign up for an account, then log in to access the Dashboard, Book a Service, Workshop, and Analytics Report pages.

### Live Demo

### Dependencies

All dependencies are loaded via CDN, so no installation step is needed:

- [Font Awesome 6.5.1](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css) — icons
- [Google Fonts – Inter](https://fonts.googleapis.com/css2?family=Inter) — typography

## Future Improvements

- Replace the simulated `NotificationAPI` with a real email/SMS provider (e.g. EmailJS or Twilio) once a backend is introduced.
- Move data storage from `localStorage` to a real backend + database, so data can sync across devices instead of being tied to one browser.
- Add invoice/PDF generation for completed jobs.
- Add role-based accounts (e.g. mechanic vs. shop owner) with different permissions.

## Developer

**[ Idil Mohamuod ]**


