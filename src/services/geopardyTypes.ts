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
  finalQuestion: string;
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
};

export type Game = {
  gameId: string;
  isStarted: boolean;
  players: Player[];
};
