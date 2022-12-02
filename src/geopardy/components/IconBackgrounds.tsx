import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import "./iconBackgrounds.css";
import { memo } from "react";

const getRandomSize = () => `${150 + Math.floor(Math.random() * 50)}px`;

const IconsBackgroundInternal = ({
  icon = faCirclePlay,
  isFull = false,
}: {
  icon?: IconDefinition;
  isFull?: boolean;
}) => {
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
    <div
      className="iconBackground"
      style={isFull ? { width: "100%", height: "100%" } : {}}
    >
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

export const IconsBackground = memo(IconsBackgroundInternal);
