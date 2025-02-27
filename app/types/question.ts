import type { EvaluationModel } from "./evaluation";

export interface QuestionModel {
    id: number;
    description: string;
    score: number;
    evaluationId?: number;
    Evaluation?: EvaluationModel;
}


export interface CommentsModel {
    id: number;
    description: string;
}