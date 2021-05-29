import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Stars({ stars }) {
  const [starArr, setStarArr] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    for (let index = 0; index < stars; index++) {
      starArr[index] = 1;
    }
    setStarArr(starArr);
  }, [starArr, stars]);

  return (
    <div>
      {starArr.map((isStar, index) => {
        return (
          <svg
            key={index}
            className={`inline mx-1 w-4 h-4 fill-current ${
              isStar ? "text-yellow-500" : "text-gray-500"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      })}
    </div>
  );
}

Stars.propTypes = {
  stars: PropTypes.number.isRequired,
};

export default Stars;
