import { useEffect, useState } from "react";
import { db, playerCollectionRef } from "../firebaseConfig";
import {
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./Playerlist.css";

const Playerlist = () => {
  const [players, setPlayers] = useState([]);

  // Fetch players
  useEffect(() => {
    const playersQuery = query(playerCollectionRef, orderBy("score", "desc"));

    const unsubscribe = onSnapshot(playersQuery, (snapshot) => {
      const newPlayers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlayers(newPlayers);
    });

    return () => unsubscribe();
  }, []);

  // Delete Player Function
  const deletePlayer = async (id) => {
    const playerDoc = doc(db, "players", id);
    await deleteDoc(playerDoc);
  };

  // Update Wins Functions
  const plusWin = async (id, wins, losses) => {
    const playerDoc = doc(db, "players", id);
    const updatedWins = wins + 1;
    const newScore = updatedWins / (losses || 1);
    const newFields = { wins: updatedWins, score: newScore };
    await updateDoc(playerDoc, newFields);
  };
  const minusWin = async (id, wins, losses) => {
    const playerDoc = doc(db, "players", id);
    if (wins < 1) return;
    const updatedWins = wins - 1;
    const newScore = updatedWins / (losses || 1);
    const newFields = { wins: updatedWins, score: newScore };
    await updateDoc(playerDoc, newFields);
  };

  // Update Losses Functions
  const plusLose = async (id, wins, losses) => {
    const playerDoc = doc(db, "players", id);
    const updatedLosses = losses + 1;
    const newScore = wins / (updatedLosses || 1);
    const newFields = { losses: updatedLosses, score: newScore };
    await updateDoc(playerDoc, newFields);
  };
  const minusLose = async (id, wins, losses) => {
    const playerDoc = doc(db, "players", id);
    if (losses < 1) return;
    const updatedLosses = losses - 1;
    const newScore = wins / (updatedLosses || 1);
    const newFields = { losses: updatedLosses, score: newScore };
    await updateDoc(playerDoc, newFields);
  };

  // Format score to maxim of 3 decimal points
  const formatScore = (score) => {
    if (score % 1 === 0) {
      return score;
    }
    return parseFloat(score.toFixed(3));
  };

  // Trigger animation
  const animateUp = (event) => {
    const button = event.target;
    const parentElement = button.closest(".player-wrapper");

    if (parentElement && !parentElement.classList.contains("animate-up")) {
      parentElement.classList.add("animate-up");

      setTimeout(() => {
        parentElement.classList.remove("animate-up");
      }, 750);
    }
  };
  const animateDown = (event) => {
    const button = event.target;
    const parentElement = button.closest(".player-wrapper");

    if (parentElement && !parentElement.classList.contains("animate-down")) {
      parentElement.classList.add("animate-down");

      setTimeout(() => {
        parentElement.classList.remove("animate-down");
      }, 750);
    }
  };

  return (
    <>
      <div className="player-list">
        {players.length === 0 ? (
          <h1>Začít novou hru</h1>
        ) : (
          <div className="title-wrapper">
            <h2 className="count-box">Jméno</h2>
            <h2 className="count-box">Výhry</h2>
            <h2 className="count-box">Prohry</h2>
            <h2 className="count-box score">Score</h2>
          </div>
        )}
        {players.map((player, index) => {
          return (
            <div className="flex player-wrapper" key={player.id}>
              <div className="single-box position radius-l">
                <h2 className="flex radius-m">{index + 1}</h2>
              </div>

              <div className="flex player-container radius-l">
                <div className="flex count-box radius-m">
                  <h2>{player.name}</h2>
                </div>

                <div className="flex count-box radius-m">
                  <button
                    className="num-button button radius-s"
                    onClick={(event) => {
                      plusWin(player.id, player.wins, player.losses);
                      animateUp(event);
                    }}
                  >
                    +
                  </button>
                  <h2>{player.wins}</h2>
                  <button
                    className="num-button button radius-s"
                    onClick={(event) => {
                      minusWin(player.id, player.wins, player.losses);
                      animateDown(event);
                    }}
                  >
                    -
                  </button>
                </div>

                <div className="flex count-box radius-m">
                  <button
                    className="num-button button radius-s"
                    onClick={(event) => {
                      plusLose(player.id, player.wins, player.losses);
                      animateDown(event);
                    }}
                  >
                    +
                  </button>
                  <h2>{player.losses}</h2>
                  <button
                    className="num-button button radius-s"
                    onClick={(event) => {
                      minusLose(player.id, player.wins, player.losses);
                      animateUp(event);
                    }}
                  >
                    -
                  </button>
                </div>
                <h2 className="flex count-box score radius-m">
                  {formatScore(player.score)}
                </h2>
              </div>

              <div className="single-box radius-l delete-container">
                <button
                  className="delete-button radius-m"
                  onClick={() => {
                    deletePlayer(player.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="25"
                    height="25"
                    fill="#6A6A6A"
                  >
                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Playerlist;
