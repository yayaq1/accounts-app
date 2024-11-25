import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const testimonials = [
  {
    quote: 'This product is amazing! It changed my life.',
    name: 'John Doe',
    title: 'CEO, Example Corp',
    image: '/image.jpg',
  },
  {
    quote: 'Fantastic service and support. Highly recommend!',
    name: 'Jane Smith',
    title: 'CTO, Another Corp',
    image: '/image1.jpg',
  },
  {
    quote: 'High quality and great customer service.',
    name: 'Sam Wilson',
    title: 'Manager, Some Company',
    image: '/image2.jpg',
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Testimonials
        </h2>
        <div className="relative flex items-center justify-center">
          <button
            onClick={handlePrev}
            className=" absolute top-[20%] sm:top-1/2 sm:-translate-y-1/2 left-0 ml-4  bg-transparent text-gray-600 py-2 px-4 hover:text-gray-900 transition duration-300"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </button>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
              <div className="flex justify-center mb-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <p className="sm:text-xl text-lg italic text-gray-800 mb-4">
                {testimonials[currentIndex].quote}
              </p>
              <p className="text-gray-900 font-semibold">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-gray-600">
                {testimonials[currentIndex].title}
              </p>
            </div>
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 mr-4 top-[20%] sm:top-1/2 sm:-translate-y-1/2 bg-transparent text-gray-600 py-2 px-4 hover:text-gray-900 transition duration-300"
          >
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
