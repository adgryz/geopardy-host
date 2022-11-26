import { useState, ReactNode, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import { Game, IGameSetup, Player } from "./geopardyTypes";
import { firstGameSetup, tournamentSetup } from "./gameSetup";
import { getUseSocket } from "./useSocket";

// const socket = io("https://geopargygame.herokuapp.com/");
const socket = io("http://localhost:3123");
const useSocket = getUseSocket(socket);

const CONNECT = "connect";
const DISCONNECT = "disconnect";

//tournament
const SEND_CREATE_TOURNAMENT = "sendCreateTournament";
const RETURN_NEW_TOURNAMENT = "returnNewTournament";
const RETURN_NEW_PLAYERS = "returnNewPlayers";
const SEND_START_TOURNAMENT = "sendStartTournament";
const RETURN_START_TOURNAMENT = "returnStartTournament";

//games
const RETURN_NEW_GAMES = "returnNewGames";
const RETURN_CURRENT_GAME_ID = "returnCurrentGameId";
const SEND_START_GAME = "sendStartGame";
const SEND_PROCEED_TO_THE_NEXT_GAME = "sendProceedToTheNextGame";
const RETURN_START_GAME = "returnStartGame";

//questions
const SEND_START_QUESTION = "sendStartQuestion";
const SEND_NEW_PLAYER_SCORE = "sendNewPlayerScore";
const SEND_PLAYER_ANSWERED_WRONGLY = "sendPlayerAnsweredWrongly";
const SEND_NO_ANSWER = "sendNoAnswer";
const RETURN_ANSWER_QUESTION = "returnAnswerQuestion";
const RETURN_ANSWER_QUESTION_END = "returnAnswerQuestionEnd";

//final_game
const RETURN_UPDATED_FINAL_GAME = "returnUpdatedFinalGame";
const RETURN_NEXT_GAME_IS_FINAL = "returnNextGameIsFinal";

interface ISocketProviderProps {
  children: ReactNode;
}

interface AppData {
  isConnected: boolean;

  tournamentId?: string;
  playersCountToStartTheTournament?: number;
  players: Player[];
  games: Record<string, Game>;
  sendCreateTournament: () => void;
  sendStartTournament: () => void;

  sendStartGame: () => void;
  sendProceedToTheNextGame: ({ winnerId }: { winnerId: string }) => void;

  sendStartQuestion: () => void;

  game: IGameSetup;
  currentGamePlayers: Player[];
  gameId?: string;
  currentGameIndex?: number;

  finalGame: Game;
  isFinal: boolean;

  roundNumber: 1 | 2;
  currentQuestionPoints: number;
  answeringPlayerName?: string;
  setQuestionStarted: (questionId: string) => void;
  handleQuestionFinished: () => void;
  handleCorrectAnswer: () => void;
  handleWrongAnswer: () => void;
  handleNoAnswer: () => void;
  setCurrentQuestionPoints: (points: number) => void;
}

export const AppContext = createContext<AppData>({
  isConnected: false,

  sendCreateTournament: () => {},
  sendStartTournament: () => {},

  players: [],
  games: {},

  sendStartGame: () => {},
  sendProceedToTheNextGame: () => {},

  sendStartQuestion: () => {},

  game: firstGameSetup,
  currentGamePlayers: [],
  roundNumber: 1,
  currentQuestionPoints: 0,

  finalGame: { isStarted: false, players: [], gameId: "" },
  isFinal: false,

  setQuestionStarted: () => {},
  handleQuestionFinished: () => {},
  handleCorrectAnswer: () => {},
  handleWrongAnswer: () => {},
  handleNoAnswer: () => {},
  setCurrentQuestionPoints: () => {},
});

export const SocketProvider = ({ children }: ISocketProviderProps) => {
  const navigate = useNavigate();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [
    playersCountToStartTheTournament,
    setPlayersCountToStartTheTournament,
  ] = useState<number | undefined>();
  const [gameId, setGameId] = useState<string | undefined>();
  const [currentGameIndex, setCurrentGameIndex] =
    useState<number | undefined>();

  const [tournamentId, setTournamentId] = useState<string | undefined>();

  const [game, setGame] = useState<IGameSetup>(firstGameSetup);

  const [gameFinished, setGameFinished] = useState(false);
  const [roundNumber, setRoundNumber] = useState<1 | 2>(1);
  const [currentQuestionPoints, setCurrentQuestionPoints] = useState<number>(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentGamePlayers, setCurrentGamePlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Record<string, Game>>({});
  const [finalGame, setFinalGame] = useState<Game>({
    gameId: "finalGame",
    players: [],
    isStarted: false,
  });
  const [isFinal, setIsFinal] = useState(false);

  const [answeringPlayerId, setAnsweringPlayerId] =
    useState<string | undefined>();
  const [answeringPlayerName, setAnsweringPlayerName] =
    useState<string | undefined>();

  // Effects
  useEffect(() => {
    const newName = answeringPlayerId
      ? currentGamePlayers.find((player) => player.id === answeringPlayerId)
          ?.name
      : undefined;
    setAnsweringPlayerName(newName);
  }, [answeringPlayerId, currentGamePlayers]);

  useEffect(() => {
    if (isFinal) {
      return;
    }
    if (!currentGameIndex && currentGameIndex !== 0) {
      return;
    }
    setGame(tournamentSetup.gamesSetups[currentGameIndex]);
    setCurrentGamePlayers(Object.values(games)[currentGameIndex].players);
  }, [currentGameIndex, games, isFinal]);

  useEffect(() => {
    console.log("gameFinished effect", gameFinished);
    if (gameFinished) {
      navigate("/winner");
    }
  }, [gameFinished]);

  // State handlers

  const handleQuestionFinished = () => {
    if (roundNumber === 1) {
      checkIfSecondRound(game);
    }
    if (roundNumber === 2) {
      console.log("CHECK IF GAME ENDED", game);
      checkIfGameEnded(game);
    }

    navigate("/game");
  };

  const setQuestionStarted = (questionId: string) => {
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
  const checkIfSecondRound = (game: IGameSetup) => {
    const allFirstGroupQuestionsAnswered = game.firstQuestionsGroup
      .flatMap((questionsGroup) => questionsGroup.questions)
      .every((question) => question.isAnswered);
    if (allFirstGroupQuestionsAnswered) {
      setRoundNumber(2);
    }
  };

  const checkIfGameEnded = (game: IGameSetup) => {
    const allSecondGroupQuestionsAnswered = game.secondQuestionsGroup
      .flatMap((questionsGroup) => questionsGroup.questions)
      .every((question) => question.isAnswered);
    console.log(allSecondGroupQuestionsAnswered);
    console.log("all answered", allSecondGroupQuestionsAnswered);
    if (allSecondGroupQuestionsAnswered) {
      setGameFinished(true);
    }
  };

  const handleCorrectAnswer = () => {
    if (!answeringPlayerId) return;
    const answeringPlayer = currentGamePlayers.find(
      (player) => player.id === answeringPlayerId
    );
    if (!answeringPlayer) return;

    const newPlayerScore = answeringPlayer.score + currentQuestionPoints;

    setCurrentGamePlayers(
      currentGamePlayers.map((player) =>
        player.id === answeringPlayerId
          ? { ...player, score: newPlayerScore }
          : player
      )
    );

    sendNewPlayerScore({ answeringPlayerId, newScore: newPlayerScore });
    setAnsweringPlayerId(undefined);
  };

  const handleWrongAnswer = () => {
    if (!answeringPlayerId) return;
    const answeringPlayer = currentGamePlayers.find(
      (player) => player.id === answeringPlayerId
    );
    if (!answeringPlayer) return;

    const newPlayerScore = answeringPlayer.score - currentQuestionPoints;

    setCurrentGamePlayers(
      currentGamePlayers.map((player) =>
        player.id === answeringPlayerId
          ? { ...player, score: newPlayerScore }
          : player
      )
    );

    sendNewPlayerScore({ answeringPlayerId, newScore: newPlayerScore });
    sendPlayerAnsweredWrongly({ playerId: answeringPlayerId });
    setAnsweringPlayerId(undefined);
  };

  const handleNoAnswer = () => {
    sendNoAnswer();
  };

  // Utils Setup
  useSocket(CONNECT, () => {
    setIsConnected(true);
  });
  useSocket(DISCONNECT, () => {
    setIsConnected(false);
  });

  // Socket senders

  // Tournament
  const sendCreateTournament = () => {
    socket.emit(SEND_CREATE_TOURNAMENT);
  };
  // RETURN_NEW_TOURNAMENT
  useSocket(
    RETURN_NEW_TOURNAMENT,
    ({
      tournamentId,
      playersCount,
    }: {
      tournamentId: string;
      playersCount: number;
    }) => {
      setTournamentId(tournamentId);
      setPlayersCountToStartTheTournament(playersCount);
      navigate("/lobby");
    }
  );
  const sendStartTournament = () => {
    console.log("Emit ", SEND_START_TOURNAMENT, { tournamentId });
    socket.emit(SEND_START_TOURNAMENT, { tournamentId });
  };
  // RETURN_NEW_PLAYERS
  useSocket(RETURN_NEW_PLAYERS, (newPlayers: Player[]) => {
    setPlayers(newPlayers);
  });
  // RETURN_START_TOURNAMENT
  useSocket(RETURN_START_TOURNAMENT, () => {
    navigate("/tournament");
  });

  // Game
  // RETURN_NEW_GAMES
  useSocket(RETURN_NEW_GAMES, (newGames: Record<string, Game>) => {
    setGames(newGames);
  });
  // RETURN_CURRENT_GAME_ID
  useSocket(
    RETURN_CURRENT_GAME_ID,
    ({
      currentGameId,
      currentGameIndex,
    }: {
      currentGameId: string;
      currentGameIndex: number;
    }) => {
      setGameId(currentGameId);
      setCurrentGameIndex(currentGameIndex);
      setRoundNumber(1);
      setGameFinished(false);
    }
  );
  // RETURN_START_GAME
  useSocket(RETURN_START_GAME, () => navigate("/game"));

  const sendStartGame = () => {
    socket.emit(SEND_START_GAME, { tournamentId, gameId });
  };
  const sendProceedToTheNextGame = ({ winnerId }: { winnerId: string }) => {
    socket.emit(SEND_PROCEED_TO_THE_NEXT_GAME, { tournamentId, winnerId });
  };

  // Question
  // RETURN_ANSWER_QUESTION
  useSocket(RETURN_ANSWER_QUESTION, ({ playerId }: { playerId: string }) => {
    setAnsweringPlayerId(playerId);
    setCurrentGamePlayers(
      currentGamePlayers.map((player) =>
        player.id === playerId ? { ...player, isAnswering: true } : player
      )
    );
  });
  // RETURN_ANSWER_QUESTION_END
  useSocket(
    RETURN_ANSWER_QUESTION_END,
    ({ playerId }: { playerId: string }) => {
      console.log(RETURN_ANSWER_QUESTION_END, playerId);
      setAnsweringPlayerId(undefined);
      setCurrentGamePlayers(
        currentGamePlayers.map((player) =>
          player.id === playerId
            ? { ...player, isAnswering: false, wasAlreadyAnswering: true }
            : player
        )
      );
    }
  );
  const sendStartQuestion = () => {
    socket.emit(SEND_START_QUESTION, { gameId, tournamentId });
  };
  const sendNewPlayerScore = ({
    answeringPlayerId,
    newScore,
  }: {
    answeringPlayerId: string;
    newScore: number;
  }) => {
    socket.emit(SEND_NEW_PLAYER_SCORE, {
      tournamentId,
      gameId,
      answeringPlayerId,
      newScore,
    });
  };
  const sendPlayerAnsweredWrongly = ({ playerId }: { playerId: string }) => {
    socket.emit(SEND_PLAYER_ANSWERED_WRONGLY, {
      playerId,
      gameId,
      tournamentId,
    });
  };
  const sendNoAnswer = () => {
    socket.emit(SEND_NO_ANSWER, { gameId, tournamentId });
  };

  // Final Game
  useSocket(RETURN_UPDATED_FINAL_GAME, ({ finalGame }: { finalGame: Game }) => {
    setFinalGame(finalGame);
  });

  useSocket(RETURN_NEXT_GAME_IS_FINAL, () => {
    setGame(tournamentSetup.finalGameSetup);
    setIsFinal(true);
    setGameFinished(false);
    setRoundNumber(1);
    setCurrentGamePlayers(finalGame.players);
  });

  return (
    <AppContext.Provider
      value={{
        isConnected,

        sendCreateTournament,
        sendStartTournament,
        tournamentId,
        players,
        games,
        playersCountToStartTheTournament,

        sendStartGame,
        sendProceedToTheNextGame,
        game,
        currentGamePlayers,
        gameId,
        currentGameIndex,

        finalGame,
        isFinal,

        roundNumber,
        sendStartQuestion,
        currentQuestionPoints,
        answeringPlayerName,
        setQuestionStarted,
        handleQuestionFinished,
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

// BUGI
// Zły gracz w playersach
// Brak przejscia do drugiej rundki

// LESSONS LEARNED
// 1. Pracuj na bieąco nad architekturą
// 2. Nie nazywaj tego samego na kilka sposobów - isGameActive, isGameStarted, isGameOpen
// 3. Nie nazywaj rónych rzeczy tym samym - game jako pełen opis gry i game jako gra z userami
// 4. SINGLE SOURCE OF TRUTH
// 5. Podział logiki FE/BE bez dublowania
// 6. To mutate or not to mutate
