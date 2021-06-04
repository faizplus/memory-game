import { createRef, useState } from "react";
import GameBoard from "./screens/GameBoard";
import GameStart from "./screens/GameStart";
import Loader from "./components/Loader";
import API from "./services/api";

function App() {
  const [fileId, setFileId] = useState(null);
  const [cards, setCards] = useState([]);

  const [loading, setLoading] = useState(false);

  const difficultySelected = async (selectedDifficulty) => {
    setLoading(true);

    const { data } = await API.post("api/start-game", {
      difficulty: selectedDifficulty,
    });

    setFileId(data.file_id);

    const cardData = data.cards.reduce((a, c) => {
      a.push({ cardNum: c, cardRef: createRef(null) });
      return a;
    }, []);

    setCards(cardData);

    setLoading(false);
  };

  const handleCardUpdate = (cardIndex) => {
    return new Promise(async (resolve, reject) => {
      const { data } = await API.post("api/select-card", {
        fileId,
        cardIndex,
      });

      resolve(data);
    });
  };

  const handleRestart = () => {
    setFileId(null);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {fileId ? (
            <GameBoard
              cards={cards}
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
