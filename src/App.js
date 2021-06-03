import { useEffect, useState } from "react";
import GameBoard from "./screens/GameBoard";
import GameStart from "./screens/GameStart";
import Loader from "./components/Loader";
import API from "./services/api";

function App() {
  /**
   * The client-side of the application should have no knowledge about the board,
   * each time a user clicks on a card, the client should send a request to the
   * server with the file id to receive a result of this player’s action.
   */

  const [gameData, setGameData] = useState({});
  const [loading, setLoading] = useState(true);

  const getGameData = async () => {
    if (localStorage.getItem("file_id")) {
      const { data } = await API.post("api/get-game-data", {
        fileId: localStorage.getItem("file_id"),
      });

      setGameData(data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const difficultySelected = async (selectedDifficulty) => {
    setLoading(true);

    const { data } = await API.post("api/start-game", {
      difficulty: selectedDifficulty,
    });

    localStorage.setItem("file_id", data.file_id);

    setGameData(data);
    setLoading(false);
  };

  useEffect(() => {
    getGameData();
  }, []);

  const handleCardUpdate = (cards) => {
    return new Promise(async (resolve, reject) => {
      const newGameData = { ...gameData, cards };

      const { data } = await API.post("api/select-card", {
        gameData: newGameData,
      });

      setGameData(data);
      resolve(data);
    });
  };

  const handleRestart = () => {
    localStorage.removeItem("file_id");
    setGameData({});
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {gameData.file_id ? (
            <GameBoard
              gameData={gameData}
              onCardUpdate={handleCardUpdate}
              onRestart={handleRestart}
            />
          ) : (
            <GameStart onDifficultySelection={difficultySelected} />
          )}
        </>
      )}
    </>
  );
}

export default App;
