import { Request, Response } from 'express';
import { connect } from 'mongoose';
import { authorization } from '../auth/auth';
import Holiday from '../models/Holiday/Holiday';
import { IHoliday } from '../models/Holiday/IHoliday';
import { dbURI } from './ConnectController';

connect(dbURI);

export const getAllHoliday = (req: Request, res: Response) => {
	// Récupération du token
	const token: string | undefined = req.headers.authorization?.split(' ')[1];

	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);

	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });

	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });

	Holiday.find({}, (error: any, holidays: typeof Holiday[]) => {
		if (error) res.status(404).json({ message: 'Erreur' });

		res.status(200).json(holidays);
	});
};

export const addHoliday = (req: Request, res: Response) => {
	// Récupération du token
	const token: string | undefined = req.headers.authorization?.split(' ')[1];

	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });

	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });

	Holiday.create(req.body, (error: any, Holiday: IHoliday) => {
		console.log(req.body);
		console.log(Holiday);
		console.log(error);

		if (error) res.status(404).json({ message: 'Erreur' });

		res.status(201).json(Holiday);
	});
};

export const updateHoliday = (req: Request, res: Response) => {
	const updatedUser = req.body;

	// Récupération du token
	const token: string | undefined = req.headers.authorization?.split(' ')[1];

	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });

	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });

	Holiday.replaceOne(
		{ _id: req.body._id },
		updatedUser,
		(error: any, user: typeof Holiday) => {
			if (error) res.status(404).json({ message: 'Erreur' });

			res.status(200).json(user);
		}
	);
};

export const deleteHoliday = (req: Request, res: Response) => {
	const { id } = req.params;

	// Récupération du token
	const token: string | undefined = req.headers.authorization?.split(' ')[1];

	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });

	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });

	Holiday.deleteOne({ _id: id }, (error: any, user: IHoliday) => {
		if (error) res.status(404).json({ message: 'Erreur' });

		res.status(200).json(user);
	});
};
