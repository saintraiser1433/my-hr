

export interface EvaluationModel extends Timestamped {
    id?: number;
    school_year?: string;
    semester?: number;
    status?: statusesEvaluation;
    peer?: PeerModel[];
    action?: string;
}
export interface CombinedPeerQuestionWithLegend {
    questions: QuestionModel[],
    legends: TemplateDetail[]
}

export interface QuestionModel {
    id?: number;
    question?: string;
    peerId?: number;
    peer?: PeerModel;
    teamLeadCriteriaId?: number;
    criteria?: TeamLeadCriteria;
}


export interface CommentsModel {
    id: number;
    description: string;
}

export interface PeerModel {
    id?: number;
    name?: string;
    evaluationId?: number;
    template?: string;
    templateHeaderId?: number;
    question?: QuestionModel[],
    percentage?: number;

}

export interface TeamLeadModel extends PeerModel {
    forTeamLead?: boolean;
}

export interface TeamLeadCriteria {
    id?: number;
    name: string;
    teamLeadEvaluationId?: number;
    question?: QuestionModel[]
}

export interface CriteriaColleague extends TeamLeadCriteria {
    employeesId?: number
}


export interface SubmitTeamLeadResult {
    evaluationId: number;
    categoryId: number;
    questionId: number;
    employeesId: number;
    templateDetailId: number;
}




export type statusesEvaluation = "NOT SET" | "ONGOING" | "FINISHED";