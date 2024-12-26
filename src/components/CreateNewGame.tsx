import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";
import ActiveGame from "./ActiveGame";
import "./CreateNewGame.css";

interface Props {
  fetchPlayers?: any;
  players?: any;
  openModal?: any;
  showModal?: any;
  closeModal?: any;
  selectedPlayerId?: any;
  loadGame: any;
}

const CreateNewGame = ({
  fetchPlayers,
  players,
  openModal,
  showModal,
  closeModal,
  selectedPlayerId,
  loadGame,
}: Props) => {
  const [newGameName, setNewGameName] = useState("");
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const createNewGame = async () => {
    if (!newGameName) return;

    const gamesCollectionRef = collection(db, "games");

    const newGame = {
      name: newGameName,
      date: Timestamp.now(),
      isLocked: false,
      winner: "TBD",
    };

    const gameDocRef = await addDoc(gamesCollectionRef, newGame);
    setIsLocked(false);
    setCurrentGameId(gameDocRef.id);
    console.log("Created game with id: ", gameDocRef.id);

    loadGame(gameDocRef.id, newGame.name, isLocked);
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
        <ActiveGame
          gameId={currentGameId}
          gameName={newGameName}
          isLocked={false}
          fetchPlayers={fetchPlayers}
          players={players}
          selectedPlayerId={selectedPlayerId}
          openModal={openModal}
          showModal={showModal}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default CreateNewGame;
