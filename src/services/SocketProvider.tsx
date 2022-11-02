import { useState, ReactNode, createContext } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import { IGameSetup, Player } from "./geopardyTypes";
import { gameSetup } from "./gameSetup";
import { getUseSocket } from "./useSocket";

// const socket = io("https://geopargygame.herokuapp.com/");
const socket = io("http://localhost:3003");
const useSocket = getUseSocket(socket);

const CONNECT = "connect";
const DISCONNECT = "disconnect";

const SEND_CREATE_GAME = "sendCrateGame";
const SEND_START_GAME = "sendStartGame";
const SEND_START_QUESTION = "sendStartQuestion";
const SEND_NEW_PLAYER_SCORE = "sendNewPlayerScore";
const SEND_PLAYER_ANSWERED_WRONGLY = "sendPlayerAnsweredWrongly";
const SEND_NO_ANSWER = "sendNoAnswer";

const RETURN_NEW_GAME = "returnNewGame";
const RETURN_NEW_PLAYERS = "returnNewPlayers";
const RETURN_START_GAME = "returnStartGame";
const RETURN_ANSWER_QUESTION = "returnAnswerQuestion";
const RETURN_ANSWER_QUESTION_END = "returnAnswerQuestionEnd";

interface ISocketProviderProps {
  children: ReactNode;
}

interface AppData {
  isConnected: boolean;
  gameId?: string;
  sendCrateGame: () => void;

  players: Player[];
  playersCountToStartTheGame?: number;
  sendStartGame: () => void;
  sendStartQuestion: () => void;

  game: IGameSetup;
  roundNumber: 1 | 2;
  currentQuestionPoints: number;
  answeringPlayerName?: string;
  startQuestion: (questionId: string) => void;
  handleCorrectAnswer: () => void;
  handleWrongAnswer: () => void;
  handleNoAnswer: () => void;
  setCurrentQuestionPoints: (points: number) => void;
}

export const AppContext = createContext<AppData>({
  isConnected: false,
  sendCrateGame: () => {},

  players: [],
  sendStartGame: () => {},
  sendStartQuestion: () => {},

  game: gameSetup,
  roundNumber: 1,
  currentQuestionPoints: 0,
  startQuestion: () => {},
  handleCorrectAnswer: () => {},
  handleWrongAnswer: () => {},
  handleNoAnswer: () => {},
  setCurrentQuestionPoints: () => {},
});

