import type { JobScreeningModel } from "./screening";

export interface JobModel extends Timestamped {
    id: number;
    title: string;
    description: string;
    totalAvailable: number;
    status?: boolean;
    imagePath?: string;
    JobScreening?: JobScreeningModel[];
}
