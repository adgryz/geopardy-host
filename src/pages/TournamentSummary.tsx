import { useContext } from "react";
import { Button } from "@chakra-ui/react";

import { AppContext } from "../services/SocketProvider";

import "./tournamentSummary.css";
import { Player } from "../services/geopardyTypes";

export const TournamentSummary = () => {
  const { games, currentGameIndex, sendStartGame } = useContext(AppContext);

  const finalGame = { players: [] };
  return (
    <div className="tournamentSummaryContainer">
      <div>
        <div>Gry kwalifikacyjne</div>
        <div>
          {Object.values(games).map((game, index) => (
            <SingleGameOverview players={game.players} index={index + 1} />
          ))}
        </div>
      </div>

      <div>
        <SingleGameOverview players={finalGame.players} isFinalGame />
      </div>

      <Button size="lg" onClick={sendStartGame}>
        Rozpocznij grę numer {currentGameIndex ? currentGameIndex + 1 : 0}
      </Button>
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
      <div>
        {isFinalGame ? "Gra Finałowa" : `Gra kwalifkacyjna numer ${index}`}
      </div>
      {players.map((player) => (
        <div key={player.id}>
          {player.name}: {player.score}
        </div>
      ))}
    </div>
  );
};
