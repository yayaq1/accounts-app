import React from 'react';

const Contact = () => {
  const cards = [
    {
      id: 1,
      imageUrl: '/image1.jpg',
      description: 'Description for Image 1',
    },
    {
      id: 2,
      imageUrl: '/image2.jpg',
      description: 'Description for Image 2',
    },
    {
      id: 3,
      imageUrl: '/image3.jpg',
      description: 'Description for Image 3',
    },
  ];

  return (
    <div className="min-h-screen bg-blue-400 flex justify-center items-center">
      <div className="max-w-5xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-center text-white mb-8">
          Your Growth is Important to us!
        </h3>
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          How To Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={card.imageUrl}
                alt={`Contact Wise Numbers LTD - ${card.description}`}
                className="w-full h-60 object-cover object-center"
              />
              <div className="p-4">
                <p className="text-gray-800 mb-2">{card.description}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
