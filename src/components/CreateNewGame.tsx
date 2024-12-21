import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";
import ActiveGame from "./ActiveGame";
import "./CreateNewGame.css";

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
      {!currentGameId ? (
        <div className="create-new-game-wrapper">
          <h1>Vytvořit novou hru</h1>
          <div className="create-new-game-container">
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
            <button onClick={createNewGame} className="cng-button">
              Vytvořit novou hru
            </button>
          </div>
        </div>
      ) : (
        <ActiveGame gameId={currentGameId} gameName={newGameName} />
      )}
    </>
  );
};

export default CreateNewGame;
