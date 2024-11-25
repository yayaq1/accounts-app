import React from 'react';
import image1 from '../public/image.jpg'; // Replace with your image file path
import { useRouter } from 'next/router';
const AboutUsComponent = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/about-us');
  };
  return (
    <div className=" md:h-screen bg-white pt-24">
      <div className="flex flex-col md:flex-row items-center justify-center mx-auto max-w-wrapper">
        {/* Left Side (Image) */}
        <div className="flex flex-col justify-center items-center px-6 py-6 md:w-1/2 md:pl-4">
          <img
            src="/contact.jpg"
            alt="About Us"
            className="md:w-full lg:max-w-[530px] lg:w-full  h-auto rounded-lg"
          />
        </div>
        {/* Right Side (Content and Button) */}
        <div className=" md:w-1/2 text-black p-8 md:p-12 mt-6 md:mt-0 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg mb-8">
            Here at Wise Numbers Ltd, our skilled Accountants, Tax Consultants,
            and Business Advisors are here to help small and medium-sized
            businesses. Our team comprises extensively qualified Chartered
            Accountants and renowned industry business consultants.
          </p>
          <button
            className="bg-white text-gray-900 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 ease-in-out"
            onClick={handleClick}
          >
            About Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
