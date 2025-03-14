export interface TeamLeadQuestionnaires {

    teamLeadEvaluation: TeamLeadEvaluation;
    template: TemplateHeader | null;
    criteria: Criteria[];
}

interface TeamLeadEvaluation {
    id: number;
    percentage: number;
    name:string
}
interface TemplateHeader {
    name: string;
    details: TemplateDetail[];
}

interface TemplateDetail {
    id: number,
    title: string;
    description: string;
    score: number;
}

export interface Criteria {
    questions: Question[];
}

interface Question {
    criteriaId:number;
    name: string;
    id: number;
    question: string;
}