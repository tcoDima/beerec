import CreatePlayer from "./CreatePlayer";
import Logo from "./Logo";
import "./ActiveGame.css";
import PlayerList from "./PlayerList";

const ActiveGame = () => {
  return (
    <>
      <Logo />
      <div className="active-game-container">
        <PlayerList />
        <CreatePlayer />
      </div>
    </>
  );
};

export default ActiveGame;
