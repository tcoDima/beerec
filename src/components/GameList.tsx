import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import "./GameList.css";
import trashIcon from "../assets/trash-icon.svg";
import enterIcon from "../assets/enter-icon.svg";
import trophyIcon from "../assets/trophy-icon.svg";
import lockedIcon from "../assets/lock_locked-icon.svg";
import unlockedIcon from "../assets/lock_unlocked-icon.svg";

const GameList = ({ onLoadGame }: any) => {
  const [games, setGames] = useState<any>([]);
  const gamesCollectionRef = collection(db, "games");

  // Fetch games
  useEffect(() => {
    const gamesQuery = query(gamesCollectionRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(gamesQuery, (snapshot) => {
      const newGames = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGames(newGames);
    });

    return () => unsubscribe();
  }, []);

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
                  onLoadGame(game.id, game.name, game.isLocked, game.winner);
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
                onClick={() => {
                  deleteGame(game.id);
                }}
                className="inner n-button"
              >
                <img src={trashIcon} alt="Delete Player" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GameList;
