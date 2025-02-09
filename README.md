# Finance Tracker 🚀

## Introduction
This application enables users to manage their personal finances by tracking income, expenses, and savings. It aims to help users make informed financial decisions and set financial goals.
This web application allows users to input their income and expenses, categorize them, and visualize their financial status through graphs and reports.

## Project Type
Frontend

## Deployed App
Frontend: https://financenewtracker.netlify.app/

## Directory Structure
FINANCE_TRACKER
│── node_modules/
│── public/
│   └── vite.svg
│── src/
│   ├── assets/
│   ├── components/
│   │   ├── BudgetTrackerForm.jsx
│   │   ├── Chatbot.jsx
│   │   ├── Contact.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ExpenseChart.jsx
│   │   ├── ExpensePieChart.jsx
│   │   ├── ExpenseTrackerForm.jsx
│   │   ├── FAQ.jsx
│   │   ├── firebase.js
│   │   ├── firebaseChatbot.js
│   │   ├── Footer.jsx
│   │   ├── IncomeChart.jsx
│   │   ├── IncomePieChart.jsx
│   │   ├── IncomeTrackerForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── Register.jsx
│   │   ├── Signin.jsx
│   │   ├── Slider.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx

## Video Walkthrough of the Project
https://drive.google.com/file/d/1QcW9pl7VvRknMvMJBx2x-ymXyOmDw7Gd/view?usp=sharing

## Features
- Income Analysis
- Expense Analysis
- Budget Tracking
- Connect with Admin
- Bill Reminders
- Saving Goals

## Design Directions

## Design Decisions & Assumptions

### <span style="color:black;">Design Decisions:</span>
1. **Tech Stack**: The project is built using React (Vite) for the frontend and Firebase for backend storage.
2. **State Management**: Context API is used to manage global state.
3. **UI Framework**: Tailwind CSS is used for styling, ensuring a responsive and modern UI.
4. **Authentication**: Firebase Authentication is implemented for user sign-in and registration.
5. **Data Visualization**: Chart.js is used to display income and expense trends graphically.
6. **Component-Based Architecture**: The UI is modularized into reusable React components.
7. **Routing**: React Router is used for client-side navigation.
8. **Performance Optimization**: Lazy loading is considered for better performance.
9. **Security**: User authentication ensures data protection and privacy.

### <span style="color:black;">Assumptions:</span>
1. Users will primarily access the application on modern browsers.
2. Internet connectivity is required for real-time data synchronization.
3. Users will enter valid financial data in the expense and income tracker.
4. Firebase's free tier is sufficient for handling expected traffic.
5. The chatbot feature assumes users' queries will be finance-related.
6. No multi-user collaboration is required for this version of the app.
7. Charts will handle a reasonable number of data points without performance issues.



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
