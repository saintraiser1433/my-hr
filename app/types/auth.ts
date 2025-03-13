export interface Token extends TokenDetail{
    users: EmployeeModel
}

export interface TokenDetail {
    token:{
        accessToken: string;
        refreshToken: string;
    }
}

export interface Login {
    username:string;
    password:string;
}

export interface User {
    id:number;
    first_name:string;
    last_name:string;
    middle_name:string;
    role:string
    departmentId:number;
}
