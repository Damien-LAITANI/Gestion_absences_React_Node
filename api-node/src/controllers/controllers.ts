import { Request, Response } from 'express';
import { connect } from 'mongoose';
import Absence from '../models/Absence';
import User from '../models/User';

const dbURI = 'mongodb://127.0.0.1:27017/absenceApp';
connect(dbURI);

export const getAllUser = (req: Request, res: Response) => {
	const users = User.find({});
	res.status(200).json(users);
};

export const getUser = (req: Request, res: Response) => {
	User.findById(req.params.id, (error: any, user: typeof User) => {
		console.log(user);
		res.status(200).json(user);
	});
};

export const addUser = async (req: Request, res: Response) => {
	await User.create(req.body, (error: any, user: typeof User) => {
		res.status(201).json(user);
	});
};

export const updateUser = async (req: Request, res: Response) => {
	const updatedUser = req.body;
	const user = await User.replaceOne({ _id: req.body._id }, updatedUser);
	res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
	const { _id } = req.params;
	const user = await User.deleteOne({ _id: _id });
	res.status(200).json(user);
};

export const postOne = (req: Request, res: Response) => {
	const absence = {
		startDate: Date.now(),
		endDate: Date.now(),
		types: 'congé payé',
		motif: 'string',
		status: 'REJETEE',
	};

	const user = new User({
		firstname: 'test',
		lastname: 'test',
		email: 'email',
		password: 'password',
		roles: 'admin',
		absences: [absence],
	});

	User.create(user, (error) => {
		console.log(user);
		console.log(error);
		res.end();
	});
};
