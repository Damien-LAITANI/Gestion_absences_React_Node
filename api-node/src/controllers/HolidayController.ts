import { Request, Response } from 'express';
import { connect } from 'mongoose';
import Holiday from '../models/Holiday/Holiday';
import { IHoliday } from '../models/Holiday/IHoliday';
import { dbURI } from './ConnectController';

connect(dbURI);

export const getAllHoliday = (req: Request, res: Response) => {
	Holiday.find({}, (error: any, users: typeof Holiday[]) => {
		res.status(200).json(users);
	});
};

export const addHoliday = (req: Request, res: Response) => {
	Holiday.create(req.body, (error: any, user: IHoliday) => {
		console.log(req.body);
		console.log(user);
		console.log(error);

		if (error) res.status(404).json({ message: 'Erreur' });
		res.status(201).json(user);
	});
};

export const updateHoliday = (req: Request, res: Response) => {
	const updatedUser = req.body;
	Holiday.replaceOne(
		{ _id: req.body._id },
		updatedUser,
		(error: any, user: typeof Holiday) => {
			res.status(200).json(user);
		}
	);
};

export const deleteHoliday = (req: Request, res: Response) => {
	const { id } = req.params;
	Holiday.deleteOne({ _id: id }, (error: any, user: IHoliday) => {
		res.status(200).json(user);
	});
};
