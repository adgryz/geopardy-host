import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../geopardy/components/BackButton";
import { Player } from "../services/geopardyTypes";

import { AppContext } from "../services/SocketProvider";
import { Scenery } from "../festive/Scenery";
import { Avatar, Wreath } from "../festive/Decor";

import "./winner.css";

export const Winner = () => {
  const { currentGamePlayers, sendProceedToTheNextGame, isFinal } =
    useContext(AppContext);
  const navigate = useNavigate();
  const deepCopy: Player[] = JSON.parse(JSON.stringify(currentGamePlayers));
  const winner = deepCopy.sort((p1, p2) => p2.score - p1.score)[0];

  const [isProceeding, setIsProceeding] = useState(false);

  const goBackToTournamentSummary = () => {
    if (isProceeding) return;
    setIsProceeding(true);
    if (isFinal) {
      navigate("/");
    } else {
      navigate("/tournament");
    }
    // without a winner the server picks the best score itself
    sendProceedToTheNextGame({ winnerId: winner?.id });
  };

  return (
    <div className="stage winnerContainer">
      <Scenery mood="win" snow="gold" flakes={60} />
      <div className="stageContent">
        <div className="eyebrow winnerLabel">
          {isFinal ? "Cały turniej zwycięża" : "Zwycięża"}
        </div>
        <div className="winnerPortrait">
          <div className="winnerRays" />
          <Avatar
            className="winnerAvatar"
            src={winner?.base64Photo}
            name={winner?.name}
            size="clamp(150px, 17vw, 230px)"
          />
          <Wreath className="winnerWreath" />
        </div>
        <div className="winnerHeader display goldText">{winner?.name}</div>
        <div className="winnerScore">
          z wynikiem <b>{winner?.score}</b>
          <FontAwesomeIcon className="gift" icon={faGift} />
        </div>
        <BackButton onClick={goBackToTournamentSummary} label="Dalej" />
      </div>
    </div>
  );
};
