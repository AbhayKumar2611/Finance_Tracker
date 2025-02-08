import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const cards = [
  {
    title: "Budget Tracking",
    description: "Keep track of your spending and saving habits.",
    icon: "📊",
    emoji: "💰📉📈",
  },
  {
    title: "Investment Portfolio",
    description: "Monitor your investments in real-time.",
    icon: "📈",
    emoji: "💹🏦📊",
  },
  {
    title: "Bill Reminders",
    description: "Never miss a payment deadline.",
    icon: "📅",
    emoji: "🔔💵⏳",
  },
  {
    title: "Expense Analysis",
    description: "Visualize where your money goes.",
    icon: "📊",
    emoji: "💳📉💸",
  },
  {
    title: "Financial Goals",
    description: "Set and achieve your financial goals.",
    icon: "🎯",
    emoji: "🚀💡🎯",
  },
  {
    title: "Smart Insights",
    description: "AI-driven suggestions for better savings.",
    icon: "🤖",
    emoji: "🧠💡📊",
  },
  {
    title: "Secure Transactions",
    description: "End-to-end encrypted transactions.",
    icon: "🔒",
    emoji: "🛡️🔑💵",
  },
  {
    title: "Tax Management",
    description: "Automated tax calculations and reports.",
    icon: "🧾",
    emoji: "📜💰⚖️",
  },
];

const Slider = () => {
  return (
    <div className="w-screen bg-gray-100 mx-auto py-7">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        What We Offer 🚀
      </h2>
      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={1200}>
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-100 shadow-lg rounded-lg p-6 mx-3 flex flex-col items-center text-center
            transition-all duration-300 hover:shadow-xl h-[260px]" // 🔥 FIXED HEIGHT
          >
            <div className="text-5xl">{card.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{card.title}</h3>
            <p className="text-gray-600 mt-2 text-md">{card.description}</p>
            <div className="text-2xl mt-3">{card.emoji}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
