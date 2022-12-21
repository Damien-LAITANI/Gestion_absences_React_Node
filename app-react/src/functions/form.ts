import { IHoliday } from '../services/InterfacesServices/IHolidayService';
import { IAbsence, IUser } from '../services/InterfacesServices/IUserService';
import { datesAreOnSameDay, getJsDate } from './date';

/**
 *Validation des champs de formulaire des absences
 * @param newAbsence
 * @param user
 * @param publicHolidays
 * @param employerHolidays
 * @param setErrors
 * @returns true/false
 */
export const formIsValid = (
	newAbsence: IAbsence | any,
	user: IUser,
	holidays: IHoliday[] | null,
	setErrors: Function
) => {
	let publicHolidays: IHoliday[] = [];
	let employerHolidays: IHoliday[] = [];

	setErrors({});

	if (holidays) {
		/** - Liste des holidays qui sont des jours fériés uniquement */
		publicHolidays = holidays.filter((holiday) => holiday.type === 'Férié');

		/** - Liste des holidays qui sont des rtt employeurs uniquement */
		employerHolidays = holidays.filter(
			(holiday) => holiday.type === 'RTT employeur'
		);
	}

	const newAbsenceStartDate = getJsDate(newAbsence.startDateISO);
	const newAbsenceEndDate = getJsDate(newAbsence.endDateISO);
	let isValid = true;

	// On vide les erreurs dans le cas ou il y en avait déjà pour éviter les doublons et supprimer les erreurs corriger pas le user
	let errors = {};

	// * Les dates sont obligatoires
	if (newAbsence.startDateISO === '') {
		console.error('La date est obligatoire');
		errors = {
			...errors,
			requiredStartDate: 'La date de début est obligatoire',
		};
		isValid = false;
	}
	if (newAbsence.endDateISO === '') {
		console.error('La date est obligatoire');
		errors = {
			...errors,
			requiredEndDate: 'La date de fin est obligatoire',
		};
		isValid = false;
	}

	// * Date de début postérieur à aujourd'hui
	if (
		datesAreOnSameDay(new Date(), getJsDate(newAbsence.startDateISO)) ||
		getJsDate(newAbsence.startDateISO).valueOf() < new Date().valueOf()
	) {
		console.error('La date demandée est déjà passée');
		errors = {
			...errors,
			oldDate: 'La date demandée est déjà passée',
		};
		isValid = false;
	}

	// * Motif obligatoire si type sans solde
	if (newAbsence.type === 'congé sans solde' && newAbsence.motif.length < 6) {
		console.error(
			'Le motif est obligatoire quand le type est congé sans solde (au moins 6 caractères)'
		);
		errors = {
			...errors,
			motif: 'Le motif est obligatoire quand le type est congé sans solde (au moins 6 caractères)',
		};
		isValid = false;
	}

	// * La date de fin est après la date de début
	if (
		getJsDate(newAbsence.startDateISO).valueOf() >
		getJsDate(newAbsence.endDateISO).valueOf()
	) {
		console.error('La date de fin est après la date de début');
		errors = {
			...errors,
			endDateFirst: 'La date de fin est avant la date de début',
		};
		isValid = false;
	}

	// * Une demande de congés ne doit pas chevaucher une autre demande de congés existante.

	// Pour chaque absence existante de user
	for (const absence of user.absences) {
		const absenceStartDate = new Date(absence.startDateISO.split('T')[0]);
		const absenceEndDate = new Date(absence.endDateISO.split('T')[0]);

		// Cas 1 - La date de début de newAbsence est avant la date de début de absence
		if (
			newAbsence.startDateISO === '' &&
			newAbsenceStartDate.valueOf() <= absenceStartDate.valueOf()
		) {
			// => Si la date de fin de newAbsence est après la date de début de absence alors il y a chevauchement
			if (absenceStartDate.valueOf() <= newAbsenceEndDate.valueOf()) {
				console.error('Erreur : chevauchement des dates');
				errors = {
					...errors,
					overlapStartDate: 'chevauchement de la date de début',
				};
				isValid = false;
			}
		}

		// Cas 2 - La date de début de newAbsence est après la date de début de absence
		if (
			newAbsence.endDateISO === '' &&
			absenceStartDate.valueOf() <= newAbsenceStartDate.valueOf()
		) {
			// => Si la date de début de newAbsence est avant la date de fin de absence alors il y a chevauchement
			if (newAbsenceStartDate.valueOf() <= absenceEndDate.valueOf()) {
				console.error('Erreur : chevauchement des dates');
				errors = {
					...errors,
					overlapEndDate: 'chevauchement de la date de fin',
				};
				isValid = false;
			}
		}
	}

	// * La date de début ne peut pas être
	// * un jour férié
	for (const publicHoliday of publicHolidays) {
		if (datesAreOnSameDay(newAbsenceStartDate, publicHoliday.date)) {
			console.error('Erreur : La date de début est un jour férié');
			errors = {
				...errors,
				holidayStartDate: 'La date de début est un jour férié',
			};
			isValid = false;
		}
	}

	// * La date de fin ne peut pas être un jour férié, une RTT employeur ou un week-end
	// * un jour férié
	for (const publicHoliday of publicHolidays) {
		if (datesAreOnSameDay(newAbsenceEndDate, publicHoliday.date)) {
			console.error('Erreur : La date de fin est un jour férié');
			errors = {
				...errors,
				holidayEndDate: 'La date de fin est un jour férié',
			};
			isValid = false;
		}
	}

	// * une RTT employeur
	for (const employerHoliday of employerHolidays) {
		if (datesAreOnSameDay(newAbsenceStartDate, employerHoliday.date)) {
			console.error('Erreur : La date de début est une rtt employeur');
			errors = {
				...errors,
				rttStartDate: 'La date de début est une rtt employeur',
			};
			isValid = false;
		}
	}

	// * une RTT employeur
	for (const employerHoliday of employerHolidays) {
		if (datesAreOnSameDay(newAbsenceEndDate, employerHoliday.date)) {
			console.error('Erreur : La date de fin est une rtt employeur');
			errors = {
				...errors,
				rttEndDate: 'La date de fin est une rtt employeur',
			};
			isValid = false;
		}
	}

	// * Week-end
	if (
		newAbsenceStartDate.getDay() === 0 ||
		newAbsenceStartDate.getDay() === 6
	) {
		console.error('Erreur : la date de début est le weekend');
		errors = {
			...errors,
			weekendStartDate: 'La date de début est le weekend',
		};
		isValid = false;
	}

	// * Week-end
	if (newAbsenceEndDate.getDay() === 0 || newAbsenceEndDate.getDay() === 6) {
		console.error('Erreur : la date de fin est le weekend');
		errors = {
			...errors,
			weekendEndDate: 'la date de fin est le weekend',
		};
		isValid = false;
	}

	// * Une demande d'absence ne modifie pas le solde des compteurs de congés. Cette opération est effectuée par le traitement de nuit.
	console.table(errors);
	setErrors(errors);

	return isValid;
};
