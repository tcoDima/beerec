import CreatePlayer from "./CreatePlayer";
import "./ActiveGame.css";
import PlayerList from "./PlayerList";

const ActiveGame = (props: any) => {
  return (
    <>
      <h1 className="active-game-name">{props.gameName}</h1>
      <div className="active-game-container">
        <PlayerList gameId={props.gameId} />
        <CreatePlayer gameId={props.gameId} />
      </div>
    </>
  );
};

export default ActiveGame;
