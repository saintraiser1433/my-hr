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
    role: "Admin" | "Employee" | "TeamLead";
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

export interface PersonalInformation {
    jobTitle: string;
    hiredDate: string;
    department: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    gender?: string;
    date_of_birth?: string;
    email?: string;
    contact_number?: string;
    telephone_number?: string;
    permanent_address?: string;
    current_address?: string;
    religion?: string;
    citizenship?: string;
    language_spoken?: string;
    civil_status?: string;
    nickname?: string;
    fathers_name?: string;
    mothers_name?: string;
    fathers_occupation?: string;
    mothers_occupation?: string;
    parents_address?: string;
    person_to_be_contact?: string;
    photo_path?: string
}

export interface Education {
    school_name?: string;
    degree?: string;
    year_started?: string;
    year_ended?: string;
    description?: string;
}

export interface WorkExperience {
    company_name?: string;
    job_title?: string;
    work_year_started?: string;
    work_year_ended?: string;
}

export interface Skill {
    skills_name?: string;
}

export interface References {
    name_of_person?: string;
    position?: string;
    ref_contact_number?: string;
}

export interface CombinedInformation {
    id: number,
    status: boolean,
    applicantInfo: PersonalInformation,
    educData: Education[],
    workData: WorkExperience[],
    skillsData: Skill[],
    referencesData: References[]
}