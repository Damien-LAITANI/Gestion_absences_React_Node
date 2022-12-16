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
		const response = await instance.get('/user');
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const getAllEmployeeFromAPI = async (id: string) => {
	try {
		const response = await instance.get(`/employees/manager/${id}`);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const getUserFromApi = async (id: string) => {
	try {
		const response = await instance.get(`/user/${id}`);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const postUserToApi = async (params: IUser) => {
	try {
		const response = await instance.post(`/user`, params);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const updateUserToApi = async (params: IUser) => {
	try {
		const response = await instance.put(`/user`, params);
		return response;
	} catch (error: any) {
		return error.response;
	}
};

export const deleteUserToApi = async (id: string) => {
	try {
		const response = await instance.delete(`/user/${id}`);
		return response;
	} catch (error: any) {
		return error.response;
	}
};
