import "./Logo.css";
import beerecShape from "../assets/beerec.svg";

const Logo = () => {
  return (
    <>
      <div className="logo-container">
        <h1>Beerec</h1>
        <img src={beerecShape} className="beerec-shape"></img>
      </div>
    </>
  );
};

export default Logo;
