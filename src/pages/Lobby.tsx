import { useContext, useEffect, useRef } from "react";
import { Button } from "@chakra-ui/react";

import { AppContext } from "../services/SocketProvider";
import { Scenery } from "../festive/Scenery";
import { Avatar } from "../festive/Decor";
import { playSound } from "../services/sound";

import "./lobby.css";

// Te same limity co na serwerze
const MIN_GAME_SIZE = 1;
const MAX_GAME_SIZE = 12;
// Zestawy pytań są na 3 gry kwalifikacyjne
const MIN_GAMES_COUNT = 1;
const MAX_GAMES_COUNT = 3;
const DEFAULT_GAME_SIZE = 3;

export const Lobby = () => {
  const {
    // tournamentId,
    players,
    playersCountToStartTheTournament,
    gameSizes,
    setGameSizes,
    sendStartTournament,
    connectedPlayerIds,
    removePlayer,
  } = useContext(AppContext);
  const playersArray = players.map((player) => [player.id, player] as const);

  // A sound for every player that joins
  const previousPlayersCount = useRef(players.length);
  useEffect(() => {
    if (players.length > previousPlayersCount.current) {
      playSound("join");
    }
    previousPlayersCount.current = players.length;
  }, [players.length]);
  const handleRemovePlayer = (playerId: string, playerName: string) => {
    if (window.confirm(`Usunąć gracza ${playerName} z lobby?`)) {
      removePlayer(playerId);
    }
  };
  const isStartGameDisabled =
    !playersArray.length ||
    playersArray.length !== playersCountToStartTheTournament;
  // Zmniejszać można tylko do liczby graczy, którzy już dołączyli
  const canDecrease =
    (playersCountToStartTheTournament || 0) > playersArray.length;
  const changeGameSize = (gameIndex: number, difference: number) => {
    setGameSizes(
      gameSizes.map((gameSize, index) =>
        index === gameIndex ? gameSize + difference : gameSize
      )
    );
  };
  const addGame = () => setGameSizes([...gameSizes, DEFAULT_GAME_SIZE]);
  const lastGameSize = gameSizes[gameSizes.length - 1] ?? 0;
  // Usunąć grę można tylko, jeśli dołączeni gracze dalej się zmieszczą
  const canRemoveGame =
    gameSizes.length > MIN_GAMES_COUNT &&
    (playersCountToStartTheTournament || 0) - lastGameSize >=
      playersArray.length;
  const removeGame = () => setGameSizes(gameSizes.slice(0, -1));
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
        {gameSizes.length > 0 && (
          <div className="gameSizes">
            <div className="gamesCount">
              <span className="gameSizesLabel">Gry kwalifikacyjne</span>
              <div className="gameSizeStepper">
                <button
                  type="button"
                  className="gameSizeButton"
                  aria-label="Usuń grę kwalifikacyjną"
                  disabled={!canRemoveGame}
                  onClick={removeGame}
                >
                  −
                </button>
                <span className="gameSizeValue display">
                  {gameSizes.length}
                </span>
                <button
                  type="button"
                  className="gameSizeButton"
                  aria-label="Dodaj grę kwalifikacyjną"
                  disabled={gameSizes.length >= MAX_GAMES_COUNT}
                  onClick={addGame}
                >
                  +
                </button>
              </div>
              <span className="gameSizesLabel">+ finał</span>
            </div>
            <div className="gameSizesLabel">Liczba graczy w grach</div>
            <div className="gameSizesList">
              {gameSizes.map((gameSize, index) => (
                <div className="gameSize panel" key={index}>
                  <div className="gameSizeName">Gra {index + 1}</div>
                  <div className="gameSizeStepper">
                    <button
                      type="button"
                      className="gameSizeButton"
                      aria-label={`Mniej graczy w grze ${index + 1}`}
                      disabled={gameSize <= MIN_GAME_SIZE || !canDecrease}
                      onClick={() => changeGameSize(index, -1)}
                    >
                      −
                    </button>
                    <span className="gameSizeValue display">{gameSize}</span>
                    <button
                      type="button"
                      className="gameSizeButton"
                      aria-label={`Więcej graczy w grze ${index + 1}`}
                      disabled={gameSize >= MAX_GAME_SIZE}
                      onClick={() => changeGameSize(index, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
