import jwt from 'jsonwebtoken';

/**
 * On vérifie la présence et la validité du token
 * @param token
 * @returns false | undefined | decoded token
 */
export const authorization = (token: string | undefined) => {
	// si pas de token ou token au string : 'undefined'
	if (token === 'undefined' || token === undefined) return undefined;

	try {
		// On controle que la clé secrete corresponde
		return jwt.verify(token, '832afcf0-7a23-11ed-9825-4b3929766098');
	} catch (error) {
		return false;
	}
};
