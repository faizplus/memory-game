import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "../components/Card";
import ElapsedTime from "../components/ElapsedTime";
import Stars from "../components/Stars";

function GameBoard({ gameData, onCardUpdate, onRestart }) {
  const [cards, setCards] = useState([]);

  const [flippedCount, setFlippedCount] = useState(0);

  const handleCardClick = (cardIndex, flippedCardsCount) => {
    if (flippedCardsCount < 2) {
      setFlippedCount(flippedCardsCount + 1);
      let newCards = [...cards];

      newCards[cardIndex].isFlipped = true;
      setCards(newCards);
    }

    // if one card is already flipped then send cards data to server
    if (flippedCardsCount === 1) {
      // hide cards after 3 seconds
      const timer = setTimeout(async () => {
        const res = await onCardUpdate(cards);

        const newCards = res.cards.reduce((a, c) => {
          c.isFlipped = false;
          a.push(c);
          return a;
        }, []);

        setCards(newCards);
        setFlippedCount(0);
        clearTimeout(timer);
      }, 3000);
    }
  };

  useEffect(() => {
    setCards(gameData.cards);
  }, [gameData]);

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
            stop={gameData.game_ended}
            seconds={gameData.elapsed_time}
          />
        </div>
        <div className="text-right">Error Score: {gameData.error_score}</div>
      </div>
      {gameData.game_ended ? (
        <div className="text-center">
          <div className="md:text-2xl my-4">Game Ended</div>
          <div>
            <Stars stars={gameData.rating} />
          </div>
          <div className="text-sm">You got {gameData.rating} stars</div>
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
              flippedCount={flippedCount}
            />
          ))}
        </div>
      )}
    </main>
  );
}

GameBoard.protoType = {
  difficulty: PropTypes.string.isRequired,
};

export default GameBoard;
