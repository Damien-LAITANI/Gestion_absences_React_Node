var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next()
			);
		});
	};
import { connect } from 'mongoose';
import { dbURI } from '../controllers/ConnectController.js';
import Holiday from '../models/Holiday/Holiday.js';
import User from '../models/User/User.js';
connect(dbURI);
export const script = () => {
	scriptHolidays();
	scriptAbsences();
};
const scriptHolidays = () =>
	__awaiter(void 0, void 0, void 0, function* () {
		const holidaysToUpdateStatus = yield Holiday.updateMany(
			{ status: 'INITIALE' },
			{ status: 'VALIDEE' }
		);
		console.log(holidaysToUpdateStatus);
	});
const scriptAbsences = () =>
	__awaiter(void 0, void 0, void 0, function* () {
		let absencesToUpdateStatus = [];
		const users = yield User.find({});
		for (let user of users) {
			for (let absence of user.absences) {
				if (absence.status == 'INITIALE') {
					absence.status = 'EN_ATTENTE_VALIDATION';
					absencesToUpdateStatus.push(absence);
				}
			}
			User.replaceOne({ _id: user._id }, user, (error, user) => {
				console.log(user);
			});
		}
	});
