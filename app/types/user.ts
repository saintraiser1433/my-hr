export interface User {
    id?: string,
    email?: string,
    first_name?: string,
    last_name?: string,
    middle_name?: string,
    username?: string,
    password?: string,
    accessToken?: string,
    refreshToken?: string,
    fullname?: string
    role?: Role
}

export type Role = 'admin' | 'examinee' | 'deans';