import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const gamesCollectionRef = collection(db, "games");
      const gamesQuery = query(gamesCollectionRef, orderBy("date", "desc"));

      const gameSnapshots = await getDocs(gamesQuery);

      const gamesData = await Promise.all(
        gameSnapshots.docs.map(async (gameDoc) => {
          const playersCollection = collection(
            db,
            `games/${gameDoc.id}/players`
          );
          const playerSnapshots = await getDocs(playersCollection);

          const players = playerSnapshots.docs.map((playerDoc) => ({
            id: playerDoc.id,
            ...playerDoc.data(),
          }));

          return {
            id: gameDoc.id,
            ...gameDoc.data(),
            players,
          };
        })
      );

      setGames(gamesData);
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h1>Game List</h1>
      {games.map((game: any) => (
        <div key={game.id}>
          <h3>Game name: {game.name}</h3>
          <h2>Players:</h2>
          <ul>
            {game.players.map((player: any) => (
              <li key={player.id}>
                {player.name} - Wins: {player.wins}, Losses: {player.losses},
                Score: {player.score}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GameList;
