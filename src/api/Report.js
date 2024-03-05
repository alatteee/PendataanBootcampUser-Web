import { Api } from '@/lib/common'

export const currentReportUser = async (id) => {
	const response = await Api.get(`pesertas/${id}`);
	return response.data;
};