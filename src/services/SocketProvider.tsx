import { useState, ReactNode, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import {
  Game,
  IGameSetup,
  Player,
  FinalQuestionInfo,
  FinalQuestionPhase,
  HostState,
} from "./geopardyTypes";
import { firstGameSetup, tournamentSetup } from "./gameSetup";
import { getUseSocket } from "./useSocket";
import { useImagePreload } from "./useImagePreload";
import { playSound } from "./sound";

import "./connection.css";

const isDev = process.env.NODE_ENV === "development";
const serverAddress =
  process.env.REACT_APP_SERVER_URL ||
  (isDev ? "http://localhost:3123" : "https://geopargygame.herokuapp.com/");
const socket = io(serverAddress, {
  // come back quickly after a short network hiccup
  reconnectionDelay: 500,
  reconnectionDelayMax: 3000,
});

const useSocket = getUseSocket(socket);

// The id of the tournament is kept in localStorage – after a reload (or
// closing the tab by accident) the host comes back to the same tournament.
const HOST_SESSION_KEY = "geopardy.host.session";
const loadHostTournamentId = (): string | null => {
  try {
    return (
      JSON.parse(localStorage.getItem(HOST_SESSION_KEY) || "null")
        ?.tournamentId ?? null
    );
  } catch {
    return null;
  }
};
const saveHostTournamentId = (tournamentId: string | null) => {
  try {
    if (tournamentId) {
      localStorage.setItem(HOST_SESSION_KEY, JSON.stringify({ tournamentId }));
    } else {
      localStorage.removeItem(HOST_SESSION_KEY);
    }
  } catch {}
};

const CONNECT = "connect";
const DISCONNECT = "disconnect";

//tournament
const SEND_CREATE_TOURNAMENT = "sendCreateTournament";
const RECONNECT_HOST = "reconnectHost";
const RETURN_HOST_STATE = "returnHostState";
const RETURN_NEW_TOURNAMENT = "returnNewTournament";
const RETURN_NEW_PLAYERS = "returnNewPlayers";
const RETURN_CONNECTED_PLAYERS = "returnConnectedPlayers";
const SEND_START_TOURNAMENT = "sendStartTournament";
const SEND_REMOVE_PLAYER = "sendRemovePlayer";
const SEND_RESET_TOURNAMENT = "sendResetTournament";
const SEND_SET_GAME_SIZES = "sendSetGameSizes";
const RETURN_GAME_SIZES = "returnGameSizes";
const RETURN_START_TOURNAMENT = "returnStartTournament";

//games
const RETURN_NEW_GAMES = "returnNewGames";
const RETURN_CURRENT_GAME_ID = "returnCurrentGameId";
const SEND_START_GAME = "sendStartGame";
const SEND_PROCEED_TO_THE_NEXT_GAME = "sendProceedToTheNextGame";
const RETURN_START_GAME = "returnStartGame";

//finalGame
const RETURN_UPDATED_FINAL_GAME = "returnUpdatedFinalGame";
const RETURN_NEXT_GAME_IS_FINAL = "returnNextGameIsFinal";

//questions
const SEND_OPEN_QUESTION = "sendOpenQuestion";
const SEND_START_QUESTION = "sendStartQuestion";
const SEND_ANSWER_JUDGED = "sendAnswerJudged";
const SEND_NO_ANSWER = "sendNoAnswer";
const SEND_CANCEL_QUESTION = "sendCancelQuestion";
const RETURN_ANSWER_QUESTION = "returnAnswerQuestion";
const RETURN_SCORES = "returnScores";

//finalQuestion
const SEND_START_FINAL_QUESTION = "sendStartFinalQuestion";
const RETURN_BETS_STATUS = "returnBetsStatus";
const SEND_SHOW_FINAL_QUESTION = "sendShowFinalQuestion";
const SEND_FINAL_QUESTION_TIME_OUT = "sendFinalQuestionTimeOut";
const RETURN_FINAL_QUESTION_ANSWERS = "returnFinalQuestionAnswers";
const SEND_CORRECT_FINAL_ANSWER = "sendCorrectFinalAnswer";
const SEND_INCORRECT_FINAL_ANSWER = "sendIncorrectFinalAnswer";

const EMPTY_FINAL_GAME: Game = {
  gameId: "finalGame",
  players: [],
  isStarted: false,
  finalQuestionInfos: {},
};

type QuestionsGroups = IGameSetup["firstQuestionsGroup"];
const areAllQuestionsAnswered = (groups: QuestionsGroups) =>
  groups
    .flatMap((questionsGroup) => questionsGroup.questions)
    .every((question) => question.isAnswered);

// Ids of questions can repeat between rounds, so the server gets "round-id"
const toServerQuestionId = (roundNumber: 1 | 2, questionId: string) =>
  `${roundNumber}-${questionId}`;
const fromServerQuestionId = (serverQuestionId: string) => {
  const separatorIndex = serverQuestionId.indexOf("-");
  return {
    roundNumber: (serverQuestionId.slice(0, separatorIndex) === "2" ? 2 : 1) as
      | 1
      | 2,
    id: serverQuestionId.slice(separatorIndex + 1),
  };
};

// Board of a game with questions already played marked as answered
const getBoard = (setup: IGameSetup, answeredQuestionIds: string[]) => {
  const board: IGameSetup = JSON.parse(JSON.stringify(setup));
  const markAnswered = (groups: QuestionsGroups, roundNumber: 1 | 2) =>
    groups.forEach((questionsGroup) =>
      questionsGroup.questions.forEach((question) => {
        question.isAnswered = answeredQuestionIds.includes(
          toServerQuestionId(roundNumber, question.id)
        );
      })
    );
  markAnswered(board.firstQuestionsGroup, 1);
  markAnswered(board.secondQuestionsGroup, 2);
  return board;
};

interface ISocketProviderProps {
  children: ReactNode;
}

interface AppData {
  isConnected: boolean;

  tournamentId?: string;
  // tournament that is still running on the server (can be resumed)
  activeTournamentId: string | null;
  resumeTournament: () => void;
  // wipes everything on the server – clean start for host and players
  resetTournament: () => void;
  playersCountToStartTheTournament?: number;
  // number of players in each qualifying game, e.g. [5, 5, 6]
  gameSizes: number[];
  setGameSizes: (gameSizes: number[]) => void;
  players: Player[];
  connectedPlayerIds: string[];
  games: Record<string, Game>;
  sendCreateTournament: (isLite?: boolean) => void;
  // lite version – the second round is skipped
  isLite: boolean;
  sendStartTournament: () => void;
  removePlayer: (playerId: string) => void;

  sendStartGame: () => void;
  sendProceedToTheNextGame: ({ winnerId }: { winnerId?: string }) => void;

  sendStartQuestion: () => void;

  game: IGameSetup;
  currentGamePlayers: Player[];
  gameId?: string;
  currentGameIndex?: number;
  finishGame: () => void;

  finalGame: Game;
  isFinal: boolean;

  sendShowFinalQuestion: () => void;
  sendFinalQuestionTimeOut: () => void;
  sendCorrectFinalAnswer: (playerId: string) => void;
  sendIncorrectFinalAnswer: (playerId: string) => void;
  changePlayersScore: (playerId: string, difference: number) => void;
  finalQuestionPhase: FinalQuestionPhase | null;
  finalQuestionElapsedMs: number | null;
  finalQuestionInfos: Record<string, FinalQuestionInfo>;
  betsCount: number;

  roundNumber: 1 | 2;
  currentQuestionPoints: number;
  activeQuestion: { id: string; isStarted: boolean } | null;
  answeringPlayerId?: string;
  answeringPlayerName?: string;
  allBetsSent: boolean;
  setQuestionStarted: (questionId: string) => void;
  handleQuestionFinished: () => void;
  handleCorrectAnswer: () => void;
  handleWrongAnswer: () => void;
  handleNoAnswer: () => void;
  handleQuestionCancelled: (questionId?: string) => void;
  setCurrentQuestionPoints: (points: number) => void;
}

export const AppContext = createContext<AppData>({
  isConnected: false,

  activeTournamentId: null,
  resumeTournament: () => {},
  resetTournament: () => {},
  sendCreateTournament: () => {},
  isLite: false,
  sendStartTournament: () => {},
  removePlayer: () => {},
  gameSizes: [],
  setGameSizes: () => {},

  players: [],
  connectedPlayerIds: [],
  games: {},

  sendStartGame: () => {},
  sendProceedToTheNextGame: () => {},
  finishGame: () => {},

  sendStartQuestion: () => {},

  game: firstGameSetup,
  currentGamePlayers: [],
  roundNumber: 1,
  currentQuestionPoints: 0,
  activeQuestion: null,

  finalGame: EMPTY_FINAL_GAME,
  isFinal: false,

  sendShowFinalQuestion: () => {},
  sendFinalQuestionTimeOut: () => {},
  sendCorrectFinalAnswer: () => {},
  sendIncorrectFinalAnswer: () => {},
  changePlayersScore: () => {},
  finalQuestionPhase: null,
  finalQuestionElapsedMs: null,
  finalQuestionInfos: {},
  betsCount: 0,

  allBetsSent: false,
  setQuestionStarted: () => {},
  handleQuestionFinished: () => {},
  handleCorrectAnswer: () => {},
  handleWrongAnswer: () => {},
  handleNoAnswer: () => {},
  handleQuestionCancelled: () => {},
  setCurrentQuestionPoints: () => {},
});

export const SocketProvider = ({ children }: ISocketProviderProps) => {
  const navigate = useNavigate();

  const [isConnected, setIsConnected] = useState(socket.connected);
  // With a saved tournament we wait for the server before showing anything
  const [isRestoring, setIsRestoring] = useState(!!loadHostTournamentId());
  const [activeTournamentId, setActiveTournamentId] = useState<string | null>(
    null
  );
  const [
    playersCountToStartTheTournament,
    setPlayersCountToStartTheTournament,
  ] = useState<number | undefined>();
  const [gameSizes, setGameSizesState] = useState<number[]>([]);
  const [gameId, setGameId] = useState<string | undefined>();
  const [currentGameIndex, setCurrentGameIndex] =
    useState<number | undefined>();

  const [tournamentId, setTournamentId] = useState<string | undefined>();

  const [game, setGame] = useState<IGameSetup>(firstGameSetup);
  const [isLite, setIsLite] = useState(false);
  const [roundNumber, setRoundNumber] = useState<1 | 2>(1);
  const [currentQuestionPoints, setCurrentQuestionPoints] = useState<number>(0);
  const [activeQuestion, setActiveQuestion] = useState<{
    id: string;
    isStarted: boolean;
  } | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [connectedPlayerIds, setConnectedPlayerIds] = useState<string[]>([]);
  const [currentGamePlayers, setCurrentGamePlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Record<string, Game>>({});
  const [finalGame, setFinalGame] = useState<Game>(EMPTY_FINAL_GAME);
  const [isFinal, setIsFinal] = useState(false);
  const [allBetsSent, setAllBetsSent] = useState(false);
  const [betsCount, setBetsCount] = useState(0);
  const [finalQuestionPhase, setFinalQuestionPhase] =
    useState<FinalQuestionPhase | null>(null);
  const [finalQuestionElapsedMs, setFinalQuestionElapsedMs] = useState<
    number | null
  >(null);
  const [finalQuestionInfos, setFinalQuestionInfos] = useState<
    Record<string, FinalQuestionInfo>
  >({});

  const [answeringPlayerId, setAnsweringPlayerId] =
    useState<string | undefined>();
  const [answeringPlayerName, setAnsweringPlayerName] =
    useState<string | undefined>();

  // Effects
  // Obrazki pytań ładujemy w tle od razu, żeby wejście w pytanie było płynne.
  useImagePreload(game);

  useEffect(() => {
    const newName = answeringPlayerId
      ? currentGamePlayers.find((player) => player.id === answeringPlayerId)
          ?.name
      : undefined;
    setAnsweringPlayerName(newName);
  }, [answeringPlayerId, currentGamePlayers]);

  // The socket may already be connected before the handlers are registered
  useEffect(() => {
    if (socket.connected) {
      socket.emit(RECONNECT_HOST, { tournamentId: loadHostTournamentId() });
    }
  }, []);

  // State handlers

  const resetGameState = () => {
    setRoundNumber(1);
    setActiveQuestion(null);
    setAnsweringPlayerId(undefined);
    setAllBetsSent(false);
    setBetsCount(0);
    setFinalQuestionPhase(null);
    setFinalQuestionElapsedMs(null);
    setFinalQuestionInfos({});
  };

  const resetTournamentState = () => {
    resetGameState();
    setTournamentId(undefined);
    setPlayers([]);
    setGames({});
    setFinalGame(EMPTY_FINAL_GAME);
    setIsFinal(false);
    setGameId(undefined);
    setCurrentGameIndex(undefined);
    setCurrentGamePlayers([]);
    setGame(firstGameSetup);
  };

  // Rebuilds the whole host screen from the server snapshot
  const applyHostState = (state: HostState) => {
    saveHostTournamentId(state.tournamentId);
    setActiveTournamentId(state.tournamentId);
    setTournamentId(state.tournamentId);
    setPlayersCountToStartTheTournament(state.playersCount);
    setGameSizesState(state.gameSizes ?? []);
    const isLiteTournament = !!state.isLite;
    setIsLite(isLiteTournament);
    setPlayers(state.players);
    setConnectedPlayerIds(state.connectedPlayerIds);
    setGames(state.games);
    setFinalGame(state.finalGame);
    setIsFinal(state.isFinal);
    setCurrentGameIndex(state.currentGameIndex ?? undefined);

    const activeGame = state.isFinal
      ? state.finalGame
      : state.currentGameId
      ? state.games[state.currentGameId]
      : undefined;
    setGameId(activeGame?.gameId);

    let targetPath = state.isStarted ? "/tournament" : "/lobby";

    if (state.isStarted && activeGame) {
      const setup = state.isFinal
        ? tournamentSetup.finalGameSetup
        : tournamentSetup.gamesSetups[state.currentGameIndex ?? 0];
      const board = getBoard(setup, activeGame.answeredQuestionIds ?? []);
      const serverQuestion = activeGame.question?.id
        ? activeGame.question
        : null;
      const question = serverQuestion?.id
        ? { ...serverQuestion, ...fromServerQuestionId(serverQuestion.id) }
        : null;
      const phase = activeGame.finalQuestionPhase ?? null;
      const infos = activeGame.finalQuestionInfos ?? {};
      setGame(board);
      setRoundNumber(
        question
          ? question.roundNumber
          : !isLiteTournament &&
            areAllQuestionsAnswered(board.firstQuestionsGroup)
          ? 2
          : 1
      );
      setCurrentGamePlayers(activeGame.players);
      setAnsweringPlayerId(question?.answeringPlayerId ?? undefined);
      setActiveQuestion(
        question ? { id: question.id, isStarted: question.isStarted } : null
      );
      setFinalQuestionPhase(phase);
      setFinalQuestionElapsedMs(state.finalQuestionElapsedMs);
      setFinalQuestionInfos(infos);
      setBetsCount(state.betsCount);
      setAllBetsSent(state.betsCount >= activeGame.players.length);

      const allFinalAnswersJudged =
        phase === "timeUp" &&
        activeGame.players.every(
          (player) => infos[player.id]?.isCorrect !== undefined
        );

      if (!activeGame.isStarted) {
        targetPath = "/tournament";
      } else if (allFinalAnswersJudged) {
        targetPath = "/winner";
      } else if (phase) {
        targetPath = "/finalQuestion";
      } else if (question) {
        targetPath = `/question/${question.id}`;
      } else if (
        areAllQuestionsAnswered(
          isLiteTournament
            ? board.firstQuestionsGroup
            : board.secondQuestionsGroup
        )
      ) {
        socket.emit(SEND_START_FINAL_QUESTION, {
          tournamentId: state.tournamentId,
        });
        setFinalQuestionPhase("betting");
        targetPath = "/finalQuestion";
      } else {
        targetPath = "/game";
      }
    }

    if (window.location.pathname !== targetPath) {
      navigate(targetPath, { replace: true });
    }
  };

  const handleQuestionFinished = () => {
    setActiveQuestion(null);
    setAnsweringPlayerId(undefined);

    // In the lite version the first round is the last one
    if (roundNumber === 1 && !isLite) {
      if (areAllQuestionsAnswered(game.firstQuestionsGroup)) {
        setRoundNumber(2);
      }
      navigate("/game");
      return;
    }

    if (
      areAllQuestionsAnswered(
        roundNumber === 1 ? game.firstQuestionsGroup : game.secondQuestionsGroup
      )
    ) {
      sendStartFinalQuestion();
      navigate("/finalQuestion");
      return;
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
    setActiveQuestion({ id: questionId, isStarted: false });
    setAnsweringPlayerId(undefined);
    playSound("select");
    socket.emit(SEND_OPEN_QUESTION, {
      tournamentId,
      gameId,
      questionId: toServerQuestionId(roundNumber, questionId),
    });
    return newGame;
  };
  const changePlayersScore = (playerId: string, difference: number) => {
    setCurrentGamePlayers((players) =>
      players.map((player) =>
        player.id === playerId
          ? { ...player, score: player.score + (difference || 0) }
          : player
      )
    );
  };
  // The server keeps the real score – it accepts a judgement only for the
  // player that is answering, so a double click can't count points twice.
  const judgeAnswer = (isCorrect: boolean) => {
    if (!answeringPlayerId) return;
    playSound(isCorrect ? "correct" : "wrong");
    changePlayersScore(
      answeringPlayerId,
      isCorrect ? currentQuestionPoints : -currentQuestionPoints
    );
    socket.emit(SEND_ANSWER_JUDGED, {
      tournamentId,
      gameId,
      playerId: answeringPlayerId,
      isCorrect,
      points: currentQuestionPoints,
    });
    setAnsweringPlayerId(undefined);
  };
  const handleCorrectAnswer = () => judgeAnswer(true);
  const handleWrongAnswer = () => judgeAnswer(false);
  const handleNoAnswer = () => {
    playSound("noAnswer");
    sendNoAnswer();
  };
  // Back to the board without closing the question (e.g. after a misclick) –
  // it can be opened again.
  const handleQuestionCancelled = (questionId?: string) => {
    const newGame: IGameSetup = JSON.parse(JSON.stringify(game));
    const groups =
      roundNumber === 1
        ? newGame.firstQuestionsGroup
        : newGame.secondQuestionsGroup;
    const cancelledQuestion = groups
      .flatMap((questionsGroup) => questionsGroup.questions)
      .find((question) => question.id === questionId);
    if (cancelledQuestion) {
      cancelledQuestion.isAnswered = false;
      setGame(newGame);
    }
    socket.emit(SEND_CANCEL_QUESTION, { gameId, tournamentId });
    setActiveQuestion(null);
    setAnsweringPlayerId(undefined);
    navigate("/game");
  };
  const finishGame = () => navigate("/winner");

  // Utils Setup
  useSocket(CONNECT, () => {
    setIsConnected(true);
    // Join the tournament again – the server answers with the full state
    socket.emit(RECONNECT_HOST, { tournamentId: loadHostTournamentId() });
  });
  useSocket(DISCONNECT, () => {
    setIsConnected(false);
  });
  useSocket(
    RETURN_HOST_STATE,
    ({
      state,
      activeTournamentId,
    }: {
      state: HostState | null;
      activeTournamentId: string | null;
    }) => {
      setIsRestoring(false);
      setActiveTournamentId(activeTournamentId);
      if (state) {
        applyHostState(state);
        return;
      }
      // The tournament does not exist anymore (finished / server restarted)
      saveHostTournamentId(null);
      resetTournamentState();
      if (window.location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    }
  );
  useSocket(RETURN_CONNECTED_PLAYERS, (playerIds: string[]) => {
    setConnectedPlayerIds(playerIds);
  });

  // Socket senders

  // Tournament
  const sendCreateTournament = (isLite = false) => {
    if (
      activeTournamentId &&
      !window.confirm(
        "Trwa już turniej. Utworzenie nowego zakończy go dla wszystkich graczy. Kontynuować?"
      )
    ) {
      return;
    }
    socket.emit(SEND_CREATE_TOURNAMENT, { isLite });
  };
  const resumeTournament = () => {
    if (!activeTournamentId) return;
    socket.emit(RECONNECT_HOST, { tournamentId: activeTournamentId });
  };
  const resetTournament = () => {
    if (
      !window.confirm(
        "Zresetować cały turniej do zera? Wszyscy gracze, gry i wyniki zostaną usunięte. Tej operacji nie da się cofnąć."
      )
    ) {
      return;
    }
    socket.emit(SEND_RESET_TOURNAMENT);
  };
  // RETURN_NEW_TOURNAMENT
  useSocket(
    RETURN_NEW_TOURNAMENT,
    ({
      tournamentId,
      playersCount,
      gameSizes,
      isLite,
    }: {
      tournamentId: string;
      playersCount: number;
      gameSizes?: number[];
      isLite?: boolean;
    }) => {
      resetTournamentState();
      saveHostTournamentId(tournamentId);
      setActiveTournamentId(tournamentId);
      setTournamentId(tournamentId);
      setPlayersCountToStartTheTournament(playersCount);
      setGameSizesState(gameSizes ?? []);
      setIsLite(!!isLite);
      navigate("/lobby");
    }
  );
  // The server validates the sizes and answers with what it accepted
  const setGameSizes = (newGameSizes: number[]) => {
    // shown right away, so that quick clicks add up
    setGameSizesState(newGameSizes);
    setPlayersCountToStartTheTournament(
      newGameSizes.reduce((total, gameSize) => total + gameSize, 0)
    );
    socket.emit(SEND_SET_GAME_SIZES, { tournamentId, gameSizes: newGameSizes });
  };
  useSocket(
    RETURN_GAME_SIZES,
    ({
      playersCount,
      gameSizes,
    }: {
      playersCount: number;
      gameSizes: number[];
    }) => {
      setPlayersCountToStartTheTournament(playersCount);
      setGameSizesState(gameSizes);
    }
  );
  const sendStartTournament = () => {
    socket.emit(SEND_START_TOURNAMENT, { tournamentId });
  };
  const removePlayer = (playerId: string) => {
    socket.emit(SEND_REMOVE_PLAYER, { tournamentId, playerId });
  };
  // RETURN_NEW_PLAYERS
  useSocket(RETURN_NEW_PLAYERS, (newPlayers: Player[]) => {
    setPlayers(newPlayers);
  });
  // RETURN_START_TOURNAMENT
  useSocket(RETURN_START_TOURNAMENT, () => {
    playSound("start");
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
      players,
    }: {
      currentGameId: string;
      currentGameIndex: number;
      players?: Player[];
    }) => {
      setGameId(currentGameId);
      setCurrentGameIndex(currentGameIndex);
      setGame(tournamentSetup.gamesSetups[currentGameIndex] ?? firstGameSetup);
      if (players) {
        setCurrentGamePlayers(players);
      }
      resetGameState();
    }
  );
  // RETURN_START_GAME
  useSocket(RETURN_START_GAME, () => {
    playSound("start");
    navigate("/game");
  });
  const sendStartGame = () => {
    socket.emit(SEND_START_GAME, { tournamentId, gameId });
  };
  const sendProceedToTheNextGame = ({ winnerId }: { winnerId?: string }) => {
    socket.emit(SEND_PROCEED_TO_THE_NEXT_GAME, {
      tournamentId,
      gameId,
      winnerId,
    });
    if (isFinal) {
      // The tournament is over – nothing to come back to
      saveHostTournamentId(null);
      setActiveTournamentId(null);
    }
  };

  // Question
  // RETURN_ANSWER_QUESTION
  useSocket(RETURN_ANSWER_QUESTION, ({ playerId }: { playerId: string }) => {
    playSound("buzz");
    setAnsweringPlayerId(playerId);
    setCurrentGamePlayers((players) =>
      players.map((player) => ({
        ...player,
        isAnswering: player.id === playerId,
      }))
    );
  });
  // RETURN_SCORES – scores kept by the server
  useSocket(
    RETURN_SCORES,
    ({
      gameId: scoresGameId,
      scores,
    }: {
      gameId: string;
      scores: Record<string, number>;
    }) => {
      if (gameId && scoresGameId !== gameId) {
        return;
      }
      setCurrentGamePlayers((players) =>
        players.map((player) =>
          scores[player.id] !== undefined
            ? { ...player, score: scores[player.id] }
            : player
        )
      );
    }
  );
  const sendStartQuestion = () => {
    socket.emit(SEND_START_QUESTION, { gameId, tournamentId });
    playSound("open");
    setActiveQuestion((question) =>
      question ? { ...question, isStarted: true } : question
    );
  };
  const sendNoAnswer = () => {
    socket.emit(SEND_NO_ANSWER, { gameId, tournamentId });
  };

  // Final Question
  const sendStartFinalQuestion = () => {
    socket.emit(SEND_START_FINAL_QUESTION, { gameId, tournamentId });
    setFinalQuestionPhase("betting");
    setFinalQuestionInfos({});
    setBetsCount(0);
    setAllBetsSent(false);
  };
  useSocket(
    RETURN_BETS_STATUS,
    ({
      betsCount,
      allBetsSent,
    }: {
      betsCount: number;
      allBetsSent: boolean;
    }) => {
      setBetsCount(betsCount);
      setAllBetsSent(allBetsSent);
    }
  );
  const sendShowFinalQuestion = () => {
    socket.emit(SEND_SHOW_FINAL_QUESTION, { gameId, tournamentId });
    setFinalQuestionPhase("answering");
    setFinalQuestionElapsedMs(0);
  };
  const sendFinalQuestionTimeOut = () => {
    socket.emit(SEND_FINAL_QUESTION_TIME_OUT, { gameId, tournamentId });
    setFinalQuestionPhase("timeUp");
  };
  useSocket(
    RETURN_FINAL_QUESTION_ANSWERS,
    ({
      finalQuestionInfos,
    }: {
      finalQuestionInfos: Record<string, FinalQuestionInfo>;
    }) => {
      setFinalQuestionInfos(finalQuestionInfos);
    }
  );
  const sendCorrectFinalAnswer = (playerId: string) => {
    socket.emit(SEND_CORRECT_FINAL_ANSWER, { gameId, tournamentId, playerId });
  };
  const sendIncorrectFinalAnswer = (playerId: string) => {
    socket.emit(SEND_INCORRECT_FINAL_ANSWER, {
      gameId,
      tournamentId,
      playerId,
    });
  };

  // Final Game
  useSocket(RETURN_UPDATED_FINAL_GAME, ({ finalGame }: { finalGame: Game }) => {
    setFinalGame(finalGame);
  });
  useSocket(RETURN_NEXT_GAME_IS_FINAL, ({ finalGame }: { finalGame: Game }) => {
    setFinalGame(finalGame);
    setGame(tournamentSetup.finalGameSetup);
    setIsFinal(true);
    setGameId(finalGame.gameId);
    resetGameState();
    setCurrentGamePlayers(finalGame.players);
  });

  return (
    <AppContext.Provider
      value={{
        isConnected,

        sendCreateTournament,
        isLite,
        sendStartTournament,
        activeTournamentId,
        resumeTournament,
        resetTournament,
        removePlayer,
        tournamentId,
        players,
        connectedPlayerIds,
        games,
        playersCountToStartTheTournament,
        gameSizes,
        setGameSizes,

        sendStartGame,
        sendProceedToTheNextGame,
        game,
        currentGamePlayers,
        gameId,
        currentGameIndex,
        finishGame,

        sendShowFinalQuestion,
        sendFinalQuestionTimeOut,
        sendCorrectFinalAnswer,
        sendIncorrectFinalAnswer,
        changePlayersScore,
        finalQuestionPhase,
        finalQuestionElapsedMs,
        finalQuestionInfos,
        betsCount,

        finalGame,
        isFinal,
        allBetsSent,

        roundNumber,
        sendStartQuestion,
        currentQuestionPoints,
        activeQuestion,
        answeringPlayerId,
        answeringPlayerName,
        setQuestionStarted,
        handleQuestionFinished,
        handleCorrectAnswer,
        handleWrongAnswer,
        handleNoAnswer,
        handleQuestionCancelled,
        setCurrentQuestionPoints,
      }}
    >
      {isRestoring ? (
        <div className="connectionRestoring">
          <span className="loader" />
          <span>Wznawianie turnieju…</span>
        </div>
      ) : (
        children
      )}
      {!isConnected && !isRestoring && (
        <div className="connectionBanner">
          Brak połączenia z serwerem – łączę ponownie…
        </div>
      )}
    </AppContext.Provider>
  );
};

// LESSONS LEARNED
// 1. Pracuj na bieąco nad architekturą
// 2. Nie nazywaj tego samego na kilka sposobów - isGameActive, isGameStarted, isGameOpen
// 3. Nie nazywaj rónych rzeczy tym samym - game jako pełen opis gry i game jako gra z userami
// 4. SINGLE SOURCE OF TRUTH
// 5. Podział logiki FE/BE bez dublowania
// 6. To mutate or not to mutate
