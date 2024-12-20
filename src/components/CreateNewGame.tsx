import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";
import CreatePlayer from "./CreatePlayer";
import PlayerList from "./PlayerList";

const CreateNewGame = () => {
  const [newGameName, setNewGameName] = useState("");
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);

  const createNewGame = async () => {
    if (!newGameName) return;

    const gamesCollectionRef = collection(db, "games");

    const newGame = {
      name: newGameName,
      date: Timestamp.now(),
    };

    const gameDocRef = await addDoc(gamesCollectionRef, newGame);
    setCurrentGameId(gameDocRef.id);
    console.log("Created game with id: ", currentGameId);
  };

  return (
    <>
      <div className="create-new-game-wrapper">
        <input
          className="cng-input"
          type="string"
          placeholder="Název hry"
          value={newGameName}
          onChange={(event) => {
            setNewGameName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              createNewGame();
            }
          }}
        />
        <button onClick={createNewGame}>Vytvořit novou hru</button>

        {currentGameId && (
          <PlayerList gameId={currentGameId} gameName={newGameName} />
        )}
        {currentGameId && <CreatePlayer gameId={currentGameId} />}
      </div>
    </>
  );
};

export default CreateNewGame;
