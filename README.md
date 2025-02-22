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

## Video Walkthrough of the Codebase
https://drive.google.com/file/d/1hQ5DcqxbxqX1v1u7jmEwXPsfp9HEMAlB/view?usp=sharing

## Features
- Income Analysis
- Expense Analysis
- Budget Tracking
- Connect with Admin
- Bill Reminders
- Saving Goals

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

## Usage

### 1️⃣ Sign Up & Authentication  
- Navigate to the **Sign Up** page to create a new account.  
- If you already have an account, use the **Sign In** page to log in.  
- Authentication is handled via Firebase for secure login.

### 2️⃣ Dashboard Overview  
- Once logged in, the **Dashboard** displays an overview of your income and expenses.  
- Charts (powered by Chart.js) visually represent your financial data.

### 3️⃣ Tracking Expenses & Income  
- Use the **Expense Tracker Form** to add new expenses.  
- Use the **Income Tracker Form** to record sources of income.  
- Both forms allow you to input details such as amount, category, and date.

### 4️⃣ Data Visualization  
- **Expense Pie Chart**: Shows a breakdown of expenses by category.  
- **Income Pie Chart**: Displays the distribution of income sources.  
- **Expense & Income Charts**: Provide a time-based view of financial trends.

### 5️⃣ Budget Management  
- The **Budget Tracker Form** allows users to set monthly budget goals.  
- Users can monitor their spending habits against their budget.

### 6️⃣ Profile & Settings  
- Navigate to the **Profile** page to update account details.  
- Log out securely using the **Navbar** dropdown menu.

### 7️⃣ Responsive & Mobile-Friendly  
- The app is designed to work smoothly on desktop and mobile devices.  

Enjoy tracking your finances effortlessly! 🚀  

## A Quick Glimpse of our work:
### Dashboard- Hero Section
![Screenshot 2025-02-10 000244](https://github.com/user-attachments/assets/76c33428-79bc-47d5-bd11-2e8257ea16a2)

### Dashboard- Slider Section
![Screenshot 2025-02-10 000301](https://github.com/user-attachments/assets/cc8eecbb-b112-4814-b02c-ec18aa5362d9)

### Income Bar Graph
![Screenshot 2025-02-10 000312](https://github.com/user-attachments/assets/e7cb5156-af90-4791-8499-78ec8009e1bb)

### Expense Bar Graph
![Screenshot 2025-02-10 000327](https://github.com/user-attachments/assets/e1176113-9fc2-4d14-b05a-f6b12c3d2568)

### Income and Expense Pie Chart
![Screenshot 2025-02-10 000336](https://github.com/user-attachments/assets/aef02403-3c3b-405b-8ab4-5652667926ba)

### FAQ's And Contact us Section
![Screenshot 2025-02-10 000347](https://github.com/user-attachments/assets/847e5710-e3c2-4da6-afdc-f3c8d88c834c)

### Register Form
![Screenshot 2025-02-10 000409](https://github.com/user-attachments/assets/1f93b1ba-ee2e-4af9-b365-c5c67d29739f)

### Sign In Form
![Screenshot 2025-02-10 000420](https://github.com/user-attachments/assets/a76cd86c-0ad0-40ad-b88c-f85a307eae92)

### Income Tracker Form
![Screenshot 2025-02-10 000435](https://github.com/user-attachments/assets/b9b710a6-0d23-48a0-af27-9aabd6dd059b)

### Expense Tracker Form
![Screenshot 2025-02-10 000449](https://github.com/user-attachments/assets/93d6e5f7-9ecf-4c8e-9693-6d6e3fa76548)

### Budget Tracker Form
![Screenshot 2025-02-10 000611](https://github.com/user-attachments/assets/d5e2f44b-b6ab-47b9-bef1-1742ab8d14da)


## Credentials
Use the following test credentials to access authenticated pages during the review process.

### 🔑 Admin Account:
Email: kumarabhay26111996@gmail.com

### 🔑 User's Account
Email: ganesh@gmail.com
Password: 123456

### Notes:
- These credentials of user's account are for **testing purposes only**.
- If Firebase authentication is used, ensure test accounts are created in the **Firebase Authentication** panel.
- Reviewers can create their own accounts via the **Sign Up** page if needed.
- If authentication is not required for testing, consider providing a **guest/demo mode**.

Let us know if you need additional access! 🚀

## APIs Used

This project integrates the following APIs to enhance its functionality:

### 🔥 Firebase Authentication API  
- Used for user authentication (Sign Up, Sign In, Logout).  
- Ensures secure access control for users.  
- **Docs**: [Firebase Auth](https://firebase.google.com/docs/auth)  

### 📊 Firebase Firestore Database  
- Stores user income, expenses, and budget data in real-time.  
- Provides cloud-based NoSQL storage.  
- **Docs**: [Firestore Database](https://firebase.google.com/docs/firestore)  

### 📈 Chart.js  
- Used for visualizing income and expense trends with pie and bar charts.  
- Enhances data representation in the dashboard.  
- **Docs**: [Chart.js](https://www.chartjs.org/docs/latest/)  

If more APIs are integrated in the future, they will be documented here. 🚀

## API Endpoints
This section documents the available backend API endpoints, their HTTP methods, descriptions, and example request/response formats.

### 📌 Authentication Routes: 
| Method | Endpoint          | Description                 |
|--------|------------------|-----------------------------|
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Authenticate user & get token |
| POST   | `/api/auth/logout`   | Logout user & destroy session |

## Technology Stack

This project is built using modern web technologies to ensure scalability, security, and performance.

### 🌍 Frontend:
- **React.js** – A JavaScript library for building interactive user interfaces.  
- **Vite** – A fast build tool for modern web development.  
- **Tailwind CSS** – A utility-first CSS framework for responsive design.  
- **Chart.js** – Used for data visualization (income & expense charts).  

### 🛢️ Database:
- **Firebase Firestore** – A NoSQL cloud database for real-time data storage.  
- **Firebase Authentication** – Handles user authentication and security.  

### 🔧 Other Libraries & Modules:
- **Axios** – For making API requests.  
- **React Router** – For handling frontend routing.  
- **useDebounce** – For optimized search and API calls.  

This tech stack ensures a smooth user experience with fast performance and real-time capabilities. 🚀  
