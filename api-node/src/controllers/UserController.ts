import { Request, Response } from 'express';
import { connect } from 'mongoose';
import { IUser } from '../models/User/IUser';
import User from '../models/User/User';
import { dbURI } from './ConnectController';
import jwt from 'jsonwebtoken';

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

	if (token === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });

	try {
		// On controle que la clé secrete corresponde
		const decodedToken = jwt.verify(
			token,
			'832afcf0-7a23-11ed-9825-4b3929766098'
		);
	} catch (error) {
		return res.status(403).json({ message: 'Action non autorisée' });
	}

	// Si le token est bon on renvoie les employés
	const { idManager } = req.params;
	User.find({ superior: idManager }, (error: any, users: IUser[]) => {
		res.status(200).json(users);
	});
};

export const getUser = (req: Request, res: Response) => {
	console.log(req.headers.authorization);

	const { id: idParams } = req.params;
	if (idParams) {
		User.findById(idParams, (error: any, user: IUser) => {
			res.status(200).json(user);
		});
	} else if (req.headers.authorization) {
		const token: string | undefined =
			req.headers.authorization?.split(' ')[1];

		try {
			// On controle que la clé secrete corresponde
			const VerifiedToken = jwt.verify(
				token,
				'832afcf0-7a23-11ed-9825-4b3929766098'
			);
			if (VerifiedToken) {
				const decoded = jwt.decode(token, { json: true })!;
				console.log(decoded);
				User.findById(decoded.id, (error: any, user: IUser) => {
					res.status(200).json(user);
				});
			}
		} catch (error) {
			return res.status(403).json({ message: 'Action non autorisée' });
		}
	} else {
		res.status(404).json({ message: 'erreur !!!' });
	}
};

export const addUser = (req: Request, res: Response) => {
	User.create(req.body, (error: any, user: IUser) => {
		console.log(req.body);
		console.log(user);
		console.log(error);

		if (error) res.status(404).json({ message: 'Erreur' });
		res.status(201).json(user);
	});
};

export const updateUser = (req: Request, res: Response) => {
	const updatedUser = req.body;
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
	User.deleteOne({ _id: id }, (error: any, user: IUser) => {
		res.status(200).json(user);
	});
};
