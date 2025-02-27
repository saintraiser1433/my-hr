import type { QuestionModel } from "./question";

export interface EvaluationModel extends Timestamped {
    id?: number;
    school_year?: string;
    semester?: number;
    status?: statusesEvaluation;
    questionList?: QuestionModel[];
    action?: string;
}

export type statusesEvaluation = "NOT SET" | "ONGOING" | "FINISHED";