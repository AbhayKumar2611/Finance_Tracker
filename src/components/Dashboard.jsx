// import React from "react";
// import { ArrowRight } from "lucide-react";
// import FAQ from "./FAQ";
// import Slider from "./Slider";
// import Contact from "./Contact";

// const Dashboard = () => {
//   return (
//     <div className="h-screen w-screen">
//       {/* Hero Section */}
//       <section className="relative w-full h-full flex flex-col md:flex-row justify-center items-center px-6">
//         {/* Background with gradient and pattern overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 opacity-90" />
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         />

//         {/* Hero Content - Left Side */}
//         <div className="relative z-10 max-w-4xl text-left md:w-1/2">
//           <div className="inline-block mb-6 p-2 bg-white/10 rounded-full backdrop-blur-sm">
//             <span className="px-4 py-1 text-sm text-white font-medium">
//               ✨ Smart financial management for everyone
//             </span>
//           </div>

//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
//             Take Control of Your
//             <span className="block">Financial Future 💰</span>
//           </h1>

//           <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
//             Manage your finances effectively with our simple and intuitive
//             tools. Track your income, expenses, and budget all in one place!
//           </p>

//           {/* CTA Section */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button className="group bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition duration-300 flex items-center gap-2">
//               Get Started
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>

//             <button className="text-white border-2 border-white/30 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition duration-300">
//               Watch Demo
//             </button>
//           </div>
//         </div>

//         {/* Hero Image - Right Side */}
//         <div className="relative md:w-1/2 flex justify-center">
//           {/* Money Image Container */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <img
//               src="https://cdn.prod.website-files.com/640f69143ec11b21d42015c6/672188c512264aa81f920114_flying_money_narrow_firefly_hero.svg"
//               alt="Flying Money"
//               className="w-full max-w-[600px] animate-float z-20 opacity-100"
//               style={{
//                 animation: "float 3s ease-in-out infinite",
//               }}
//             />
//           </div>

//           {/* Phone Image */}
//           <img
//             src="https://cdn.prod.website-files.com/640f69143ec11b21d42015c6/6502e96f8b7ff92feac8c8ab_hero-phone-p-800.png"
//             alt="Mobile Mockup"
//             className="w-[350px] md:w-[400px] lg:w-[450px] relative z-10"
//           />
//         </div>
//       </section>

//       <Slider />
//       <div className="flex justify-between w-screen bg-gray-100">
//         <FAQ />
//         <Contact />
//       </div>
//     </div>
//   );
// };

// // Add this to your global CSS or style block
// const styles = `
// @keyframes float {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-20px); }
// }

// .animate-float {
//   animation: float 3s ease-in-out infinite;
// }
// `;

// export default Dashboard;

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FAQ from "./FAQ";
import Slider from "./Slider";
import Contact from "./Contact";

const Dashboard = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Scroll animation variants
  const scrollVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  };

  return (
    <div className="h-screen w-screen">
      {/* Hero Section */}
      <section className="relative w-full h-full flex flex-col md:flex-row justify-center items-center px-6">
        {/* Background with gradient and pattern overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400"
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Hero Content - Left Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl text-left md:w-1/2"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-6 p-2 bg-white/10 rounded-full backdrop-blur-sm"
          >
            <span className="px-4 py-1 text-sm text-white font-medium">
              ✨ Smart financial management for everyone
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Take Control of Your
            <span className="block">Financial Future 💰</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
          >
            Manage your finances effectively with our simple and intuitive
            tools. Track your income, expenses, and budget all in one place!
          </motion.p>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition duration-300 flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white border-2 border-white/30 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition duration-300"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Image - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative md:w-1/2 flex justify-center"
        >
          {/* Money Image Container */}
          <motion.div
            animate={{
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src="https://cdn.prod.website-files.com/640f69143ec11b21d42015c6/672188c512264aa81f920114_flying_money_narrow_firefly_hero.svg"
              alt="Flying Money"
              className="w-full max-w-[600px] z-20 opacity-100"
            />
          </motion.div>

          {/* Phone Image */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            src="https://cdn.prod.website-files.com/640f69143ec11b21d42015c6/6502e96f8b7ff92feac8c8ab_hero-phone-p-800.png"
            alt="Mobile Mockup"
            className="w-[350px] md:w-[400px] lg:w-[450px] relative z-10"
          />
        </motion.div>
      </section>

      {/* Slider Section with scroll animation */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollVariants}
      >
        <Slider />
      </motion.div>

      {/* FAQ and Contact Section with scroll animation */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollVariants}
        className="flex justify-between w-screen bg-gray-100"
      >
        <FAQ />
        <Contact />
      </motion.div>
    </div>
  );
};

export default Dashboard;
