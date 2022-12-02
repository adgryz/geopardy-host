import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../geopardy/components/BackButton";
import { Player } from "../services/geopardyTypes";

import { AppContext } from "../services/SocketProvider";

import "./winner.css";

export const Winner = () => {
  const { currentGamePlayers, sendProceedToTheNextGame, isFinal } =
    useContext(AppContext);
  const navigate = useNavigate();
  const deepCopy: Player[] = JSON.parse(JSON.stringify(currentGamePlayers));
  const winner = deepCopy.sort((p1, p2) => p2.score - p1.score)[0];

  const goBackToTournamentSummary = () => {
    if (isFinal) {
      navigate("/");
    } else {
      navigate("/tournament");
    }
    sendProceedToTheNextGame({ winnerId: winner.id });
  };

  return (
    <div className="winnerContainer">
      {isFinal ? (
        <div className="winnerHeader">{`Cały turniej zwycięża ${winner.name} z wynikiem ${winner.score}`}</div>
      ) : (
        <div className="winnerHeader">
          {`Zwycięża ${winner.name} z wynikiem ${winner.score}`}{" "}
          <FontAwesomeIcon className="winnerCurrency" icon={faGift} />
        </div>
      )}
      <BackButton onClick={goBackToTournamentSummary} />
    </div>
  );
};
