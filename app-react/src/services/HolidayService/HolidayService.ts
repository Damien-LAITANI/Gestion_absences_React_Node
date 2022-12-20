import { instance } from '../UserService/UserService';

export const getAllHolidayFromAPI = async (token: string | undefined) => {
	try {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const response = await instance.get('/holiday');
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const getHolidayFromApi = async (
	id: string,
	token: string | undefined
) => {
	try {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const response = await instance.get(`/holiday/${id}`);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const postHolidayToApi = async (
	params: any,
	token: string | undefined
) => {
	try {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const response = await instance.post(`/holiday`, params);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const updateHolidayToApi = async (
	params: any,
	token: string | undefined
) => {
	try {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const response = await instance.put(`/holiday`, params);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const deleteHolidayToApi = async (
	id: string,
	token: string | undefined
) => {
	try {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const response = await instance.delete(`/holiday/${id}`);
		return response;
	} catch (error: any) {
		return error.response;
	}
};
