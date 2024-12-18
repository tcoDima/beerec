import { addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { playerCollectionRef } from "../firebaseConfig";
import "./CreatePlayer.css";

const CreatePlayer = () => {
  const [newName, setNewName] = useState("");
  const [newWin, setNewWin] = useState(0);
  const [newLose, setNewLose] = useState(0);
  const [newScore, setNewScore] = useState(0);

  const placeholderName = "Hugh Janus";

  const createPlayer = async () => {
    if (!newName) return;
    await addDoc(playerCollectionRef, {
      name: newName,
      wins: Number(newWin),
      losses: Number(newLose),
      score: Number(newScore),
      createdAt: serverTimestamp() || new Date(0),
    });
    setNewName("");
  };

  return (
    <>
      <div className="create-player-container">
        <input
          className="cp-input"
          type="stringtext"
          placeholder={placeholderName}
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              createPlayer();
            }
          }}
        />
        <button onClick={createPlayer} className="cp-button">
          <h2>+ Přidat hráče</h2>
        </button>
      </div>
    </>
  );
};

export default CreatePlayer;
