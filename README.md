# AutoCare Repair Management System

## Overview

AutoCare is a web-based management system designed for small auto repair shops to manage vehicle repair jobs from intake to pickup.

The system replaces paper logbooks and scattered spreadsheets with a single browser-based application where staff can register customers, manage repair jobs, monitor workshop progress, and view performance reports.

## Problem Statement

Small auto repair shops often track repair jobs manually using paper tickets, whiteboards, or basic spreadsheets.

This can make it difficult to:

- Track pending and ongoing repair jobs.
- Monitor the status of a customer's vehicle.
- Find repair jobs quickly.
- Keep workshop information organized.
- Notify customers when their vehicle is ready.
- Understand the shop's workload and repair performance.

As the number of repair jobs increases, manual tracking becomes time-consuming and more prone to errors.

## Solution

AutoCare provides a lightweight browser-based system for managing the complete repair-job lifecycle.

Staff can:

- Register and log into the system.
- Book new repair jobs with customer, vehicle, and repair information.
- View and manage repair jobs through the Workshop queue.
- Search and filter repair jobs.
- Update job statuses from Pending to In Progress, Completed, and Collected.
- Generate customer notification messages when job statuses change.
- View dashboard statistics.
- Analyze repair activity through the Analytics Report page.

## Live Demo

🚀 **[Open AutoCare Live Demo](https://auto-care-repair-management-system.vercel.app)**



## Technologies Used

- **HTML5** — structures the application's pages.
- **CSS3** — provides custom styling, CSS variables, Grid, Flexbox, and responsive media queries.
- **JavaScript (Vanilla JS)** — handles application logic, DOM manipulation, form validation, search, filtering, navigation, and user interaction.
- **Web Storage API (`localStorage`)** — stores user accounts, repair jobs, and notification logs in the browser.
- **Notification API Layer** — provides a custom Promise-based notification simulation with asynchronous behavior and error handling.
- **Font Awesome** — provides icons used throughout the application.
- **Google Fonts (Inter)** — provides the primary application typeface.
- **Git & GitHub** — used for version control, feature branches, commits, and repository management.
- **Vercel** — used to deploy the application and provide the live demo.

## Key Features

### Dynamic Content

The Dashboard, Workshop queue, and Analytics Report pages dynamically read repair-job data from `localStorage` and render the information into the DOM at runtime.

This allows the application to update its interface based on the current data instead of relying on hardcoded content.

### Authentication

Users can create an account and sign in to the application.

The authentication system includes:

- Sign-up validation.
- Password confirmation.
- Login validation.
- User data storage using `localStorage`.
- Display of the signed-in user's information on the dashboard.

### Repair Job Management

Staff can create and manage repair jobs by entering:

- Customer information.
- Vehicle information.
- Repair details.
- Repair cost.
- Assigned mechanic.
- Job status.

Repair jobs can be updated throughout the repair process.

### Workshop Management

The Workshop page provides a central queue for repair jobs.

Users can:

- View repair jobs.
- Search for jobs.
- Filter jobs by status.
- Filter jobs by mechanic.
- Update repair status.
- Monitor the progress of vehicles.

### Analytics and Reports

The Analytics Report page provides an overview of repair activity, including:

- Total repair jobs.
- Pending jobs.
- In-progress jobs.
- Completed jobs.
- Collected jobs.
- Common repair types.

### Notification API

`NotificationAPI.js` provides a custom Promise-based notification API layer that simulates sending a customer notification.

The system includes:

- Asynchronous behavior.
- Notification network delay.
- Promise resolution.
- Promise rejection.
- Error handling.
- User feedback when a notification fails.

This demonstrates how the application can work with an API-style asynchronous process without requiring an external backend.

### Local Storage

The application uses `localStorage` to persist:

- User accounts.
- Repair jobs.
- Notification logs.

Data remains available after refreshing the page or restarting the browser.

### Error Handling

The application validates user input before creating accounts and repair jobs.

Examples include:

- Required field validation.
- Password length validation.
- Password confirmation validation.
- Numeric repair-cost validation.
- Missing customer email handling.
- Notification failure handling.

Errors are displayed to the user instead of allowing the application to fail silently.

### Responsive Design

The application is designed to work across:

- Desktop computers.
- Tablets.
- Mobile devices.

A responsive navigation menu and CSS media queries allow the layout to adapt to different screen sizes.

## Project Structure

```text
Auto Care Repair Management System
│
├── css/
│   └── style.css
│
├── js/
│   ├── Auth.js
│   ├── Dashboard.js
│   ├── NotificationAPI.js
│   ├── Repair.js
│   ├── Report.js
│   ├── Responsive.js
│   └── Workshop.js
│
├── pages/
│   ├── AnalyticReport.html
│   ├── BookService.html
│   ├── Dashboard.html
│   └── Workshop.html
│
├── index.html
└── README.md