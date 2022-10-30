export type IQuestion = {
  id: string;
  text: string;
  isAnswered?: boolean;
  points?: number;
};

type FullQuestion = Required<IQuestion>;

export type IQuestionsList<Q = FullQuestion> = Q[];

export interface IQuestionsGroup<Q> {
  groupName: string;
  questions: IQuestionsList<Q>;
}

export type IGameRound<Q> = IQuestionsGroup<Q>[];

interface IGameSetupAbstract<Q> {
  firstQuestionsGroup: IGameRound<Q>;
  secondQuestionsGroup: IGameRound<Q>;
  finalQuestion: string;
}

export type IGameSetupBase = IGameSetupAbstract<IQuestion>;
export type IGameSetup = IGameSetupAbstract<Required<IQuestion>>;

export type Player = {
  id: string;
  name: string;
  score: number;
  isAnswering: boolean;
  wasAlreadyAnswering?: boolean;
};
