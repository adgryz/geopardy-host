import { useContext } from "react";
import { Button } from "@chakra-ui/react";

import { AppContext } from "../services/SocketProvider";
import { Scenery } from "../festive/Scenery";
import { Avatar } from "../festive/Decor";

import "./lobby.css";

export const Lobby = () => {
  const {
    // tournamentId,
    players,
    playersCountToStartTheTournament,
    sendStartTournament,
    connectedPlayerIds,
    removePlayer,
  } = useContext(AppContext);
  const playersArray = players.map((player) => [player.id, player] as const);
  const handleRemovePlayer = (playerId: string, playerName: string) => {
    if (window.confirm(`Usunąć gracza ${playerName} z lobby?`)) {
      removePlayer(playerId);
    }
  };
  const isStartGameDisabled =
    !playersArray.length ||
    playersArray.length !== playersCountToStartTheTournament;
  const emptySlots = Math.max(
    0,
    (playersCountToStartTheTournament || 0) - playersArray.length
  );

  return (
    <div className="stage lobbyContainer">
      <Scenery garland />
      {/* <div className="tournamentIdInfo">
        ID turnieju: <span className="tournamentId">{tournamentId}</span>
      </div> */}
      <div className="stageContent lobbyContentContainer">
        <div className="eyebrow">Oczekiwanie na graczy</div>
        <div className="waitingForPlayers display">
          <span className="goldText" key={playersArray.length}>
            {playersArray.length}
          </span>
          <span className="waitingForPlayersTotal">
            /{playersCountToStartTheTournament}
          </span>
        </div>
        <div className="playersList">
          {playersArray.map(([id, player]) => (
            <div
              className={`lobbyPlayerContainer ${
                connectedPlayerIds.includes(id) ? "" : "isOffline"
              }`}
              key={id}
              title={
                connectedPlayerIds.includes(id) ? undefined : "Brak połączenia"
              }
            >
              <div className="baubleThread" />
              <div className="baubleCap" />
              <Avatar
                className="lobbyPlayerAvatar"
                src={player.base64Photo}
                name={player.name}
                size={104}
              />
              <div className="lobbyPlayerName">{player.name}</div>
              <button
                type="button"
                className="removePlayerButton"
                aria-label={`Usuń gracza ${player.name}`}
                onClick={() => handleRemovePlayer(id, player.name)}
              >
                ×
              </button>
            </div>
          ))}
          {Array.from({ length: emptySlots }, (_, index) => (
            <div className="lobbyPlayerContainer isEmpty" key={`empty_${index}`}>
              <div className="baubleThread" />
              <div className="baubleCap" />
              <div className="lobbyEmptySlot" />
              <div className="lobbyPlayerName">&nbsp;</div>
            </div>
          ))}
        </div>
        <Button
          colorScheme="primary"
          disabled={isStartGameDisabled}
          size="lg"
          onClick={sendStartTournament}
        >
          Rozpocznij Turniej
        </Button>
      </div>
    </div>
  );
};
