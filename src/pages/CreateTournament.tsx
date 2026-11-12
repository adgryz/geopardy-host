import { useContext, useState } from "react";
import { Button, Checkbox } from "@chakra-ui/react";

import { AppContext } from "../services/SocketProvider";
import { Scenery } from "../festive/Scenery";
import { Logo } from "../festive/Decor";

import "./createTournament.css";

export const CreateTournament = () => {
  const { isConnected, sendCreateTournament, activeTournamentId, resumeTournament } =
    useContext(AppContext);
  const [isLite, setIsLite] = useState(false);

  return (
    <div className="stage createTournamentContainer">
      <Scenery garland />
      <div className="stageContent">
        <Logo size="clamp(72px, 11vw, 190px)" />
        <div className="createTournamentAction">
          {activeTournamentId && (
            <Button colorScheme="primary" size="lg" onClick={resumeTournament}>
              Wróć do trwającego turnieju
            </Button>
          )}
          <Button
            colorScheme="primary"
            size="lg"
            variant={activeTournamentId ? "outline" : "solid"}
            onClick={() => sendCreateTournament(isLite)}
          >
            {activeTournamentId ? "Stwórz nowy turniej" : "Stwórz Turniej"}
          </Button>
          <Checkbox
            className="createTournamentLite"
            colorScheme="primary"
            size="lg"
            isChecked={isLite}
            onChange={(event) => setIsLite(event.target.checked)}
          >
            Wersja lite
            <span className="createTournamentLiteHint">
              tylko pierwsza runda i pytanie finałowe
            </span>
          </Checkbox>
          {!isConnected && (
            <div className="createTournamentConnecting">
              <span className="loader" />
              Łączenie z serwerem
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
