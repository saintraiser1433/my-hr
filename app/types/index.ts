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

