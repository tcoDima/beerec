import PlayerList from "./PlayerList";
import CreatePlayer from "./CreatePlayer";
import "./ActiveGame.css";
import trophyIconGold from "../assets/trophy-icon-gold.svg";

interface Props {
  gameName: string;
  gameId: any;
  isLocked: boolean;
  winner?: string;
  fetchPlayers?: any;
  players?: any;
  openModal?: any;
  showModal?: any;
  closeModal?: any;
  selectedPlayerId?: any;
}

const ActiveGame = ({
  gameName,
  gameId,
  isLocked,
  winner,
  fetchPlayers,
  players,
  openModal,
  showModal,
  closeModal,
  selectedPlayerId,
}: Props) => {
  return (
    <>
      <h1 className="active-game-name">{gameName}</h1>
      {isLocked && (
        <h1 className="winner-name">
          <img src={trophyIconGold} alt="Winner" /> {winner}
        </h1>
      )}
      <div className="active-game-container">
        <PlayerList
          gameId={gameId}
          isLocked={isLocked}
          fetchPlayers={fetchPlayers}
          players={players}
          openModal={openModal}
          showModal={showModal}
          selectedPlayerId={selectedPlayerId}
          closeModal={closeModal}
        />
        {!isLocked && <CreatePlayer gameId={gameId} />}
      </div>
    </>
  );
};

export default ActiveGame;
