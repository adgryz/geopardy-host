import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faSnowflake } from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../../services/SocketProvider";
import { IQuestionsList } from "../../services/geopardyTypes";
import "./questionsList.css";

interface IQuestionsListProps {
  questions: IQuestionsList;
}

export const QuestionsList = ({ questions }: IQuestionsListProps) => {
  const navigate = useNavigate();
  const { setQuestionStarted } = useContext(AppContext);

  const openQuestion = (questionId: string, isAnswered?: boolean) => {
    if (isAnswered) {
      return;
    }
    setQuestionStarted(questionId);
    navigate(`/question/${questionId}`);
  };

  return (
    <div className="questionsList">
      {questions.map((question) => (
        <div
          key={question.id}
          className={`question ${
            question.isAnswered ? "questionAnswered" : ""
          }`}
          onClick={() => openQuestion(question.id, question.isAnswered)}
        >
          {question.isAnswered ? (
            <FontAwesomeIcon className="questionDone" icon={faSnowflake} />
          ) : (
            <div className="questionPoints">
              <div>{question.points}</div>
              <FontAwesomeIcon className="gift" icon={faGift} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
