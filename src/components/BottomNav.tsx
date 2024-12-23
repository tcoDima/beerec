import { useState } from "react";
import "./BottomNav.css";
import GameList from "./GameList";
import CreateNewGame from "./CreateNewGame";
import ActiveGame from "./ActiveGame";

const BottomNav = () => {
  const [pageState, setPageState] = useState<any>({
    gameList: false,
    createNewGame: false,
    activeGame: false,
  });

  const [activeGame, setActiveGame] = useState({
    gameId: null,
    gameName: "",
    isLocked: false,
    winner: "",
  });

  // Navigate between the components
  const showPage = (pageName: string) => {
    setPageState({
      gameList: false,
      createNewGame: false,
      activeGame: false,
      [pageName]: true,
    });
  };

  // Load game in GameList
  const loadGame = (
    gameId: any,
    gameName: string,
    isLocked: boolean,
    winner: string
  ) => {
    setActiveGame({ gameId, gameName, isLocked, winner });
    console.log(activeGame);
    showPage("activeGame");
  };

  return (
    <>
      {pageState.gameList && <GameList onLoadGame={loadGame} />}
      {pageState.createNewGame && <CreateNewGame />}
      {pageState.activeGame && (
        <ActiveGame
          gameId={activeGame.gameId}
          gameName={activeGame.gameName}
          isLocked={activeGame.isLocked}
          winner={activeGame.winner}
        />
      )}
      <div className="wrapper bottom-nav">
        <div className="outer">
          <button
            onClick={() => {
              showPage("gameList");
            }}
            className="inner n-button"
          >
            Historie her
          </button>
        </div>
        <div className="outer">
          <button
            onClick={() => {
              showPage("createNewGame");
            }}
            className="inner n-button"
          >
            Nová hra
          </button>
        </div>
        {pageState.activeGame && (
          <div className="outer">
            <button className="inner n-button">Ukončit hru</button>
          </div>
        )}
      </div>
    </>
  );
};

export default BottomNav;
