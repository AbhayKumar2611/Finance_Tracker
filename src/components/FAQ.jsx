import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I track my expenses?",
    answer:
      "Log your expenses with date, amount, category, and description. Use our dashboard to organize and monitor spending efficiently.",
  },
  {
    question: "Can I create custom expense categories?",
    answer:
      "Yes! You can add and customize categories to match your spending habits for better tracking.",
  },
  {
    question: "How can I analyze my spending?",
    answer:
      "View interactive charts and reports to track spending trends and manage your budget effectively.",
  },
  {
    question: "Will I get budget alerts?",
    answer:
      "Yes! Get notifications when you’re close to exceeding your budget in any category.",
  },
  {
    question: "Can I generate expense reports?",
    answer:
      "Yes! Download detailed expense reports in PDF or CSV to review your spending and budget insights.",
  },
  {
    question: "Does the app support multiple currencies?",
    answer:
      "Yes! You can track expenses in different currencies and convert them to your preferred one using real-time rates.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 drop-shadow-lgshadow-lg rounded-lg ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-1">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className=" rounded-sm overflow-hidden transition-all duration-300 shadow-sm"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 transition duration-200 text-gray-800 font-medium"
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <div
              className={`px-4 text-left text-gray-600 text-md font-medium transition-all duration-300 ${
                openIndex === index
                  ? "max-h-40 opacity-100 py-2"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
