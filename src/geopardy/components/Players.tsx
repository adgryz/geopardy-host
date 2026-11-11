import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import { AppContext } from "../../services/SocketProvider";
import { Avatar } from "../../festive/Decor";
import "./players.css";

export const Players = () => {
  const { currentGamePlayers, connectedPlayerIds } = useContext(AppContext);
  // Przy większej liczbie graczy plakietki są mniejsze, żeby zmieściły się
  // nad planszą.
  const isCompact = currentGamePlayers.length > 4;
  return (
    <div className={`playersContainer ${isCompact ? "isCompact" : ""}`}>
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
          <Avatar
            src={player.base64Photo}
            name={player.name}
            size={isCompact ? 42 : 58}
          />
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
