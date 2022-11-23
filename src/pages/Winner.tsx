import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "../services/geopardyTypes";

import { AppContext } from "../services/SocketProvider";

import "./winner.css";

export const Winner = () => {
  const { currentGamePlayers, sendProceedToTheNextGame } =
    useContext(AppContext);
  const navigate = useNavigate();
  const deepCopy: Player[] = JSON.parse(JSON.stringify(currentGamePlayers));
  const winner = deepCopy.sort((p1, p2) => p1.score - p2.score)[0];

  const goBackToTournamentSummary = () => {
    navigate("/tournament");
    sendProceedToTheNextGame({ winnerId: winner.id });
  };

  return (
    <div className="winnerContainer">
      <div>{`Zwycięża ${winner.name} z wynikiem ${winner.score}`}</div>
      <div onClick={goBackToTournamentSummary}>Powrót</div>
    </div>
  );
};
