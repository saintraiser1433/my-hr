import type { NitroFetchRequest, $Fetch } from 'nitropack'



export const repository = <T>(fetch: $Fetch<ApiResponse<T>, NitroFetchRequest>, basePath: string) => ({

    async add(body: T): Promise<ApiResponse<T>> {
        return fetch<ApiResponse<T>>(`${basePath}`, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    },

    async update(body: T): Promise<ApiResponse<T>> {
        return fetch<ApiResponse<T>>(`${basePath}/${(body as any).id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
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


    //add with image:

    async addWithImage(body: JobModel, file: any): Promise<ApiResponse<T>> {
        const formData = new FormData();

        Object.entries(body).forEach(([key, value]) => {
            if (value !== undefined) {  // Only append if value is not undefined
                formData.append(key, String(value));
            }
        });

        if (file) {
            formData.append("file", file);
        }

        return fetch<ApiResponse<T>>(`${basePath}`, {
            method: 'POST',
            body: formData,
        });
    },

    async updateWithImage(body: JobModel, file: any): Promise<ApiResponse<T>> {
        const formData = new FormData();

        // Append object fields to FormData
        Object.entries(body).forEach(([key, value]) => {
            if (value !== undefined) {  // Only append if value is not undefined
                formData.append(key, String(value));
            }
        });

        // Append file if provided,
        if (file) {
            formData.append("file", file);
        }

        return fetch<ApiResponse<T>>(`${basePath}/${body.id}`, {
            method: 'PUT',  // Ensure backend handles PUT with multipart
            body: formData,
        });
    },




    async uploadImage(file: any) {
        const formData = new FormData();
        formData.append("file", file);
        return fetch(`/file${basePath}`, {
            method: 'POST',
            body: formData
        })
    },


    //trial

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