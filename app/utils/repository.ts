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

    async updateById(id: number): Promise<ApiResponse<T>> {
        return fetch<ApiResponse<T>>(`${basePath}/${id}`, {
            method: 'PUT',
        });
    },

    async delete(id: number): Promise<ApiResponse<T>> {
        return fetch<ApiResponse<T>>(`${basePath}/${id}`, {
            method: 'DELETE',
        });
    },



    async deleteMany(data: number[]): Promise<ApiResponse<T>> {
        return fetch<ApiResponse<T>>(`${basePath}`, {
            method: 'DELETE',
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
                if (key === "requirements" && Array.isArray(value)) {
                    value.forEach(reqId => formData.append("requirements[]", String(reqId))); // Append each ID separately
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
            if (value !== undefined) {
                if (key === "requirements" && Array.isArray(value)) {
                    value.forEach(reqId => formData.append("requirements[]", String(reqId))); // Append each ID separately
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        if (file) {
            formData.append("file", file);
        }

        return fetch<ApiResponse<T>>(`${basePath}/${body.id}`, {
            method: 'PUT',  // Ensure backend handles PUT with multipart
            body: formData,
        });
    },


    async updateFileCustom(body: any, file: any, keyFile: string): Promise<ApiResponse<T>> {
        const formData = new FormData();

        Object.entries(body).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, String(value));
            }
        });

        if (file) {
            formData.append(keyFile, file);
        }

        return fetch<ApiResponse<T>>(`${basePath}/${body.id}`, {
            method: 'PUT',
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