import type { NitroFetchRequest, $Fetch } from 'nitropack'



export const repository = <T>(fetch: $Fetch<ApiResponse<T>, NitroFetchRequest>, basePath: string) => ({

    async add(body: T): Promise<ApiResponse<T>> {
        return fetch<ApiResponse<T>>(`${basePath}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
    },

    async update(body: T): Promise<ApiResponse<T>> {
        return fetch<ApiResponse<T>>(`${basePath}/${(body as any).id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
    },

    async delete(id: number): Promise<ApiResponse<T>> {
        return fetch<ApiResponse<T>>(`${basePath}/${id}`, {
            method: 'DELETE',
        });
    },

    async getFiltered(id: number): Promise<ApiResponse<T[]>> {
        return fetch<ApiResponse<T[]>>(`${basePath}/${id}`)
    },

    async getAll(): Promise<ApiResponse<T[]>> {
        return fetch<ApiResponse<T[]>>(`${basePath}`)
    },

    


    async addCourse(body: CourseModel): Promise<T> {
        return fetch<T>('/course', {
            method: 'POST',
            body: body
        })
    },



    //trial
    async updateCourse(body: CourseModel): Promise<T> {
        return fetch<T>(`/course/${body.course_id}`, {
            method: 'PUT',
            body: body
        })
    },

    async removeCourse(id: number): Promise<T> {
        return fetch<T>(`/course/${id}`, {
            method: 'DELETE',
        })
    },

    async getCourseFiltered(): Promise<CourseModel[]> {
        return fetch<CourseModel[]>(`/course/filtered`)
    },

    async getAllCourses(): Promise<CourseModel[]> {
        return fetch<CourseModel[]>(`/course`)
    },










    //dashboard model















})