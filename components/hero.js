'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center min-h-screen mt-16 bg-[#E5E7EB] px-4 sm:py-16 md:py-8">
      <div className="flex flex-col md:flex-row md:items-center max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 md:pr-12 mb-8 md:mb-0"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-montserrat text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 text-[#242A33]"
          >
            Wise Numbers LTD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-montserrat text-base sm:text-lg lg:text-xl text-[#242A33] mb-4"
          >
            Expert-Led Accounting Firm with Extensive UK Experience
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-montserrat text-sm sm:text-base lg:text-lg text-[#242A33] mb-6"
          >
            Wise Numbers LTD provides tailored financial services to meet
            varying client needs. Our skilled team of bookkeepers, accountants,
            and tax experts caters to a diverse clientele, from freelancers to
            large organizations. We offer strategic financial consultancy and
            advanced tax planning, making us your trusted partner for achieving
            financial success and peace of mind.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-[#242A33] hover:bg-opacity-90 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <Link href="/about-us">Learn More</Link>
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className=" md:w-1/2 flex justify-center"
        >
          <img
            src="/heroSection.png"
            alt="Financial data visualization"
            className="rounded-lg w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[451px]"
          />
        </motion.div>
      </div>
    </div>
  );
}
