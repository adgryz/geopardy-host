import { useContext } from "react";

import { AppContext } from "../services/SocketProvider";
import { Players } from "./components/Players";
import { QuestionsList } from "./components/QuestionsList";

import "./geopardy.css";

export const Geopardy = () => {
  const { game, roundNumber } = useContext(AppContext);

  return (
    <div className="geopardy">
      <Players />
      <div className="questionsBoard">
        {roundNumber === 1
          ? game.firstQuestionsGroup.map((group) => (
              <div key={group.groupName} className="fullQuestionColumn">
                <div className="groupName">{group.groupName}</div>
                <QuestionsList questions={group.questions} />
              </div>
            ))
          : game.secondQuestionsGroup.map((group) => (
              <div key={group.groupName} className="fullQuestionColumn">
                <div className="groupName">{group.groupName}</div>
                <QuestionsList questions={group.questions} />
              </div>
            ))}
      </div>
    </div>
  );
};
