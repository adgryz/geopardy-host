import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import { AppContext } from "../../services/SocketProvider";
import "./players.css";

export const Players = () => {
  const { currentGamePlayers } = useContext(AppContext);
  console.log(currentGamePlayers);
  return (
    <div className="playersContainer">
      {currentGamePlayers.map((player) => (
        <div key={player.id} className="playerContainer">
          <div className="gamePlayerContainer">
            <img
              className="gamePlayerImage"
              src={player.base64Photo}
              alt="avatar"
            />
            <div className="gamePlayerName">{player.name}</div>
          </div>
          <div className="gameScoreContainer">
            <div className="gamePlayerScore">{player.score}</div>
            <FontAwesomeIcon className="gamePlayerCurrency" icon={faGift} />
          </div>
        </div>
      ))}
    </div>
  );
};
