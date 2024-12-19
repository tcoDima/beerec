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
import trashIcon from "../assets/trash-icon.svg";

const Playerlist = () => {
  const [players, setPlayers] = useState<any>([]);

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
  const deletePlayer = async (id: string) => {
    const playerDoc = doc(db, "players", id);
    await deleteDoc(playerDoc);
  };

  // Update Wins Functions
  const plusWin = async (id: string, wins: number, losses: number) => {
    const playerDoc = doc(db, "players", id);
    const updatedWins = wins + 1;
    const newScore = updatedWins / (losses || 1);
    const newFields = { wins: updatedWins, score: newScore };
    await updateDoc(playerDoc, newFields);
  };
  const minusWin = async (id: string, wins: number, losses: number) => {
    const playerDoc = doc(db, "players", id);
    if (wins < 1) return;
    const updatedWins = wins - 1;
    const newScore = updatedWins / (losses || 1);
    const newFields = { wins: updatedWins, score: newScore };
    await updateDoc(playerDoc, newFields);
  };

  // Update Losses Functions
  const plusLose = async (id: string, wins: number, losses: number) => {
    const playerDoc = doc(db, "players", id);
    const updatedLosses = losses + 1;
    const newScore = wins / (updatedLosses || 1);
    const newFields = { losses: updatedLosses, score: newScore };
    await updateDoc(playerDoc, newFields);
  };
  const minusLose = async (id: string, wins: number, losses: number) => {
    const playerDoc = doc(db, "players", id);
    if (losses < 1) return;
    const updatedLosses = losses - 1;
    const newScore = wins / (updatedLosses || 1);
    const newFields = { losses: updatedLosses, score: newScore };
    await updateDoc(playerDoc, newFields);
  };

  // Format score to maxim of 3 decimal points
  const formatScore = (score: number) => {
    if (score % 1 === 0) {
      return score;
    }
    return parseFloat(score.toFixed(3));
  };

  // Trigger animation
  const animateUp = (event: any) => {
    const button = event.target;
    const parentElement = button.closest(".player-wrapper");

    if (parentElement && !parentElement.classList.contains("animate-up")) {
      parentElement.classList.add("animate-up");

      setTimeout(() => {
        parentElement.classList.remove("animate-up");
      }, 750);
    }
  };
  const animateDown = (event: any) => {
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
        {players.map((player: any, index: number) => {
          return (
            <div className="flex player-wrapper" key={player.id}>
              <div className="single-box position">
                <h2 className="flex index">{index + 1}</h2>
              </div>

              <div className="flex player-container">
                <div className="flex count-box">
                  <h2>{player.name}</h2>
                </div>

                <div className="flex count-box">
                  <button
                    className="num-button button"
                    onClick={(event) => {
                      plusWin(player.id, player.wins, player.losses);
                      animateUp(event);
                    }}
                  >
                    +
                  </button>
                  <h2>{player.wins}</h2>
                  <button
                    className="num-button button"
                    onClick={(event) => {
                      minusWin(player.id, player.wins, player.losses);
                      animateDown(event);
                    }}
                  >
                    -
                  </button>
                </div>

                <div className="flex count-box">
                  <button
                    className="num-button button"
                    onClick={(event) => {
                      plusLose(player.id, player.wins, player.losses);
                      animateDown(event);
                    }}
                  >
                    +
                  </button>
                  <h2>{player.losses}</h2>
                  <button
                    className="num-button button"
                    onClick={(event) => {
                      minusLose(player.id, player.wins, player.losses);
                      animateUp(event);
                    }}
                  >
                    -
                  </button>
                </div>
                <h2 className="flex count-box score">
                  {formatScore(player.score)}
                </h2>
              </div>

              <div className="single-box delete-container">
                <button
                  className="delete-button"
                  onClick={() => {
                    deletePlayer(player.id);
                  }}
                >
                  <img src={trashIcon} alt="Delete Player" />
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
