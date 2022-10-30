import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquareXmark,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";

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
          .flatMap((questionsGroup) => questionsGroup.questions)
          .find((question) => question.id === params.id)
      : game.secondQuestionsGroup
          .flatMap((questionsGroup) => questionsGroup.questions)
          .find((question) => question.id === params.id);

  useEffect(() => {
    if (!currentQuestion) {
      return;
    }
    setCurrentQuestionPoints(currentQuestion.points);
  }, [currentQuestion, setCurrentQuestionPoints]);

  return (
    <div>
      <div
        className={`fullQuestion ${
          isQuestionPlayed && !answeringPlayerName
            ? "questionOpenForAnswers"
            : ""
        }`}
      >
        {currentQuestion?.text}
      </div>
      <div className="bottomPanel">
        {!isQuestionPlayed && (
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
