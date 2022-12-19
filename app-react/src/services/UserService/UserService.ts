import axios from 'axios';
import { IUser } from '../InterfacesServices/IUserService';

export const instance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const getAllUserFromAPI = async () => {
	try {
		const response = await instance.get('/users');
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const getAllEmployeeFromAPI = async (
	id: string | undefined,
	token: string | undefined
) => {
	try {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const response = await instance.get(`/employees/manager/${id}`);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

// Récupère un user en fonction d'un id passé en param ou un token
export const getUserFromApi = async (
	token: string | undefined,
	id?: string
) => {
	try {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const response = await instance.get(`/user${id ? `/${id}` : ''}`);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const postUserToApi = async (
	params: IUser,
	token: string | undefined
) => {
	try {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const response = await instance.post(`/user`, params);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const updateUserToApi = async (
	params: IUser,
	token: string | undefined
) => {
	try {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const response = await instance.put(`/user`, params);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const deleteUserToApi = async (
	id: string,
	token: string | undefined
) => {
	try {
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const response = await instance.delete(`/user/${id}`);
		return response;
	} catch (error: any) {
		return error.response;
	}
};
