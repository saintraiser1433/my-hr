import type { JobScreeningModel } from "./screening";

export interface JobModel extends Timestamped {
    id?: number;
    title?: string;
    description?: string;
    totalAvailable?: number;
    departmentsId?: number;
    department?: DepartmentModel,
    status?: boolean;
    headerImage?: string;
    file?: object;
    requirements: RequirementCommandPallete[];
    JobScreening?: JobScreeningModel[];
}

interface RequirementCommandPallete {
    id: number;
    label?: string;
    title?: string;
}



