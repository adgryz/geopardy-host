import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import { AppContext } from "../../services/SocketProvider";
import { Avatar } from "../../festive/Decor";
import "./players.css";

export const Players = () => {
  const { currentGamePlayers, connectedPlayerIds } = useContext(AppContext);
  return (
    <div className="playersContainer">
      {currentGamePlayers.map((player) => (
        <div
          key={player.id}
          className={`playerContainer panel ${
            connectedPlayerIds.includes(player.id) ? "" : "isOffline"
          }`}
          title={
            connectedPlayerIds.includes(player.id)
              ? undefined
              : "Brak połączenia z graczem"
          }
        >
          <Avatar src={player.base64Photo} name={player.name} size={58} />
          <div className="gamePlayerName">{player.name}</div>
          <div className="gameScoreContainer">
            {/* key = wynik, żeby każda zmiana odpalała animację */}
            <div
              key={player.score}
              className={`gamePlayerScore ${
                player.score < 0 ? "isNegative" : ""
              }`}
            >
              {player.score}
            </div>
            <FontAwesomeIcon className="gift" icon={faGift} />
          </div>
        </div>
      ))}
    </div>
  );
};
