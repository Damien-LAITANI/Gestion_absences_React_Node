import { ILogin } from './IService';
import { instance } from './UserService';

export const login = async (params: ILogin) => {
	try {
		const response = await instance.post('/login', params);
		return response;
	} catch (error: any) {
		return error.response;
	}
};
