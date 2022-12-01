import {
  faCirclePlay,
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../services/SocketProvider";
import "./finalQuestion.css";

const FINAL_QUESTION_TIMEOUT = 30;

export const FinalQuestion = () => {
  const {
    sendShowFinalQuestion,
    sendFinalQuestionTimeOut,
    sendCorrectFinalAnswer,
    sendIncorrectFinalAnswer,
    finishGame,
    changePlayersScore,
    allBetsSent,
    currentGamePlayers,
    game,
    games,
    gameId,
  } = useContext(AppContext);
  const [isFinalQuestionActive, setIsFinalQuestionActive] = useState(false);
  const [handledPlayersIds, setHandledPlayersIds] = useState<string[]>([]);
  const [isAnswerShown, setIsAnswerShown] = useState<Record<string, boolean>>(
    {}
  );
  const showPlayerAnswer = (playerId: string) =>
    setIsAnswerShown({ ...isAnswerShown, [playerId]: true });

  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [timeLeft, setTimeLeft] = useState(FINAL_QUESTION_TIMEOUT);
  useEffect(() => {
    if (isFinalQuestionActive) {
      const intervalId = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1_000);
      setIntervalId(intervalId);
    }
  }, [isFinalQuestionActive]);
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId);
      sendFinalQuestionTimeOut();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (handledPlayersIds.length === currentGamePlayers.length) {
      finishGame();
    }
  }, [handledPlayersIds.length, currentGamePlayers.length]);

  const handleShowQuestion = () => {
    setIsFinalQuestionActive(true);
    sendShowFinalQuestion();
  };

  const handleCorrectAnswer = (playerId: string) => {
    sendCorrectFinalAnswer(playerId);
    setHandledPlayersIds([...handledPlayersIds, playerId]);
    changePlayersScore(playerId, finalQuestionInfos[playerId]?.betAmount);
  };

  const handleIncorrectAnswer = (playerId: string) => {
    sendIncorrectFinalAnswer(playerId);
    setHandledPlayersIds([...handledPlayersIds, playerId]);
    changePlayersScore(playerId, -finalQuestionInfos[playerId]?.betAmount);
  };
  const finalQuestionInfos = gameId ? games[gameId].finalQuestionInfos : {};

  return (
    <div className="finalQuestionContainer">
      {timeLeft !== 0 && !isFinalQuestionActive && (
        <>
          <div className="finalQuestionCategoryHeader">
            Kategoria finalnego pytania:
          </div>
          <div className="finalQuestionCategory">
            {game.finalQuestionCategory}
          </div>
          {allBetsSent && (
            <div
              onClick={handleShowQuestion}
              className="finalQuestionPlayButton"
            >
              <FontAwesomeIcon icon={faCirclePlay} />
            </div>
          )}
        </>
      )}

      {isFinalQuestionActive && timeLeft !== 0 && (
        <div>
          <div className="finalQuestionText">{game.finalQuestionText}</div>
          <div className="finalQuestionTimeLeft">{timeLeft} s</div>
        </div>
      )}

      {timeLeft <= 0 && (
        <div className="finalQuestionPlayersContainer">
          {currentGamePlayers.map((player) => (
            <div key={player.id}>
              <div className="finalQuestionPlayerName">{player.name}</div>
              <div className="finalQuestionPlayerScore">{player.score}</div>
              {isAnswerShown[player.id] ? (
                <>
                  <div>
                    <div className="finalQuestionPlayerAnswer">
                      {finalQuestionInfos[player.id]?.answer}
                    </div>
                    <div className="finalQuestionPlayerBetAmount">
                      {finalQuestionInfos[player.id]?.betAmount}
                    </div>
                  </div>

                  {!handledPlayersIds.find((id) => id === player.id) && (
                    <div className="finalQuestionCorrectnessButtonsContainer">
                      <div
                        className="finalQuestionCorrectButton"
                        onClick={() => handleCorrectAnswer(player.id)}
                      >
                        <FontAwesomeIcon icon={faSquareCheck} />
                      </div>
                      <div
                        className="finalQuestionIncorrectButton"
                        onClick={() => handleIncorrectAnswer(player.id)}
                      >
                        <FontAwesomeIcon icon={faSquareXmark} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="finalQuestionShowAnswerButton"
                  onClick={() => showPlayerAnswer(player.id)}
                >
                  ???
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Złe wartosci punktow graczy od poczatku + potrzebny jakis update po kliknieciu
// Potrzebny przycisk który zakończy grę
