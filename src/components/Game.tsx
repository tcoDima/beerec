import { useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import "./GameList.css";
import Nav from "./Nav";
import CreateNewGame from "./CreateNewGame";
import GameListNew from "./GameListNew";
import ActiveGame from "./ActiveGame";

const Game = () => {
  const [games, setGames] = useState<any>([]);
  const gamesCollectionRef = collection(db, "games");

  const [activeGame, setActiveGame] = useState({
    gameId: null,
    gameName: "",
    isLocked: false,
    winner: "",
  });

  const [players, setPlayers] = useState<any>([]);
  const playersCollectionRef = collection(
    db,
    `games/${activeGame.gameId}/players`
  );

  const [pageState, setPageState] = useState<any>({
    home: true,
    gameListNew: false,
    createNewGame: false,
    activeGame: false,
  });

  // Fetch games
  const fetchGames = () => {
    const gamesQuery = query(gamesCollectionRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(gamesQuery, (snapshot) => {
      const newGames = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGames(newGames);
    });

    return unsubscribe;
  };

  // Fetch players
  const fetchPlayers = () => {
    const playersQuery = query(playersCollectionRef, orderBy("score", "desc"));

    const unsubscribe = onSnapshot(playersQuery, (snapshot) => {
      const newPlayers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlayers(newPlayers);
    });

    return unsubscribe;
  };

  // Load game in GameList
  const loadGame = (
    gameId: any,
    gameName: string,
    isLocked: boolean,
    winner: string
  ) => {
    setActiveGame({ gameId, gameName, isLocked, winner });
    showPage("activeGame");
    console.log(
      `Loaded game with name: ${activeGame.gameName}, game ID: ${activeGame.gameId}`
    );
  };

  // Navigate between the components
  const showPage = (pageName: string) => {
    setPageState({
      home: false,
      gameListNew: false,
      createNewGame: false,
      activeGame: false,
      [pageName]: true,
    });
    console.log(`Dispalyed component ${pageName}`);
  };

  //Finish game
  const finishGame = async () => {
    try {
      // Find the player with the highest score
      const winner = players.reduce(
        (prev: { score: number }, current: { score: number }) =>
          prev.score > current.score ? prev : current
      );

      // Update the game document with isLocked and winner
      const gameDocRef = doc(db, "games", activeGame.gameId);
      await updateDoc(gameDocRef, {
        isLocked: true,
        winner: winner.name, // Store winner's name
      });

      console.log(
        `Game ${activeGame.gameId} is locked with winner: ${winner.name}`
      );
      // onFinishGame(); // Navigate or update state after finishing
    } catch (error) {
      console.error("Error finishing the game:", error);
    }
  };

  // Confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setSelectedGameId(id);
    setSelectedPlayerId(id);
    setShowModal(true);
    console.log("Confirmation modal open");
  };
  const closeModal = () => {
    setSelectedGameId(null);
    setSelectedPlayerId(null);
    setShowModal(false);
    console.log("Confirmation modal closed");
  };

  return (
    <>
      <div className="wrapper">
        {pageState.gameListNew && (
          <GameListNew
            fetchGames={fetchGames}
            games={games}
            loadGame={loadGame}
            openModal={openModal}
            showModal={showModal}
            closeModal={closeModal}
            selectedGameId={selectedGameId}
          />
        )}
        {pageState.activeGame && (
          <ActiveGame
            gameId={activeGame.gameId}
            gameName={activeGame.gameName}
            isLocked={activeGame.isLocked}
            winner={activeGame.winner}
            fetchPlayers={fetchPlayers}
            players={players}
            selectedPlayerId={selectedPlayerId}
            openModal={openModal}
            showModal={showModal}
            closeModal={closeModal}
          />
        )}
        {pageState.createNewGame && (
          <CreateNewGame
            fetchPlayers={fetchPlayers}
            players={players}
            selectedPlayerId={selectedPlayerId}
            openModal={openModal}
            showModal={showModal}
            closeModal={closeModal}
            loadGame={loadGame}
          />
        )}
        <Nav
          showPage={showPage}
          pageState={pageState}
          finishGame={finishGame}
          isLocked={activeGame.isLocked}
          openModal={openModal}
          showModal={showModal}
          closeModal={closeModal}
          selectedGameId={selectedGameId}
          gameId={activeGame.gameId}
        />
      </div>
    </>
  );
};

export default Game;
