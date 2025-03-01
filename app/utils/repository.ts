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

    async deleteMany(data: any): Promise<ApiResponse<T>> {
        return fetch<ApiResponse<T>>(`${basePath}`, {
            method: 'POST',
            body: JSON.stringify(data)
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
            if (value !== undefined) {
                if (key === "requirementsId" && Array.isArray(value)) {
                    value.forEach(reqId => formData.append("requirementsId[]", String(reqId))); // Append each ID separately
                } else {
                    formData.append(key, String(value));
                }
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


















})