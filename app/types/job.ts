import type { JobScreeningModel } from "./screening";

export interface JobModel extends Timestamped {
    id: number;
    title: string;
    description: string;
    totalAvailable: number;
    department_id?: number;
    department?: string,
    status?: boolean;
    imagePath?: string;
    JobScreening?: JobScreeningModel[];
}
