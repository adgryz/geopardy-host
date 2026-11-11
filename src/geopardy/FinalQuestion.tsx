import {
  faPlay,
  faGift,
  faCheck,
  faXmark,
  faStar,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../services/SocketProvider";
import { Scenery } from "../festive/Scenery";
import { Avatar, Sparkle } from "../festive/Decor";
import { IconsBackground } from "./components/IconBackgrounds";
import { playSound, useMusic } from "../services/sound";
import "./finalQuestion.css";

const FINAL_QUESTION_TIMEOUT = 45;

export const FinalQuestion = () => {
  const {
    sendShowFinalQuestion,
    sendFinalQuestionTimeOut,
    sendCorrectFinalAnswer,
    sendIncorrectFinalAnswer,
    finishGame,
    changePlayersScore,
    allBetsSent,
    betsCount,
    currentGamePlayers,
    game,
    finalQuestionPhase,
    finalQuestionElapsedMs,
    finalQuestionInfos,
  } = useContext(AppContext);

  // Answers already judged on the server (e.g. before a reload)
  const getJudgedOnServer = () =>
    Object.fromEntries(
      Object.values(finalQuestionInfos)
        .filter((info) => info.isCorrect !== undefined)
        .map((info) => [info.playerId, info.isCorrect as boolean])
    );

  // Initial state comes from the server, so a reload doesn't restart the
  // final question
  const [isFinalQuestionActive, setIsFinalQuestionActive] = useState(
    finalQuestionPhase === "answering"
  );
  const [handledPlayersIds, setHandledPlayersIds] =
    useState<Record<string, boolean>>(getJudgedOnServer);
  const [isAnswerShown, setIsAnswerShown] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        Object.keys(getJudgedOnServer()).map((playerId) => [playerId, true])
      )
  );
  const showPlayerAnswer = (playerId: string) => {
    playSound("reveal");
    setIsAnswerShown((shown) => ({ ...shown, [playerId]: true }));
  };
  const [isCorrectAnswerShown, setIsCorrectAnswerShown] = useState(false);
  const showCorrectAnswer = () => {
    playSound("reveal");
    setIsCorrectAnswerShown(true);
  };

  const [timeLeft, setTimeLeft] = useState(() => {
    if (finalQuestionPhase === "timeUp") return 0;
    if (finalQuestionPhase === "answering" && finalQuestionElapsedMs) {
      return Math.max(
        1,
        FINAL_QUESTION_TIMEOUT - Math.floor(finalQuestionElapsedMs / 1000)
      );
    }
    return FINAL_QUESTION_TIMEOUT;
  });
  useEffect(() => {
    if (!isFinalQuestionActive) {
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => Math.max(0, timeLeft - 1));
    }, 1_000);
    return () => clearInterval(intervalId);
  }, [isFinalQuestionActive]);
  useEffect(() => {
    if (timeLeft === 0 && finalQuestionPhase !== "timeUp") {
      sendFinalQuestionTimeOut();
    }
  }, [timeLeft]);

  // Music while the players are betting and thinking, the clock gets loud
  // for the last seconds and a gong ends the time.
  useMusic(
    timeLeft === 0 ? null : isFinalQuestionActive ? "thinking" : "betting"
  );
  const previousTimeLeft = useRef(timeLeft);
  useEffect(() => {
    if (timeLeft < previousTimeLeft.current) {
      if (timeLeft === 0) {
        playSound("timeUp");
      } else if (timeLeft <= 5) {
        playSound("tickUrgent");
      } else if (timeLeft <= 10) {
        playSound("tick");
      }
    }
    previousTimeLeft.current = timeLeft;
  }, [timeLeft]);
  const previousBetsCount = useRef(betsCount);
  useEffect(() => {
    if (betsCount > previousBetsCount.current) {
      playSound("bet");
    }
    previousBetsCount.current = betsCount;
  }, [betsCount]);

  // Keep in sync with judgements confirmed by the server
  useEffect(() => {
    const judgedOnServer = getJudgedOnServer();
    if (Object.keys(judgedOnServer).length) {
      setHandledPlayersIds((handled) => ({ ...judgedOnServer, ...handled }));
    }
  }, [finalQuestionInfos]);

  useEffect(() => {
    if (
      currentGamePlayers.length &&
      currentGamePlayers.every(
        (player) => handledPlayersIds[player.id] !== undefined
      )
    ) {
      finishGame();
    }
  }, [handledPlayersIds, currentGamePlayers.length]);

  const handleShowQuestion = () => {
    if (isFinalQuestionActive) return;
    playSound("open");
    setIsFinalQuestionActive(true);
    sendShowFinalQuestion();
  };

  const handleCorrectAnswer = (playerId: string) => {
    if (handledPlayersIds[playerId] !== undefined) return;
    playSound("correct");
    sendCorrectFinalAnswer(playerId);
    setHandledPlayersIds((handled) => ({ ...handled, [playerId]: true }));
    changePlayersScore(playerId, finalQuestionInfos[playerId]?.betAmount);
  };

  const handleIncorrectAnswer = (playerId: string) => {
    if (handledPlayersIds[playerId] !== undefined) return;
    playSound("wrong");
    sendIncorrectFinalAnswer(playerId);
    setHandledPlayersIds((handled) => ({ ...handled, [playerId]: false }));
    changePlayersScore(playerId, -finalQuestionInfos[playerId]?.betAmount);
  };

  const isRevealing = timeLeft <= 0;
  const ringLength = 2 * Math.PI * 54;

  return (
    <div className="stage finalQuestionContainer">
      <Scenery flakes={34} />
      <IconsBackground icon={faStar} />
      <div className="stageContent finalQuestionContentContainer">
        {timeLeft !== 0 && !isFinalQuestionActive && (
          <>
            <Sparkle className="finalQuestionStar" />
            <div className="eyebrow finalQuestionCategoryHeader">
              Kategoria finałowego pytania
            </div>
            <div className="finalQuestionCategory display goldText">
              {game.finalQuestionCategory}
            </div>
            {allBetsSent ? (
              <button
                type="button"
                onClick={handleShowQuestion}
                className="roundBtn roundBtn--play finalQuestionPlayButton"
                aria-label="Pokaż pytanie"
              >
                <FontAwesomeIcon icon={faPlay} />
              </button>
            ) : (
              <>
                <div className="finalQuestionWaiting">
                  <span className="loader" />
                  Gracze obstawiają ({betsCount}/{currentGamePlayers.length})
                </div>
                {/* When someone lost connection for good – missing bets count as 0 */}
                <button
                  type="button"
                  className="pillBtn"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Nie wszyscy obstawili. Brakujące zakłady będą równe 0. Pokazać pytanie?"
                      )
                    ) {
                      handleShowQuestion();
                    }
                  }}
                >
                  Pokaż pytanie bez czekania
                </button>
              </>
            )}
          </>
        )}

        {isFinalQuestionActive && timeLeft !== 0 && (
          <>
            <div className="finalQuestionText display">
              {game.finalQuestionText}
            </div>
            <div
              className={`finalQuestionTimeLeft ${
                timeLeft <= 10 ? "isEnding" : ""
              }`}
            >
              <svg viewBox="0 0 120 120" aria-hidden>
                <circle className="timerTrack" cx="60" cy="60" r="54" />
                <circle
                  className="timerBar"
                  cx="60"
                  cy="60"
                  r="54"
                  strokeDasharray={ringLength}
                  strokeDashoffset={
                    ringLength * (1 - (timeLeft - 1) / FINAL_QUESTION_TIMEOUT)
                  }
                />
              </svg>
              <span className="display" key={timeLeft}>
                {timeLeft}
              </span>
            </div>
          </>
        )}

        {isRevealing && game.finalQuestionAnswer && (
          <div className="finalQuestionCorrectAnswer">
            {isCorrectAnswerShown ? (
              <div className="correctAnswer">
                <span className="eyebrow">Poprawna odpowiedź</span>
                <span className="correctAnswerText display">
                  {game.finalQuestionAnswer}
                </span>
              </div>
            ) : (
              <button
                type="button"
                className="pillBtn"
                onClick={showCorrectAnswer}
              >
                <FontAwesomeIcon icon={faEye} />
                Pokaż poprawną odpowiedź
              </button>
            )}
          </div>
        )}

        {isRevealing && (
          <div className="finalQuestionPlayersContainer">
            {currentGamePlayers.map((player) => (
              <div
                className={`panel finalQuestionPlayerAnswerContainer ${
                  handledPlayersIds[player.id] === true
                    ? "isCorrect"
                    : handledPlayersIds[player.id] === false
                    ? "isIncorrect"
                    : ""
                }`}
                key={player.id}
              >
                <Avatar src={player.base64Photo} name={player.name} size={92} />
                <div className="finalQuestionPlayerName display">
                  {player.name}
                </div>
                <div className="finalQuestionPlayerScore">
                  <span key={player.score}>{player.score}</span>
                  <FontAwesomeIcon className="gift" icon={faGift} />
                </div>
                {isAnswerShown[player.id] ? (
                  <div className="finalQuestionReveal">
                    <div className="eyebrow finalQuestionPlayerAnswerHeader">
                      Odpowiedź
                    </div>
                    <div className="finalQuestionPlayerAnswer display">
                      {finalQuestionInfos[player.id]?.answer || "—"}
                    </div>
                    <div className="finalQuestionPlayerBetAmount">
                      Postawione:{" "}
                      <b>{finalQuestionInfos[player.id]?.betAmount}</b>
                      <FontAwesomeIcon className="gift" icon={faGift} />
                    </div>

                    {handledPlayersIds[player.id] === undefined && (
                      <div className="finalQuestionCorrectnessButtonsContainer">
                        <button
                          type="button"
                          className="roundBtn roundBtn--ok finalQuestionCorrectButton"
                          onClick={() => handleCorrectAnswer(player.id)}
                          aria-label="Dobra odpowiedź"
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          type="button"
                          className="roundBtn roundBtn--bad finalQuestionIncorrectButton"
                          onClick={() => handleIncorrectAnswer(player.id)}
                          aria-label="Zła odpowiedź"
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="finalQuestionShowAnswerButton display"
                    onClick={() => showPlayerAnswer(player.id)}
                  >
                    ???
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Złe wartosci punktow graczy od poczatku + potrzebny jakis update po kliknieciu
// Potrzebny przycisk który zakończy grę
