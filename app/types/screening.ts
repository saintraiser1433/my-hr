import type { JobModel } from "./job";

export interface ScreeningModel {
    id: number;
    title: string;
    description: string;
    status?: boolean;
    JobScreening?: JobScreeningModel[];
}


export interface JobScreeningModel extends Timestamped {
    job_id: number;
    screening_id: number;
    jobList?: JobModel;
    screeningList?: ScreeningModel;
}


