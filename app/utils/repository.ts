import type { NitroFetchRequest, $Fetch } from 'nitropack'



export const repository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
    //course



    async addCourse(body: CourseModel): Promise<T> {
        return fetch<T>('/course', {
            method: 'POST',
            body: body
        })
    },

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