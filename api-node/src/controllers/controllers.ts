import { Request, Response } from 'express';
import { connect } from 'mongoose';
import Absence from '../models/Absence';
import User from '../models/User';

const dbURI = 'mongodb://127.0.0.1:27017/absenceApp';
connect(dbURI);
const getAll = () => {
	const absences = Absence.find({});
	console.log();
};

export const postOne = (req: Request, res: Response) => {
	const absence = new Absence({
		startDate: Date.now(),
		endDate: Date.now(),
		types: 'congé payé',
		motif: 'string',
		status: 'REJETEE',
	});
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
