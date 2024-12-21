import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";
import "./CreatePlayer.css";

const CreatePlayer = (props: any) => {
  const [newName, setNewName] = useState("");

  const placeholderName = "Hugh Janus";

  const createPlayer = async () => {
    if (!props.gameId) {
      console.error("Game ID is missing!");
      return;
    }
    if (!newName) return;

    const playersCollectionRef = collection(
      db,
      `games/${props.gameId}/players`
    );

    await addDoc(playersCollectionRef, {
      name: newName,
      wins: Number(0),
      losses: Number(0),
      score: Number(0),
      createdAt: serverTimestamp() || new Date(0),
    });

    console.log("Succesfuly created new player: ", newName);

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
