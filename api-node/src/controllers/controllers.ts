import { Request, Response } from 'express';
import { connect } from 'mongoose';
import Absence from '../models/Absence';

const dbURI = 'mongodb://localhost:27017/absenceApp';
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

	Absence.create(absence, (error) => {
		console.log(absence);
		console.log(error);
		res.end();
	});
};
