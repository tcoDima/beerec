import { addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { playerCollectionRef } from "../firebaseConfig";
import "./CreatePlayer.css";

const CreatePlayer = () => {
  const [newName, setNewName] = useState("");

  const placeholderName = "Hugh Janus";

  const createPlayer = async () => {
    if (!newName) return;
    await addDoc(playerCollectionRef, {
      name: newName,
      wins: Number(0),
      losses: Number(0),
      score: Number(0),
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
