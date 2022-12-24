import { ILogin } from '../InterfacesServices/IUserService';
import { instance } from '../UserService/UserService';

export const login = async (params: ILogin) => {
	try {
		const response = await instance.post('/login', params);
		return response;
	} catch (error: any) {
		return error.response;
	}
};
