import { Api } from '@/lib/common'

const formDataCv = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
};

export const submitCvFn = async (id, data) => {
    const response = await Api.put(`pesertas/${id}`, data, formDataCv)
    return response.data;
};