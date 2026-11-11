import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type IQuestionBase = {
  id: string;
  text: string;
  isAnswered?: boolean;
  points?: number;
};

type IExtraQuestionFields = {
  imageUrl?: string;
  soundUrl?: string;
  // Correct answer, shown only to the host on demand. "(?)" marks an unverified guess.
  answer?: string;
};

type IQuestion = IQuestionBase & IExtraQuestionFields;
type FullQuestion = Required<IQuestionBase> & IExtraQuestionFields;

export type IQuestionsList<Q = FullQuestion> = Q[];

export interface IQuestionsGroup<Q> {
  groupName: string;
  icon?: IconDefinition;
  questionsGroupType: IQuestionType;
  questions: IQuestionsList<Q>;
}

type IQuestionType = "text" | "sound" | "picture";

export type IGameRound<Q> = IQuestionsGroup<Q>[];

interface IGameSetupAbstract<Q> {
  firstQuestionsGroup: IGameRound<Q>;
  secondQuestionsGroup: IGameRound<Q>;
  finalQuestionText: string;
  finalQuestionCategory: string;
  finalQuestionAnswer?: string;
}

export type IGameSetupBase = IGameSetupAbstract<IQuestion>;
export type IGameSetup = IGameSetupAbstract<FullQuestion>;
export type ITournamentSetup = {
  gamesSetups: IGameSetup[];
  finalGameSetup: IGameSetup;
};

export type Player = {
  id: string;
  name: string;
  score: number;
  isAnswering: boolean;
  wasAlreadyAnswering?: boolean;
  base64Photo?: string;
};

export type FinalQuestionInfo = {
  answer: string;
  betAmount: number;
  playerId: string;
  hasAnswered?: boolean;
  // undefined = not judged yet
  isCorrect?: boolean;
};

export type FinalQuestionPhase = "betting" | "answering" | "timeUp";

// Question currently displayed by the host – kept on the server so that the
// host can come back to it after a reload
export type ServerQuestionState = {
  id: string | null;
  isStarted: boolean;
  isOpen: boolean;
  answeringPlayerId: string | null;
  triedPlayerIds: string[];
};

export type Game = {
  gameId: string;
  isStarted: boolean;
  players: Player[];
  finalQuestionInfos: Record<string, FinalQuestionInfo>;
  isFinalQuestionStarted?: boolean;
  // fields below are filled by the server
  isFinished?: boolean;
  winnerId?: string;
  answeredQuestionIds?: string[];
  question?: ServerQuestionState | null;
  finalQuestionPhase?: FinalQuestionPhase | null;
};

// Snapshot sent by the server when the host (re)connects
export type HostState = {
  tournamentId: string;
  playersCount: number;
  players: Player[];
  games: Record<string, Game>;
  finalGame: Game;
  isStarted: boolean;
  isFinal: boolean;
  currentGameId: string | null;
  currentGameIndex: number | null;
  finalQuestionElapsedMs: number | null;
  betsCount: number;
  connectedPlayerIds: string[];
};
