import Playerlist from "./Playerlist";
import CreatePlayer from "./CreatePlayer";
import Logo from "./Logo";
import "./ActiveGame.css";

const ActiveGame = () => {
  return (
    <>
      <Logo />
      <div className="active-game-container">
        <Playerlist />
        <CreatePlayer />
      </div>
    </>
  );
};

export default ActiveGame;
