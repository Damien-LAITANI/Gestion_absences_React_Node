import { IUser } from '../services/InterfacesServices/IUserService';
import { getJsDate } from './date';
type AbsenceType = 'congé payé' | 'RTT' | 'congé sans solde';

const MAX_CONGES_PAYE_COUNT = 25;
const MAX_RTT_COUNT = 6;

/**
 * - Renvoie les absences de l'année demandé, ou l'année courante si pas de paramêtre year
 */
export const getAbsencesByYear = (
	user: IUser,
	year: number = new Date().getFullYear()
) => {
	const absencesByYear = user.absences.filter(
		(absence) => getJsDate(absence.startDateISO).getFullYear() === year
	);

	return absencesByYear;
};

/**
 * - Renvoie le nombre d'absences du type et de l'année demandée (année courante si non précisée)
 */
export const getRemainingAbsenceCount = (
	user: IUser,
	absenceType: AbsenceType,
	year: number = new Date().getFullYear()
) => {
	const absenceCount = getAbsencesByYear(user, year).filter(
		(absence) => absence.type === absenceType
	).length;

	if (absenceType === 'RTT') return MAX_RTT_COUNT - absenceCount;
	if (absenceType === 'congé payé')
		return MAX_CONGES_PAYE_COUNT - absenceCount;

	return 999;
};
