import Cookies from 'js-cookie';
import {
	IAbsence,
	IUser,
} from '../../../services/InterfacesServices/IUserService';
import { updateUserToApi } from '../../../services/UserService/UserService';
import { IHoliday } from '../../../services/InterfacesServices/IHolidayService';
import { getJsDate, datesAreOnSameDay } from '../../../functions/date';
import {
	getAbsencesByYear,
	getRemainingAbsenceCount,
} from '../../../functions/user';
import { useState } from 'react';

interface IAbsenceListProps {
	setShowAbsenceForm: Function;
	setUser: Function;
	user: IUser;
	holidays: IHoliday[] | null;
	toggleShowAbsenceForm: Function;
}

interface IErrors {
	motif: string;
	endDateFirst: string;
	overlapStartDate: string;
	overlapEndDate: string;
	holidayStartDate: string;
	holidayEndDate: string;
	rttStartDate: string;
	rttEndDate: string;
	weekendStartDate: string;
	weekendEndDate: string;
}

const AbsenceForm = ({
	setShowAbsenceForm,
	user,
	setUser,
	holidays,
	toggleShowAbsenceForm,
}: IAbsenceListProps) => {
	const [errors, setErrors] = useState<any>({});
	let publicHolidays: IHoliday[] = [];
	let employerHolidays: IHoliday[] = [];

	console.log(errors);

	if (holidays) {
		/** - Liste des holidays qui sont des jours fériés uniquement */
		publicHolidays = holidays.filter((holiday) => holiday.type === 'Férié');

		/** - Liste des holidays qui sont des rtt employeurs uniquement */
		employerHolidays = holidays.filter(
			(holiday) => holiday.type === 'RTT employeur'
		);
	}

	const formIsValid = (newAbsence: IAbsence) => {
		const newAbsenceStartDate = getJsDate(newAbsence.startDateISO);
		const newAbsenceEndDate = getJsDate(newAbsence.endDateISO);
		let isValid = true;

		// On vide les erreurs dans le cas ou il y en avait déjà pour éviter les doublons et supprimer les erreurs corriger pas le user
		let errors = {};

		// * Motif obligatoire si type sans solde
		if (
			newAbsence.type === 'congé sans solde' &&
			newAbsence.motif.length < 6
		) {
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
				endDateFirst: 'La date de fin est après la date de début',
			};
			isValid = false;
		}

		// * Une demande de congés ne doit pas chevaucher une autre demande de congés existante.

		// Pour chaque absence existante de user
		for (const absence of user.absences) {
			const absenceStartDate = new Date(
				absence.startDateISO.split('T')[0]
			);
			const absenceEndDate = new Date(absence.endDateISO.split('T')[0]);

			// Cas 1 - La date de début de newAbsence est avant la date de début de absence
			if (newAbsenceStartDate.valueOf() <= absenceStartDate.valueOf()) {
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
			if (absenceStartDate.valueOf() <= newAbsenceStartDate.valueOf()) {
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
				console.error(
					'Erreur : La date de début est une rtt employeur'
				);
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
		if (
			newAbsenceEndDate.getDay() === 0 ||
			newAbsenceEndDate.getDay() === 6
		) {
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

	console.log(errors);

	const onFormProcess = (event: any) => {
		event.preventDefault();

		const [startDate, endDate, types, motif] = event.target;
		const startDateValue = startDate.value;
		const endDateValue = endDate.value;
		const typesValue = types.value;
		const motifValue = motif.value;

		const newAbsenceStartDate = new Date(startDateValue);
		const newAbsenceEndDate = new Date(endDateValue);

		const newAbsence: IAbsence = {
			startDateISO: newAbsenceStartDate.toISOString(),
			endDateISO: newAbsenceEndDate.toISOString(),
			type: typesValue,
			motif: motifValue,
			status: 'INITIALE',
		};

		if (formIsValid(newAbsence)) {
			// * On vérifie que le solde d'absence n'est pas épuisé
			const remainingAbsenceCount = getRemainingAbsenceCount(
				user,
				newAbsence.type
			);
			if (remainingAbsenceCount) {
				console.info("Ajout de l'absence");
				createNewAbsence(event);
			} else
				console.error(
					`Absence non créée car le solde d'absence de type ${newAbsence.type} est épuisé !`
				);
		} else {
			console.error('Absence non créée car invalide !');
		}
	};

	const createNewAbsence = async (event: any) => {
		event.preventDefault();
		const [startDate, endDate, types, motif] = event.target;
		const startDateValue = startDate.value;
		const endDateValue = endDate.value;
		const typesValue = types.value;
		const motifValue = motif.value;

		const newAbsence: IAbsence = {
			startDateISO: new Date(startDateValue).toISOString(),
			endDateISO: new Date(endDateValue).toISOString(),
			type: typesValue,
			motif: motifValue,
			status: 'INITIALE',
		};

		const updatedUser: IUser = {
			...user,
			absences: [...user.absences, newAbsence],
		};

		const token = Cookies.get('Token');
		const response = await updateUserToApi(updatedUser, token);

		if (response.status === 200) {
			console.log(updatedUser);
			setUser(updatedUser);
			toggleShowAbsenceForm();
			// navigate('/');
		}
	};

	return (
		<div className="w-50 mx-auto">
			<h1 className="text-center my-5">Demande d'absence</h1>
			<form onSubmit={(event) => onFormProcess(event)}>
				<div className="form-floating mb-3">
					<input
						type="date"
						className="form-control"
						id="startDate"
						name="startDate"
					/>
					<label htmlFor="startDate">Date de début</label>
					{errors && Object.keys(errors).length !== 0 && (
						<>
							<p className="errors">{errors.weekendStartDate}</p>
							<p className="errors">{errors.overlapStartDate}</p>
							<p className="errors">{errors.holidayStartDate}</p>
							<p className="errors">{errors.rttStartDate}</p>
						</>
					)}
				</div>

				<div className="form-floating mb-3">
					<input
						type="date"
						className="form-control"
						id="endDate"
						name="endDate"
					/>
					<label htmlFor="endDate">Date de fin</label>
					{errors && Object.keys(errors).length !== 0 && (
						<>
							<p className="errors">{errors.endDateFirst}</p>
							<p className="errors">{errors.holidayEndDate}</p>
							<p className="errors">{errors.overlapEndDate}</p>
							<p className="errors">{errors.rttEndDate}</p>
							<p className="errors">{errors.weekendEndDate}</p>
						</>
					)}
				</div>

				<div className="form-floating mb-3">
					<select
						name="types"
						id="select-conge"
						className="form-select"
						aria-label="Floating label select example"
					>
						<option value="congé payé">Congé payé</option>
						<option value="RTT">RTT</option>
						<option value="congé sans solde">
							Congé sans solde
						</option>
					</select>
					<label htmlFor="select-conge">Type de congé</label>
				</div>

				<div className="form-floating mb-3">
					<textarea
						className="form-control"
						name="motif"
						rows={5}
						placeholder="Motif"
						id="motif"
						style={{ height: '150px' }}
					></textarea>
					<label htmlFor="motif">Motif</label>
					{errors && Object.keys(errors).length !== 0 && (
						<p className="errors">{errors.motif}</p>
					)}
				</div>

				<ul className="p-0 text-center mt-3">
					<button type="submit" className="btn btn-success me-5">
						Valider
					</button>

					<button
						type="reset"
						className="btn btn-danger"
						onClick={() => toggleShowAbsenceForm()}
					>
						Annuler
					</button>
				</ul>
			</form>
		</div>
	);
};

export default AbsenceForm;