export const SocketProvider = ({ children }: ISocketProviderProps) => {
  const navigate = useNavigate();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [playersCountToStartTheGame, setPlayersCountToStartTheGame] =
    useState<number | undefined>();
  const [gameId, setGameId] = useState<string | undefined>();

  const [game, setGame] = useState<IGameSetup>(gameSetup);
  const [roundNumber, setRoundNumber] = useState<1 | 2>(1);
  const [currentQuestionPoints, setCurrentQuestionPoints] = useState<number>(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [answeringPlayerId, setAnsweringPlayerId] =
    useState<string | undefined>();
  const answeringPlayerName = answeringPlayerId
    ? players.find((player) => player.id === answeringPlayerId)?.name
    : undefined;

  // State handlers

  const startQuestion = (questionId: string) => {
    const newGame = setQuestionAnswered(questionId);
    if (newGame && roundNumber === 1) {
      checkIfSecondRound(newGame);
    }
  };
  const setQuestionAnswered = (questionId: string) => {
    const newGame: IGameSetup = JSON.parse(JSON.stringify(game));

    const answeredQuestion =
      roundNumber === 1
        ? newGame.firstQuestionsGroup
            .flatMap((questionsGroup) => questionsGroup.questions)
            .find((question) => question.id === questionId)
        : newGame.secondQuestionsGroup
            .flatMap((questionsGroup) => questionsGroup.questions)
            .find((question) => question.id === questionId);
    if (!answeredQuestion) {
      return;
    }

    answeredQuestion.isAnswered = true;
    setGame(newGame);
    return newGame;
  };
  const checkIfSecondRound = (newGame: IGameSetup) => {
    const allFirstGroupQuestionsAnswered = newGame.firstQuestionsGroup
      .flatMap((questionsGroup) => questionsGroup.questions)
      .every((question) => question.isAnswered);
    if (allFirstGroupQuestionsAnswered) {
      setRoundNumber(2);
    }
  };

  const handleCorrectAnswer = () => {
    if (!answeringPlayerId) return;
    const answeringPlayer = players.find(
      (player) => player.id === answeringPlayerId
    );
    if (!answeringPlayer) return;

    const newPlayerScore = answeringPlayer.score + currentQuestionPoints;

    setPlayers(
      players.map((player) =>
        player.id === answeringPlayerId
          ? { ...player, score: newPlayerScore }
          : player
      )
    );

    sendNewPlayerScore(answeringPlayerId, newPlayerScore);
    setAnsweringPlayerId(undefined);
  };

  const handleWrongAnswer = () => {
    if (!answeringPlayerId) return;
    const answeringPlayer = players.find(
      (player) => player.id === answeringPlayerId
    );
    if (!answeringPlayer) return;

    const newPlayerScore = answeringPlayer.score - currentQuestionPoints;

    setPlayers(
      players.map((player) =>
        player.id === answeringPlayerId
          ? { ...player, score: newPlayerScore }
          : player
      )
    );

    sendNewPlayerScore(answeringPlayerId, newPlayerScore);
    sendPlayerAnsweredWrongly(answeringPlayerId);
    setAnsweringPlayerId(undefined);
  };

  const handleNoAnswer = () => {
    sendNoAnswer();
  };

  // Socket Listeners

  useSocket(CONNECT, () => {
    setIsConnected(true);
  });

  useSocket(DISCONNECT, () => {
    setIsConnected(false);
  });

  useSocket(
    RETURN_NEW_GAME,
    ({ gameId, playersCount }: { gameId: string; playersCount: number }) => {
      setGameId(gameId);
      setPlayersCountToStartTheGame(playersCount);
    }
  );

  useSocket(RETURN_NEW_PLAYERS, (newPlayers: Player[]) => {
    setPlayers(newPlayers);
  });

  useSocket(RETURN_START_GAME, () => navigate("/game"));

  useSocket(RETURN_ANSWER_QUESTION, (playerId: string) => {
    setAnsweringPlayerId(playerId);
    setPlayers(
      players.map((player) =>
        player.id === playerId ? { ...player, isAnswering: true } : player
      )
    );
  });

  useSocket(RETURN_ANSWER_QUESTION_END, (playerId: string) => {
    console.log(RETURN_ANSWER_QUESTION_END, playerId);
    setAnsweringPlayerId(undefined);
    setPlayers(
      players.map((player) =>
        player.id === playerId
          ? { ...player, isAnswering: false, wasAlreadyAnswering: true }
          : player
      )
    );
  });

  // Socket senders

  const sendStartQuestion = () => {
    socket.emit(SEND_START_QUESTION, gameId);
  };
  const sendCrateGame = () => {
    socket.emit(SEND_CREATE_GAME);
  };
  const sendStartGame = () => {
    socket.emit(SEND_START_GAME, gameId);
  };
  const sendNewPlayerScore = (answeringPlayerId: string, newScore: number) => {
    socket.emit(SEND_NEW_PLAYER_SCORE, { answeringPlayerId, newScore });
  };
  const sendPlayerAnsweredWrongly = (playerId: string) => {
    socket.emit(SEND_PLAYER_ANSWERED_WRONGLY, { playerId, gameId });
  };
  const sendNoAnswer = () => {
    socket.emit(SEND_NO_ANSWER, gameId);
  };

  return (
    <AppContext.Provider
      value={{
        isConnected,
        gameId,
        sendCrateGame,

        players,
        playersCountToStartTheGame,
        sendStartGame,
        sendStartQuestion,

        game,
        roundNumber,
        currentQuestionPoints,
        answeringPlayerName,
        startQuestion,
        handleCorrectAnswer,
        handleWrongAnswer,
        handleNoAnswer,
        setCurrentQuestionPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
