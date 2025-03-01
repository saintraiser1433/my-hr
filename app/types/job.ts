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
    requirements?: ForRequirementsId[],
    JobScreening?: JobScreeningModel[];
}


export interface ForRequirementsId {
    id: number;
    label: string
}

