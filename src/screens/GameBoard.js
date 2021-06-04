import React, { useState } from "react";

import Card from "../components/Card";
import ElapsedTime from "../components/ElapsedTime";
import Stars from "../components/Stars";

function GameBoard({ cards, onCardUpdate, onRestart }) {
  const [timer, setTimer] = useState(null);
  const [game_ended, setGame_ended] = useState(false);
  const [rating, setRating] = useState(0);
  const [error_score, setError_score] = useState(0);

  const handleCardClick = async (cardIndex) => {
    const res = await onCardUpdate(cardIndex);
    if (!timer && res.cards) {
      res.cards.forEach((card) => {
        if (card.isFlipped) {
          cards[card.index].cardRef.current.className = `card is-flipped`;
        }
      });

      if (res.cards.length === 2) {
        const t = setTimeout(() => {
          res.cards.forEach((card) => {
            if (card.isVisible) {
              cards[card.index].cardRef.current.className = "card";
            } else {
              cards[card.index].cardRef.current.className = `card hidden`;
            }
          });

          if (res.game_ended) {
            setGame_ended(true);
            setRating(res.rating);
          }

          setError_score(res.error_score);

          setTimer(null);
        }, 3000);

        setTimer(t);
      }
    }
  };

  return (
    <main className="my-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 sm:my-6  md:my-8 lg:my-10  xl:my-14">
      <h1 className="text-center mb-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="inline">Memory</span>{" "}
        <span className="text-indigo-600 inline">Game</span>
      </h1>

      <div className="grid grid-cols-2 gap-4  text-base text-red-500 md:text-xl mb-4">
        <div>
          Elapsed Time:{" "}
          <ElapsedTime
            stop={game_ended}
            // seconds={elapsed_time}
          />
        </div>
        <div className="text-right">Error Score: {error_score}</div>
      </div>
      {game_ended ? (
        <div className="text-center">
          <div className="md:text-2xl my-4">Game Ended</div>
          <div>
            <Stars stars={rating} />
          </div>
          <div className="text-sm">You got {rating} stars</div>
          <div>
            <button
              onClick={onRestart}
              className="mt-4 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 mx-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 md:py-2 md:text-lg md:px-10"
            >
              Restart
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              index={index}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default GameBoard;
