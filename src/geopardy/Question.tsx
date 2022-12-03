import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquareXmark,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import ReactAudioPlayer from "react-audio-player";

import { AppContext } from "../services/SocketProvider";
import { BackButton } from "./components/BackButton";
import { IconsBackground } from "./components/IconBackgrounds";
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
    handleQuestionFinished,
  } = useContext(AppContext);
  const params = useParams();

  const handleBackClick = () => {
    handleQuestionFinished();
    handleNoAnswer();
  };
  const onGoodAnswer = () => {
    handleQuestionFinished();
    handleCorrectAnswer();
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
          <iframe
            width="400"
            height="200"
            title="soundQuestion"
            src={currentQuestion.soundUrl}
          />
        )}
      </div>
      <div className="bottomPanel">
        {!isQuestionActive && (
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
