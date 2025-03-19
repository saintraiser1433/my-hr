export interface Questionnaires {
    evaluation: TeamLeadEvaluation;
    template: TemplateHeader | null;
    questions: Question[];
}



interface TeamLeadEvaluation {
    id: number;
    percentage: number;
    name: string
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

export interface Question {
    criteriaId: number;
    name: string;
    id: number;
    question: string;
}