import { useContext } from "react";
import { Button } from "@chakra-ui/react";

import { AppContext } from "../services/SocketProvider";

import "./tournamentSummary.css";
import { Player } from "../services/geopardyTypes";
import { IconsBackground } from "../geopardy/components/IconBackgrounds";
import { faGift, faSnowman } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const TournamentSummary = () => {
  const { games, currentGameIndex, finalGame, isFinal, sendStartGame } =
    useContext(AppContext);

  return (
    <div className="tournamentSummaryContainer">
      <IconsBackground isFull icon={faSnowman} />
      <div className="tournamentSummaryContentContainer">
        <div className="qualifyContainer">
          <div className="qualifyHeader">Gry kwalifikacyjne</div>
          <div className="qualifyGamesContainer">
            {Object.values(games).map((game, index) => (
              <SingleGameOverview
                key={game.gameId}
                players={game.players}
                index={index + 1}
              />
            ))}
          </div>
        </div>

        <div>
          <SingleGameOverview players={finalGame.players} isFinalGame />
        </div>

        {isFinal ? (
          <Button colorScheme="primary" size="lg" onClick={sendStartGame}>
            Rozpocznij grę finałową
          </Button>
        ) : (
          <Button colorScheme="primary" size="lg" onClick={sendStartGame}>
            Rozpocznij grę numer{" "}
            {currentGameIndex !== undefined ? currentGameIndex + 1 : 0}
          </Button>
        )}
      </div>
    </div>
  );
};

type ISingleGameOverviewProps = {
  players: Player[];
} & (
  | { isFinalGame: boolean; index?: never }
  | { isFinalGame?: never; index: number }
);

const SingleGameOverview = ({
  players,
  index,
  isFinalGame,
}: ISingleGameOverviewProps) => {
  return (
    <div className="singleGameOverviewContainer">
      <div className="gameHeader">
        {isFinalGame ? "Gra Finałowa" : `Gra kwalifkacyjna numer ${index}`}
      </div>
      {players.map((player) => (
        <div className="singleGameOverviewPlayer" key={player.id}>
          <img
            className="singleGameOverviewPlayerImg"
            src={player.base64Photo}
            alt="avatar"
          />
          {}
          <div className="singleGameOverviewPlayerText">
            <span>
              {isFinalGame ? player.name : `${player.name}: ${player.score}`}
            </span>
            {!isFinalGame && (
              <FontAwesomeIcon
                className="summaryPlayerCurrency"
                icon={faGift}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
