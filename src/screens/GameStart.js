import React from "react";
import PropTypes from "prop-types";

function GameStart({ onDifficultySelection }) {
  return (
    <div>
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:mt-12  md:mt-16 lg:mt-20  xl:mt-28">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="inline">Memory</span>{" "}
            <span className="text-indigo-600 inline">Game</span>
          </h1>
          <p className="mt-10 sm:mt-10  md:mt-10 lg:mt-12  xl:mt-16 text-base text-gray-500  sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl ">
            Please select game difficulty:
          </p>
          <div className="mt-5 sm:mt-8 sm:flex justify-center">
            <div className="rounded-md shadow">
              <button
                onClick={() => onDifficultySelection("easy")}
                className="focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50  w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out transform  hover:scale-110"
              >
                Easy
              </button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <button
                onClick={() => onDifficultySelection("medium")}
                className="focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50  w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out transform  hover:scale-110"
              >
                Medium
              </button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <button
                onClick={() => onDifficultySelection("hard")}
                className="focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out transform  hover:scale-110"
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

GameStart.protoType = {
  onDifficultySelection: PropTypes.func.isRequired,
};

export default GameStart;
