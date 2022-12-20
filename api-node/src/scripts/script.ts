import { connect } from 'mongoose';
import { dbURI } from '../controllers/ConnectController';
import Holiday from '../models/Holiday/Holiday';
import User from '../models/User/User';

connect(dbURI);
export const script = () => {
	scriptHolidays();
	scriptAbsences();
};

const scriptHolidays = async () => {
	const holidaysToUpdateStatus = await Holiday.updateMany(
		{ status: 'INITIALE' },
		{ status: 'VALIDEE' }
	);
	console.log(holidaysToUpdateStatus);
};

const scriptAbsences = async () => {
	const absencesToUpdateStatus = await User.updateMany(
		{ status: 'INITIALE' },
		{ status: 'EN_ATTENTE_VALIDATION' }
	);
	console.log(absencesToUpdateStatus);
};
