import { useContext } from "react";
import { Button } from "@chakra-ui/react";

import { AppContext } from "../services/SocketProvider";

import "./lobby.css";

export const Lobby = () => {
  const {
    tournamentId,
    players,
    playersCountToStartTheTournament,
    sendStartTournament,
  } = useContext(AppContext);
  const playersArray = Object.entries(players);
  const isStartGameDisabled =
    !playersArray.length ||
    playersArray.length !== playersCountToStartTheTournament;

  return (
    <div className="lobbyContainer">
      <div className="tournamentIdInfo">
        ID turnieju: <span className="tournamentId">{tournamentId}</span>
      </div>
      <div className="waitingForPlayers">
        Oczekiwanie na graczy: {playersArray.length}/
        {playersCountToStartTheTournament}
      </div>
      <div className="lobbyLabel">Gracze w lobby:</div>
      <div className="playersList">
        {playersArray.map(([id, player]) => (
          <div className="lobbyPlayerContainer" key={id}>
            <img
              className="lobbyPlayerAvatar"
              src={player.base64Photo}
              alt="avatar"
            />
            <div className="lobbyPlayerName">{player.name}</div>
          </div>
        ))}
      </div>
      <Button
        disabled={isStartGameDisabled}
        size="lg"
        onClick={sendStartTournament}
      >
        Rozpocznij Turniej
      </Button>
    </div>
  );
};
