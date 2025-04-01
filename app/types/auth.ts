export interface Token extends TokenDetail {
    users: EmployeeModel
}

export interface TokenDetail {
    token: {
        accessToken: string;
        refreshToken: string;
    }
}

export interface AccountCredentials {
    username: string;
    password: string;
    confirmPassword?: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    role: string
    departmentId: number;
}
