import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

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
		return jwt.verify(token, process.env.SECRET_KEY!);
	} catch (error) {
		return false;
	}
};
