import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <div className="bg-[#E5E7EB] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center lg:items-start gap-12"
        >
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-[#242A33] mb-4">
              About Wise Numbers LTD
            </h2>
            <p className="text-[#242A33] leading-relaxed">
              With a presence in multiple cities across the UK, our accounting
              firm is led by Farhan Butt, a Certified Chartered Accountant with
              extensive experience from the Big 4 accounting firms and US
              Fortune 500 companies. At Wise Numbers, we provide top-tier
              expertise and strategic financial guidance to all our clients.
            </p>
            <p className="text-[#242A33] leading-relaxed">
              Our team comprises experienced bookkeepers, accountants, tax
              experts, financial advisors, and support professionals, ensuring
              excellent customer support and efficient, timely solutions for all
              your accounting and tax needs.
            </p>
            <h3 className="text-2xl font-semibold text-[#242A33] mt-8 mb-4">
              Our Clients
            </h3>
            <p className="text-[#242A33] leading-relaxed">
              We have successfully worked with a wide range of clients across
              the UK and overseas, including:
            </p>
            <ul className="list-disc list-inside text-[#242A33] space-y-2 ml-4">
              <li>
                Individual contractors, freelancers, and healthcare
                professionals
              </li>
              <li>
                Small businesses such as retailers, training and writing
                services
              </li>
              <li>
                Large organizations like car dealerships and import/export
                companies
              </li>
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className=" lg:w-1/2 flex justify-center items-start"
          >
            <Image
              src="/about.png"
              alt="Premier Chartered Accounting Firm"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
