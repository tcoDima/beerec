import PlayerList from "./PlayerList";
import CreatePlayer from "./CreatePlayer";
import "./ActiveGame.css";
import trophyIconGold from "../assets/trophy-icon-gold.svg";

const ActiveGame = (props: any) => {
  return (
    <>
      <h1 className="active-game-name">{props.gameName}</h1>
      {props.isLocked && (
        <h1 className="winner-name">
          <img src={trophyIconGold} alt="Winner" /> {props.winner}
        </h1>
      )}
      <div className="active-game-container">
        <PlayerList gameId={props.gameId} isLocked={props.isLocked} />
        {!props.isLocked && <CreatePlayer gameId={props.gameId} />}
      </div>
    </>
  );
};

export default ActiveGame;
