import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  } = useContext(AppContext);
  const navigate = useNavigate();
  const params = useParams();

  const backToHome = () => navigate("/game");
  const handleBackClick = () => {
    handleNoAnswer();
    backToHome();
  };
  const onGoodAnswer = () => {
    handleCorrectAnswer();
    backToHome();
  };

  const [isQuestionPlayed, setIsQuestionPlayed] = useState(false);
  const onPlayQuestion = () => {
    sendStartQuestion();
    setIsQuestionPlayed(true);
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
        isQuestionPlayed && !answeringPlayerName ? "questionOpenForAnswers" : ""
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
        {!isQuestionPlayed && !currentQuestion?.soundUrl && (
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
        <div className="homeButton" onClick={handleBackClick}>
          POWRÓT
        </div>
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
    return new Array(amount).fill(1).map(() => {
      const size = getRandomSize();
      return (
        <FontAwesomeIcon
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
          {new Array(8).fill(1).map((x, index) => (
            <div
              className="iconsRow"
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
