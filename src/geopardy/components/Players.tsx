import { useContext } from "react";

import { AppContext } from "../../services/SocketProvider";
import "./players.css";

export const Players = () => {
  const { players } = useContext(AppContext);

  return (
    <div className="playersContainer">
      {players.map((player) => (
        <div key={player.id} className="playerContainer">
          <div className="playerName">{player.name}</div>
          <div className="score">{player.score}</div>
        </div>
      ))}
    </div>
  );
};
