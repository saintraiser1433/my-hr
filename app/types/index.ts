export interface Timestamped {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export interface BreadcrumbItem {
  label: string;
  icon?: string;
  to?: string;
}

export interface SummaryModel {
  departmentsCount:number;
  employeesCount:number;
  applicantsCount:number;
  jobsCount:number;
}

export interface MenuItem {
  label: string;
  icon?: string;
  type?: string;
  to?: string;
  slot?: string;
  children?: MenuItem[];
}




export interface DirectionModel {
  id: number,
  direction: Directions
}

export interface ChartModel {
  name: string;
  value: number;
}

export interface RankingModel {
  name:string;
  departmentName:string;
  photo_path:string;
  averageRating:number;

}

export type Directions = 'up' | 'down'

export enum ApplicationStatus {
  PENDING = "PENDING",
  ONGOING = "ONGOING",
  PASSED = "PASSED",
  FAILED = "FAILED",
  REJECTED = "REJECTED",
}

export enum InterviewStatusEnum {
  PENDING = "PENDING",
  PASSED = "PASSED",
  FAILED = "FAILED",
  NONE = "",
}

export enum Type {
  TEAMLEAD = 'TeamLead',
  EMPLOYEE = 'Employee'
}

