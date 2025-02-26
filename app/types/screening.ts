import type { JobModel } from "./job";

export interface ScreeningModel {
    id?: number;
    title?: string;
    description?: string;
    status?: boolean;
    JobScreening?: JobScreeningModel[];
    screening_title?:string;
}


export interface JobScreeningModel extends Timestamped {
    job_id: number;
    screening_id: number;
    jobList?: JobModel;
    screeningList?: ScreeningModel;
}

export interface JobScreenDataModel {
    job_id?:number;
    job_title?:string;
    screening_id?:number;
    screening_title?:number;
    sequence_number?:number;
    action?:string;
}





