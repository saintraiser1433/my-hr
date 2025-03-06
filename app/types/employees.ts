import type { Timestamped } from ".";

export interface EmployeeModel extends Timestamped {
    id: number;
    status?: "ACTIVE" | "INACTIVE";
    jobId: number;
    job?: JobModel;
    information?: ApplicantInformationModel;
    department?: DepartmentModel
    departmentId: number;
    informationId: number;
    username: string;
    password: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    role: "ADMIN" | "EMPLOYEE" | "TEAMLEAD";
    employeeName?: string;
}