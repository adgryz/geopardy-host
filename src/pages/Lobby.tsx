import { useContext } from "react";
import { Button } from "@chakra-ui/react";

import { AppContext } from "../services/SocketProvider";

import "./lobby.css";

export const Lobby = () => {
  const { gameId, players, playersCountToStartTheGame, sendStartGame } =
    useContext(AppContext);
  const playersArray = Object.entries(players);

  return (
    <div className="lobbyContainer">
      <div className="gameIdInfo">
        ID gry: <span className="gameId">{gameId}</span>
      </div>
      <div className="waitingForPlayers">
        Oczekiwanie na graczy: {playersArray.length}/
        {playersCountToStartTheGame}
      </div>
      <div className="lobbyLabel">Gracze w lobby:</div>
      <div className="playersList">
        {playersArray.map(([id, player]) => (
          <div className="player" key={id}>
            {player.name}
          </div>
        ))}
      </div>
      <Button
        disabled={
          !playersArray.length ||
          playersArray.length !== playersCountToStartTheGame
        }
        size="lg"
        onClick={sendStartGame}
      >
        Rozpocznij Grę
      </Button>
    </div>
  );
};
