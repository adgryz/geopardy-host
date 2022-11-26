import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquareXmark,
  faCirclePlay,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import ReactAudioPlayer from "react-audio-player";

import { AppContext } from "../services/SocketProvider";
import "./question.css";
import { BackButton } from "./components/BackButton";

export const Question = () => {
  const {
    game,
    roundNumber,
    answeringPlayerName,
    setCurrentQuestionPoints,
    sendStartQuestion,
    handleCorrectAnswer,
    handleWrongAnswer,
    handleNoAnswer,
    handleQuestionFinished,
  } = useContext(AppContext);
  const params = useParams();

  const handleBackClick = () => {
    handleNoAnswer();
    handleQuestionFinished();
  };
  const onGoodAnswer = () => {
    handleCorrectAnswer();
    handleQuestionFinished();
  };

  const [isQuestionActive, setIsQuestionActive] = useState(false);
  const onPlayQuestion = () => {
    sendStartQuestion();
    setIsQuestionActive(true);
  };

  const currentQuestion =
    roundNumber === 1
      ? game.firstQuestionsGroup
          .flatMap((questionsGroup) =>
            questionsGroup.questions.map((question) => ({
              ...question,
              icon: questionsGroup.icon,
              type: questionsGroup.questionsGroupType,
            }))
          )
          .find((question) => question.id === params.id)
      : game.secondQuestionsGroup
          .flatMap((questionsGroup) =>
            questionsGroup.questions.map((question) => ({
              ...question,
              icon: questionsGroup.icon,
              type: questionsGroup.questionsGroupType,
            }))
          )
          .find((question) => question.id === params.id);

  useEffect(() => {
    if (!currentQuestion) {
      return;
    }
    setCurrentQuestionPoints(currentQuestion.points);
  }, [currentQuestion, setCurrentQuestionPoints]);

  return (
    <div
      className={`colorBackground ${
        isQuestionActive && !answeringPlayerName ? "questionOpenForAnswers" : ""
      }`}
    >
      <IconsBackground icon={currentQuestion?.icon} />
      <div
        className={`fullQuestion ${
          currentQuestion?.imageUrl ? "imageQuestionType" : ""
        }`}
      >
        {currentQuestion?.text}
        {currentQuestion?.imageUrl && (
          <img
            src={currentQuestion.imageUrl}
            className="questionImage"
            alt="questionPhoto"
          />
        )}
        {currentQuestion?.soundUrl && (
          <ReactAudioPlayer
            className="questionSound"
            src={currentQuestion.soundUrl}
            onEnded={onPlayQuestion}
            controls
          />
        )}
      </div>
      <div className="bottomPanel">
        {!isQuestionActive && !currentQuestion?.soundUrl && (
          <div onClick={onPlayQuestion} className="playQuestionButton">
            <FontAwesomeIcon icon={faCirclePlay} />
          </div>
        )}
        {answeringPlayerName && (
          <>
            <div className="answeringPlayer">
              Odpowiada:
              <span className="answeringPlayerName">{answeringPlayerName}</span>
            </div>
            <div className="isAnswerCorrectContainer">
              <div className="isAnswerCorrect">Odpowiedź jest dobra ?</div>
              <div className="playerAnswerButton" onClick={onGoodAnswer}>
                <FontAwesomeIcon icon={faSquareCheck} />
              </div>
              <div className="playerAnswerButton" onClick={handleWrongAnswer}>
                <FontAwesomeIcon icon={faSquareXmark} />
              </div>
            </div>
          </>
        )}
        <BackButton onClick={handleBackClick} />
      </div>
    </div>
  );
};

const IconsBackground = ({
  icon = faCirclePlay,
}: {
  icon?: IconDefinition;
}) => {
  const getRandomSize = () => `${150 + Math.floor(Math.random() * 50)}px`;
  const getIconsRow = (amount: number) => {
    return new Array(amount).fill(1).map((_, index) => {
      const size = getRandomSize();
      return (
        <FontAwesomeIcon
          key={`icon_${index}`}
          className="questionIcon"
          style={{ width: size, height: size }}
          icon={icon}
        />
      );
    });
  };

  return (
    <div className="iconBackground">
      {icon && (
        <>
          {new Array(8).fill(1).map((_, index) => (
            <div
              className="iconsRow"
              key={`row_${index}`}
              style={{ marginLeft: index % 2 === 0 ? "-200px" : "-100px" }}
            >
              {getIconsRow(12)}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
