import { useContext } from "react";
import { Button } from "@chakra-ui/react";

import { AppContext } from "../services/SocketProvider";

import "./createTournament.css";

export const CreateTournament = () => {
  const { isConnected, sendCreateTournament } = useContext(AppContext);

  return (
    <div className="createTournamentContainer">
      {!isConnected && <span className="loader" />}

      <Button colorScheme="teal" size="lg" onClick={sendCreateTournament}>
        Stwórz Turniej
      </Button>
    </div>
  );
};
