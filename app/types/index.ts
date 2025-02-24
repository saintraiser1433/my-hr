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
  to?: string;
  slot?:string;
  children?: MenuItem[];
}
