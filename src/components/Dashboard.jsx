import React from "react";

const Dashboard = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-white-100 text-center px-6">
      {/* Hero Content */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to Finance Tracker 💰
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
        Manage your finances effectively with our simple and intuitive tools.
        Track your income, expenses, and budget all in one place!
      </p>
      {/* CTA Button */}
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
        Get Started
      </button>
    </section>
  );
};

export default Dashboard;
