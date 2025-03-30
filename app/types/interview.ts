export interface InterviewDate {
    date: string,
    screening: string;
    id: number
}

export interface InterviewStatus {
    status: ApplicationStatus,
    jobId?: number;

    id: number
}