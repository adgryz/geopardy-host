import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faPlay,
  faGift,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../services/SocketProvider";
import { Scenery } from "../festive/Scenery";
import { Avatar } from "../festive/Decor";
import { BackButton } from "./components/BackButton";
import { IconsBackground } from "./components/IconBackgrounds";
import "./question.css";

export const Question = () => {
  const {
    game,
    roundNumber,
    answeringPlayerName,
    currentGamePlayers,
    setCurrentQuestionPoints,
    sendStartQuestion,
    handleCorrectAnswer,
    handleWrongAnswer,
    handleNoAnswer,
    handleQuestionFinished,
    activeQuestion,
  } = useContext(AppContext);
  const params = useParams();

  // Order matters: the judgement has to reach the server before the final
  // question of the round is started.
  const handleBackClick = () => {
    handleNoAnswer();
    handleQuestionFinished();
  };
  const onGoodAnswer = () => {
    handleCorrectAnswer();
    handleQuestionFinished();
  };

  // After a reload the server tells whether "play" was already clicked
  const isStartedOnServer =
    !!activeQuestion &&
    activeQuestion.id === params.id &&
    activeQuestion.isStarted;
  const [isQuestionActive, setIsQuestionActive] = useState(isStartedOnServer);
  useEffect(() => {
    if (isStartedOnServer) {
      setIsQuestionActive(true);
    }
  }, [isStartedOnServer]);
  // Ekran bywa rzutowany graczom — odpowiedź jest domyślnie ukryta.
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  useEffect(() => {
    setIsAnswerShown(false);
  }, [params.id]);
  const onPlayQuestion = () => {
    sendStartQuestion();
    setIsQuestionActive(true);
  };

  const groups =
    roundNumber === 1 ? game.firstQuestionsGroup : game.secondQuestionsGroup;
  const currentQuestion = groups
    .flatMap((questionsGroup) =>
      questionsGroup.questions.map((question) => ({
        ...question,
        icon: questionsGroup.icon,
        type: questionsGroup.questionsGroupType,
        groupName: questionsGroup.groupName,
      }))
    )
    .find((question) => question.id === params.id);

  useEffect(() => {
    if (!currentQuestion) {
      return;
    }
    setCurrentQuestionPoints(currentQuestion.points);
  }, [currentQuestion, setCurrentQuestionPoints]);

  const isOpenForAnswers = isQuestionActive && !answeringPlayerName;
  const answeringPlayer = currentGamePlayers.find(
    (player) => player.name === answeringPlayerName
  );

  return (
    <div
      className={`stage colorBackground ${
        isOpenForAnswers ? "questionOpenForAnswers" : ""
      }`}
    >
      <Scenery mood={isOpenForAnswers ? "open" : "night"} flakes={30} />
      <IconsBackground icon={currentQuestion?.icon} />

      <div className="questionMeta">
        <span className="questionMetaCategory">{currentQuestion?.groupName}</span>
        <span className="questionMetaPoints">
          {currentQuestion?.points}
          <FontAwesomeIcon className="gift" icon={faGift} />
        </span>
      </div>

      <div
        className={`fullQuestion display ${
          currentQuestion?.imageUrl ? "imageQuestionType" : ""
        } ${(currentQuestion?.text.length || 0) > 110 ? "isLong" : ""}`}
      >
        <div className="questionText">{currentQuestion?.text}</div>
        {currentQuestion?.imageUrl && (
          <img
            src={currentQuestion.imageUrl}
            className="questionImage"
            alt="questionPhoto"
          />
        )}
        {currentQuestion?.soundUrl && (
          <iframe
            className="questionSound"
            width="400"
            height="200"
            title="soundQuestion"
            src={currentQuestion.soundUrl}
          />
        )}
      </div>

      <div className="bottomPanel">
        {!isQuestionActive && (
          <button
            type="button"
            onClick={onPlayQuestion}
            className="roundBtn roundBtn--play playQuestionButton"
            aria-label="Start pytania"
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        {isOpenForAnswers && (
          <div className="openForAnswersHint">
            <i />
            Można odpowiadać
            <i />
          </div>
        )}
        {answeringPlayerName && (
          <div className="answeringPanel panel" key={answeringPlayerName}>
            <Avatar
              src={answeringPlayer?.base64Photo}
              name={answeringPlayerName}
              size={76}
            />
            <div className="answeringPlayer">
              <span className="eyebrow">Odpowiada</span>
              <span className="answeringPlayerName display">
                {answeringPlayerName}
              </span>
            </div>
            <div className="isAnswerCorrectContainer">
              <div className="isAnswerCorrect">Odpowiedź jest dobra?</div>
              <button
                type="button"
                className="roundBtn roundBtn--ok playerAnswerButton"
                onClick={onGoodAnswer}
                aria-label="Dobra odpowiedź"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                type="button"
                className="roundBtn roundBtn--bad playerAnswerButton"
                onClick={handleWrongAnswer}
                aria-label="Zła odpowiedź"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        )}
        {currentQuestion?.answer && isAnswerShown && (
          <div className="correctAnswer">
            <span className="eyebrow">Poprawna odpowiedź</span>
            <span className="correctAnswerText display">
              {currentQuestion.answer}
            </span>
          </div>
        )}
        <div className="bottomPanelActions">
          {currentQuestion?.answer && (
            <button
              type="button"
              className="pillBtn showAnswerButton"
              onClick={() => setIsAnswerShown((isShown) => !isShown)}
            >
              <FontAwesomeIcon icon={isAnswerShown ? faEyeSlash : faEye} />
              {isAnswerShown ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}
            </button>
          )}
          <BackButton onClick={handleBackClick} />
        </div>
      </div>
    </div>
  );
};
