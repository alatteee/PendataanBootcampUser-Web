import { Api } from '@/lib/common'

const formEditPassword = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
};

export const currentUserDataPasswordFn = async (id) => {
	const response = await Api.get(`pesertas/${id}`);
	return response.data;
};

export const submitEditPassword = async (id, data) => {
    const response = await Api.put(`pesertas/${id}/changePassword`, data, formEditPassword)
    return response.data;
};