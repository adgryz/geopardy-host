import { useContext, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../services/SocketProvider";

import "./createGame.css";

export const CreateGame = () => {
  const { isConnected, gameId, sendCrateGame } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameId) {
      navigate("/lobby");
    }
  }, [gameId]);

  return (
    <div className="createGameContainer">
      {!isConnected && <span className="loader" />}

      <Button colorScheme="teal" size="lg" onClick={sendCrateGame}>
        Stwórz Grę
      </Button>
    </div>
  );
};
