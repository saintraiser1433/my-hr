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