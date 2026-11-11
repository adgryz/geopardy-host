import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppContext } from "../services/SocketProvider";
import { Player } from "../services/geopardyTypes";
import { Scenery } from "../festive/Scenery";
import { Avatar, Sparkle } from "../festive/Decor";

import "./tournamentSummary.css";

export const TournamentSummary = () => {
  const { games, currentGameIndex, finalGame, isFinal, sendStartGame } =
    useContext(AppContext);

  return (
    <div className="stage tournamentSummaryContainer">
      <Scenery />
      <div className="stageContent tournamentSummaryContentContainer">
        <div className="qualifyContainer">
          <div className="qualifyHeader display">Gry kwalifikacyjne</div>
          <div className="qualifyGamesContainer">
            {Object.values(games).map((game, index) => (
              <SingleGameOverview
                key={game.gameId}
                players={game.players}
                index={index + 1}
                isCurrent={!isFinal && index === currentGameIndex}
              />
            ))}
          </div>
        </div>

        <SingleGameOverview
          players={finalGame.players}
          isFinalGame
          isCurrent={isFinal}
        />

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
  isCurrent?: boolean;
} & (
  | { isFinalGame: boolean; index?: never }
  | { isFinalGame?: never; index: number }
);

const SingleGameOverview = ({
  players,
  index,
  isFinalGame,
  isCurrent,
}: ISingleGameOverviewProps) => {
  return (
    <div
      className={`panel singleGameOverviewContainer ${
        isFinalGame ? "isFinalGame" : ""
      } ${isCurrent ? "isCurrent" : ""}`}
    >
      <div className="gameHeader">
        {isFinalGame && <Sparkle className="gameHeaderStar" />}
        {isFinalGame ? "Gra Finałowa" : `Gra kwalifikacyjna numer ${index}`}
        {isFinalGame && <Sparkle className="gameHeaderStar" />}
      </div>
      <div className="singleGameOverviewPlayers">
        {players.map((player) => (
          <div className="singleGameOverviewPlayer" key={player.id}>
            <Avatar src={player.base64Photo} name={player.name} size={64} />
            <div className="singleGameOverviewPlayerName">{player.name}</div>
            {!isFinalGame && (
              <div className="singleGameOverviewPlayerScore">
                {player.score}
                <FontAwesomeIcon className="gift" icon={faGift} />
              </div>
            )}
          </div>
        ))}
        {isFinalGame && !players.length && (
          <div className="singleGameOverviewEmpty">
            Zwycięzcy kwalifikacji trafią tutaj
          </div>
        )}
      </div>
    </div>
  );
};
