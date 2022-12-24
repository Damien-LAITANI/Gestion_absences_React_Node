import { connect } from 'mongoose';
import { dbURI } from '../controllers/ConnectController';
import { IAbsence } from '../models/Absence/IAbsence';
import Holiday from '../models/Holiday/Holiday';
import User from '../models/User/User';

connect(dbURI);
export const script = () => {
	console.log(
		'Execution du script de nuit ======================================='
	);
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
	let absencesToUpdateStatus = <IAbsence[]>[];
	const users = await User.find({});
	for (let user of users) {
		for (let absence of user.absences) {
			if (absence.status == 'INITIALE') {
				absence.status = 'EN_ATTENTE_VALIDATION';

				absencesToUpdateStatus.push(absence);
			}
		}
		User.replaceOne(
			{ _id: user._id },
			user,
			(error: any, user: typeof User) => {
				console.log(user);
			}
		);
	}
	console.log(absencesToUpdateStatus);
};
