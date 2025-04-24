// src\components\CupcpHome\Cards.jsx

import React from "react";

const Cards = () => {
  // Define an array of card content (Mission, Vision, and Values)
  const cards = [
    {
      title: "Mission",
      content:
        "To foster a collaborative environment where physics and programming intersect, enabling students to develop innovative solutions to complex problems.",
    },
    {
      title: "Vision",
      content:
        "To become a leading platform for interdisciplinary learning and research in physics and computer programming, creating future leaders in both fields.",
    },
    {
      title: "Values",
      content:
        "Innovation, collaboration, continuous learning, and excellence in both theoretical understanding and practical implementation.",
    },
  ];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-800">
      {/* Container for the cards with responsive grid layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Mapping through the cards array to display each card */}
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-700 p-6 rounded-lg hover:transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            {/* Card title with blue color */}
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-400">
              {card.title}
            </h3>
            {/* Card content with gray text */}
            <p className="text-gray-300 text-sm sm:text-base">{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
