export interface RequirementModel {
    id?: number;
    title?: string;
    description?: string;
    action?: string;
}


export interface CandidateExpiryData {
    id: number;
    fullname: string;
    requirements: string;
    expiryDate: string | null;
    contact_number: string;
}