import { CSSProperties, useContext } from "react";

import { AppContext } from "../services/SocketProvider";
import { Scenery } from "../festive/Scenery";
import { Players } from "./components/Players";
import { QuestionsList } from "./components/QuestionsList";

import "./geopardy.css";

export const Geopardy = () => {
  const { game, roundNumber } = useContext(AppContext);
  const groups =
    roundNumber === 1 ? game.firstQuestionsGroup : game.secondQuestionsGroup;

  return (
    <div className="stage geopardy">
      <Scenery hills={false} flakes={26} />
      <div className="geopardyContent">
        <div className="geopardyTopBar">
          <div className="roundBadge">
            <span className="eyebrow">Runda</span>
            <span className="display goldText">{roundNumber}</span>
          </div>
          <Players />
        </div>
        {/* key = runda: nowa plansza wjeżdża od nowa */}
        <div className="questionsBoard" key={roundNumber}>
          {groups.map((group, index) => (
            <div
              key={group.groupName}
              className="fullQuestionColumn"
              style={{ "--col": index } as CSSProperties}
            >
              <div className="groupName">
                <span>{group.groupName}</span>
              </div>
              <QuestionsList questions={group.questions} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
