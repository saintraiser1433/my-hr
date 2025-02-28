import type { EvaluationModel } from "./evaluation";

export interface QuestionModel {
    id?: number;
    question?: string;
    evaluationId?: number;
    Evaluation?: EvaluationModel;
}


export interface CommentsModel {
    id: number;
    description: string;
}