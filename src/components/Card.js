import React from "react";
import "./Card.css";

export default function Card({ card, index, onCardClick, flippedCount }) {
  const imageUrl = `${process.env.REACT_APP_API_BASE_URL}images/${card.cardNum}.png`;

  const handleClick = () => {
    if (!card.isFlipped) {
      onCardClick(index, flippedCount);
    }
  };

  return (
    <div
      className="scene cursor-pointer rounded-lg transition duration-150 ease-in-out transform  hover:scale-110"
      onClick={handleClick}
    >
      {card.isVisible ? (
        <div className={`card ${card.isFlipped ? "is-flipped" : ""}`}>
          <div className="shadow-md rounded-lg mx-auto py-4 px-4 card__face card__face--front"></div>
          <div className="bg-gray-100 mx-auto shadow-md rounded-lg py-4 px-4 card__face card__face--back">
            <img src={imageUrl} alt={card.cardNum} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
