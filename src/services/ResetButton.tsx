import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "./SocketProvider";

import "./resetButton.css";

// Visible on every host screen – wipes the whole tournament (clean start)
export const ResetButton = () => {
  const { isConnected, resetTournament } = useContext(AppContext);

  return (
    <button
      type="button"
      className="resetButton"
      onClick={resetTournament}
      disabled={!isConnected}
      aria-label="Zresetuj cały turniej"
      title="Zresetuj cały turniej (czysty start)"
    >
      <FontAwesomeIcon icon={faRotateLeft} />
    </button>
  );
};
