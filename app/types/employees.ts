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

export interface EmployeeWithRequirementModel {
    employeeRequirements: EmployeeRequirements[];
    unchosenRequirements: UnchosenRequirements[]
}

export interface UnchosenRequirements {
    id: number,
    title: string
}

export interface EmployeeRequirements {
    requirements?: string;
    id?: number;
    status: EmployeeRequirementStatus;
    employeeId: number;
    requirementsId: number;
    submittedAt?: Date;
    expiryDate?: Date;
}

export interface SubmittedRequirements {
    submittedAt?: Date | null;
    expiryDate?: Date | null;
    status: EmployeeRequirementStatus;
    id?: number;
}

export enum EmployeeRequirementStatus {
    PENDING = "PENDING",
    SUBMITTED = "SUBMITTED",
    EXPIRED = "EXPIRED"
}