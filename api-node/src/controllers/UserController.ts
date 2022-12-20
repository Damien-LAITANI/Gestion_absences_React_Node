import { Request, Response } from 'express';
import { connect } from 'mongoose';
import { IUser } from '../models/User/IUser';
import User from '../models/User/User';
import { dbURI } from './ConnectController';
import jwt from 'jsonwebtoken';
import { authorization } from '../auth/auth';

connect(dbURI);

export const getAllUser = (req: Request, res: Response) => {
	User.find({}, (error: any, users: typeof User[]) => {
		res.status(200).json(users);
	});
};

export const getAllEmployee = (req: Request, res: Response) => {
	console.log(req.headers.authorization);

	// Récupération du token
	const token: string | undefined = req.headers.authorization?.split(' ')[1];

	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });

	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });

	// Si le token est bon on renvoie les employés
	const { idManager } = req.params;
	User.find({ superior: idManager }, (error: any, users: IUser[]) => {
		res.status(200).json(users);
	});
};

/**
 * Fonction qui retourne l'user en fonction d'un id donné en params de la requete ou dans le token
 * @param req
 * @param res
 * @returns renvoie l'user
 */
export const getUser = (req: Request, res: Response) => {
	console.log(req.headers.authorization);

	const { id: idParams } = req.params;
	if (idParams) {
		User.findById(idParams, (error: any, user: IUser) => {
			res.status(200).json(user);
		});
	} else if (req.headers.authorization) {
		// Récupération du token
		const token: string | undefined =
			req.headers.authorization?.split(' ')[1];

		// Controle de la présence et la validité du token
		const verifiedToken = authorization(token);
		if (verifiedToken === undefined)
			return res.status(401).json({ message: 'Veuillez vous connecter' });

		if (!verifiedToken)
			return res.status(403).json({ message: 'Action non autorisée' });

		// On décode le token pour pouvoir utiliser l'id qui se trouve à l'intérieur
		const decoded = jwt.decode(token, { json: true });

		if (decoded) {
			User.findById(decoded.id, (error: any, user: IUser) => {
				res.status(200).json(user);
			});
		} else {
			res.status(404).json({ message: 'erreur de connexion !!!' });
		}
	} else {
		res.status(404).json({ message: 'erreur de connexion !!!' });
	}
};

export const addUser = (req: Request, res: Response) => {
	// Récupération du token
	const token: string | undefined = req.headers.authorization?.split(' ')[1];

	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });

	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });

	User.create(req.body, (error: any, user: IUser) => {
		console.log(req.body);
		console.log(user);
		console.log(error);

		if (error) res.status(404).json({ message: 'Erreur' });

		// si pas d'erreur on retourne l'user créé
		res.status(201).json(user);
	});
};

export const updateUser = (req: Request, res: Response) => {
	const updatedUser = req.body;

	// Récupération du token
	const token: string | undefined = req.headers.authorization?.split(' ')[1];

	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });

	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });

	User.replaceOne(
		{ _id: req.body._id },
		updatedUser,
		(error: any, user: typeof User) => {
			res.status(200).json(user);
		}
	);
};

export const deleteUser = (req: Request, res: Response) => {
	const { id } = req.params;

	// Récupération du token
	const token: string | undefined = req.headers.authorization?.split(' ')[1];

	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });

	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });

	User.deleteOne({ _id: id }, (error: any, user: IUser) => {
		res.status(200).json(user);
	});
};
