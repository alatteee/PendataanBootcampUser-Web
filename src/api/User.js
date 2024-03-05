import { Api } from '@/lib/common'

const formDataUser = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
};

export const editUserFn = async (id, data) => {
    const response = await Api.put(`pesertas/${id}`, data, formDataUser)
    return response.data;
};

export const currentUserDataFn = async (id) => {
	const response = await Api.get(`pesertas/${id}`);
	return response.data;
};