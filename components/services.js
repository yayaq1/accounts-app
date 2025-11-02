import React, { useState } from 'react';
import { useRouter } from 'next/router';

const cards = [
  {
    logo: '/image1.jpg', // Replace with your logo image path
    name: 'Accounting Services',
    // description:
    //   ' Expertly navigate complex tax regulations to optimize your business tax strategy, ensuring compliance while uncovering savings opportunities.',
    description:
      'Efficient accounting services tailored to streamline your financial management. We simplify accounting, boost profits, and ensure smooth compliance, so you can focus on what matters most!',
  },
  {
    logo: '/image.jpg', // Replace with your logo image path
    name: 'Tax Services',
    description:
      ' Comprehensive tax solutions designed to simplify compliance, maximize deductions, and minimize liabilities for businesses and individuals alike',
  },
];

const ServiceComponent = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    name: '',
    description: '',
  });

  const handleClick = () => {
    router.push('/sectors-we-serve');
  };

  const openModal = (name, description) => {
    setModalContent({ name, description });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent({ name: '', description: '' });
  };

  return (
    <div
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/service.jpeg')" }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 p-4 md:p-8">
        {/* Content Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl mt-6 md:text-4xl font-bold text-white mb-4">
            What We Can Do For You
          </h2>
          <p className="text-gray-300 mb-6">
            Explore our services designed to help you achieve your goals. Our
            solutions are tailored to meet your needs and exceed your
            expectations.
          </p>
          <button
            className="bg-[#3b445f] text-white py-2 px-4 md:py-2 md:px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={handleClick}
          >
            All Services
          </button>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full md:w-80 text-center"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={card.logo}
                  alt={`${card.name} by Wise Numbers LTD - Professional UK accounting services`}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {card.name}
              </h3>
              <p className="text-gray-700 mb-4">{card.description}</p>

              {/*
              <button
                className="bg-[#3b445f] text-white py-2 px-4 rounded-lg hover:bg-[#3b445f] transition duration-300"
                onClick={() => openModal(card.name, card.description)}
              >
                Read More
              </button>
              */}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {modalContent.name}
            </h2>
            <p className="text-gray-700">{modalContent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceComponent;
