import type { TemplateHead } from "typescript";


export interface EvaluationModel extends Timestamped {
    id?: number;
    school_year?: string;
    semester?: number;
    status?: statusesEvaluation;
    peer?: PeerModel[];
    action?: string;
}
export interface CombinedPeerQuestionWithLegend {
    questions: PeerQuestionModel[],
    legends: TemplateDetail[]
}

export interface PeerQuestionModel {
    id?: number;
    question?: string;
    peerId?: number;
    peer?: PeerModel;
}


export interface CommentsModel {
    id: number;
    description: string;
}

export interface PeerModel {
    id?: number;
    title?: string;
    evaluationId?: number;
    template?: string;
    templateHeaderId?: number;
    question?: PeerQuestionModel[],

}
export type statusesEvaluation = "NOT SET" | "ONGOING" | "FINISHED";