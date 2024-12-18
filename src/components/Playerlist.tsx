import { useEffect, useState } from "react";
import { db, playerCollectionRef } from "../firebaseConfig";
import { deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
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

  return (
    <>
      <div className="player-list">
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
                  <button className="num-button button radius-s">+</button>
                  <h2>{player.wins}</h2>
                  <button className="num-button button radius-s">-</button>
                </div>

                <div className="flex count-box radius-m">
                  <button className="num-button button radius-s">+</button>
                  <h2>{player.losses}</h2>
                  <button className="num-button button radius-s">-</button>
                </div>
                <h2 className="flex count-box score radius-m"></h2>
              </div>

              <div className="single-box radius-l delete-container">
                <button className="delete-button radius-m">
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
