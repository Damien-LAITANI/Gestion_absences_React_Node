import { Request, Response } from 'express';
import { connect } from 'mongoose';
import Absence from '../models/Absence';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { IUser } from '../models/IUser';

const dbURI = 'mongodb://127.0.0.1:27017/absenceApp';
connect(dbURI);

export const getAllUser = (req: Request, res: Response) => {
	User.find({}, (error: any, users: typeof User[]) => {
		res.status(200).json(users);
	});
};

export const getAllEmployee = (req: Request, res: Response) => {
	const { idManager } = req.params;
	User.find({ superior: idManager }, (error: any, users: IUser[]) => {
		res.status(200).json(users);
	});
};

export const getUser = (req: Request, res: Response) => {
	User.findById(req.params.id, (error: any, user: IUser) => {
		res.status(200).json(user);
	});
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

export const login = (req: Request, res: Response) => {
	const { email, password } = req.body;
	User.findOne({ email: email }, async (error: any, user: IUser) => {
		console.log(user);
		if (!user)
			res.status(404).json({
				message: "L'email ou le mot de passe ne correspond pas",
			});

		const isValidPass: boolean = await bcrypt.compare(
			password,
			user.password
		);

		if (!isValidPass)
			return res.status(404).json({
				message: "L'email ou le mot de passe ne correspond pas",
			});

		res.status(200).json(user);
	});
};
