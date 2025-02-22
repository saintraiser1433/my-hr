export interface Timestamped {
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ApiResponse<T> {
    status: number,
    message: string,
    data?: T,
}