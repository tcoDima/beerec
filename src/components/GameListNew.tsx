import "./GameList.css";
import trashIcon from "../assets/trash-icon.svg";
import enterIcon from "../assets/enter-icon.svg";
import trophyIcon from "../assets/trophy-icon.svg";
import lockedIcon from "../assets/lock_locked-icon.svg";
import unlockedIcon from "../assets/lock_unlocked-icon.svg";
import { useEffect } from "react";
import { doc, collection, getDocs, query, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ConfirmationModal from "./ConfirmationModal";

interface Props {
  games: any;
  fetchGames: () => () => void;
  loadGame: any;
  openModal: any;
  showModal: any;
  closeModal: any;
  selectedGameId?: any;
}

const GameListNew = ({
  games,
  fetchGames,
  loadGame,
  openModal,
  showModal,
  closeModal,
  selectedGameId,
}: Props) => {
  useEffect(() => {
    const unsubscribe = fetchGames(); // Call the function passed as a prop
    return () => unsubscribe(); // Cleanup on unmount
  }, [fetchGames]); // Add dependency if the function reference changes

  // Forrmat date of the Game creation
  const formatDate = (date: any) => {
    if (!date || !date.toDate) return "";
    const formatedDate = date.toDate();
    const day = String(formatedDate.getDate()).padStart(2, "0");
    const month = String(formatedDate.getMonth() + 1).padStart(2, "0");
    const year = formatedDate.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Delete game and its players subcollection
  const deleteGame = async (id: string) => {
    const gamesDocRef = doc(db, "games", id);
    // Reference to the players subcollection inside the game
    const playersCollectionRef = collection(db, "games", id, "players");
    // 1. Fetch all documents in the players subcollection
    const playersSnapshot = await getDocs(query(playersCollectionRef));
    // 2. Delete each document in the subcollection
    const deletePlayersPromises = playersSnapshot.docs.map((playerDoc) =>
      deleteDoc(playerDoc.ref)
    );
    // Wait for all players to be deleted, after game document
    await Promise.all(deletePlayersPromises);
    await deleteDoc(gamesDocRef);
  };

  const confirmDeleteGame = () => {
    closeModal();
    deleteGame(selectedGameId);
    console.log(`Game with id: ${selectedGameId} has been deleted.`);
  };

  return (
    <>
      <h1>Game List</h1>
      <div className="wrapper game-list">
        {games.length === 0 && (
          <div style={{ opacity: "0.5" }}>No games found</div>
        )}
        {games.map((game: any) => (
          <div className="container" key={game.id}>
            <div className="outer squere">
              <button
                onClick={() => {
                  loadGame(game.id, game.name, game.isLocked, game.winner);
                }}
                className="inner n-button"
              >
                <img src={enterIcon} alt="Load Game" />
              </button>
            </div>
            <div className="outer new-width">
              <h2 className="inner game-name">{game.name}</h2>
              <h2 className="inner game-winner">
                <img src={trophyIcon} />
                {game.winner}
              </h2>
              <h2 className="inner game-date">{formatDate(game.date)}</h2>
              <div className="inner squere">
                {game.isLocked ? (
                  <img src={lockedIcon} alt="Load Game" />
                ) : (
                  <img src={unlockedIcon} alt="Load Game" />
                )}
              </div>
            </div>
            <div className="outer squere">
              <button
                onClick={() => openModal(game.id)}
                className="inner n-button"
              >
                <img src={trashIcon} alt="Delete Game" />
              </button>
            </div>
          </div>
        ))}

        <ConfirmationModal
          isOpen={showModal}
          onConfirm={confirmDeleteGame}
          onCancel={closeModal}
          modalParagraphText={
            "Hra bude odstraněná a veškerá data trvale ztracená. \n Opravdu chcete odstranit hru?"
          }
          modalButtonText="Odstranit"
        />
      </div>
    </>
  );
};

export default GameListNew;
