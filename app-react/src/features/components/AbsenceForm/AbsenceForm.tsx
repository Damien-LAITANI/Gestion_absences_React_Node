import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import {
	IAbsence,
	IUser,
} from '../../../services/InterfacesServices/IUserService';
import { updateUserToApi } from '../../../services/UserService/UserService';
import { IHoliday } from '../../../services/InterfacesServices/IHolidayService';
import { datesAreOnSameDay } from '../../../functions/date';

interface IAbsenceListProps {
	setShowAbsenceForm: Function;
	setUser: Function;
	user: IUser;
	holidays: IHoliday[] | null;
	toggleShowAbsenceForm: Function;
}

const AbsenceForm = ({
	setShowAbsenceForm,
	user,
	setUser,
	holidays,
	toggleShowAbsenceForm,
}: IAbsenceListProps) => {
	let publicHolidays: IHoliday[] = [];
	let employerHolidays: IHoliday[] = [];
	if (holidays) {
		/** - Liste des holidays qui sont des jours fériés uniquement */
		publicHolidays = holidays.filter((holiday) => holiday.type === 'Férié');

		/** - Liste des holidays qui sont des rtt employeurs uniquement */
		employerHolidays = holidays.filter(
			(holiday) => holiday.type === 'RTT employeur'
		);
	}

	const navigate = useNavigate();

	const formIsValid = (event: any) => {
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

		// * Motif obligatoire si type sans solde
		if (
			newAbsence.type === 'congé sans solde' &&
			newAbsence.motif.length < 6
		) {
			console.error(
				'Le motif est obligatoire quand le type est congé sans solde (au moins 6 caractères)'
			);
			return false;
		}

		// * La date de fin est après la date de début
		if (
			new Date(startDateValue).valueOf() >
			new Date(endDateValue).valueOf()
		) {
			console.error('La date de fin est après la date de début');
			return false;
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
					return false;
				}
			}

			// Cas 2 - La date de début de newAbsence est après la date de début de absence
			if (absenceStartDate.valueOf() <= newAbsenceStartDate.valueOf()) {
				// => Si la date de début de newAbsence est avant la date de fin de absence alors il y a chevauchement
				if (newAbsenceStartDate.valueOf() <= absenceEndDate.valueOf()) {
					console.error('Erreur : chevauchement des dates');
					return false;
				}
			}
		}

		// * La date de début ne peut pas être
		// * un jour férié
		for (const publicHoliday of publicHolidays) {
			if (datesAreOnSameDay(newAbsenceStartDate, publicHoliday.date)) {
				console.error('Erreur : La date de début est un jour férié');
				return false;
			}
		}

		// * une RTT employeur
		for (const employerHoliday of employerHolidays) {
			if (datesAreOnSameDay(newAbsenceStartDate, employerHoliday.date)) {
				console.error(
					'Erreur : La date de début est une rtt employeur'
				);
				return false;
			}
		}

		// * Week-end
		if (
			newAbsenceStartDate.getDay() === 0 ||
			newAbsenceStartDate.getDay() === 6
		) {
			console.error('Erreur : la date de début est le weekend');
			return false;
		}

		// * La date de fin ne peut pas être un jour férié, une RTT employeur ou un week-end
		// * un jour férié
		for (const publicHoliday of publicHolidays) {
			if (datesAreOnSameDay(newAbsenceEndDate, publicHoliday.date)) {
				console.error('Erreur : La date de fin est un jour férié');
				return false;
			}
		}

		// * une RTT employeur
		for (const employerHoliday of employerHolidays) {
			if (datesAreOnSameDay(newAbsenceEndDate, employerHoliday.date)) {
				console.error('Erreur : La date de fin est une rtt employeur');
				return false;
			}
		}

		// * Week-end
		if (
			newAbsenceEndDate.getDay() === 0 ||
			newAbsenceEndDate.getDay() === 6
		) {
			console.error('Erreur : la date de fin est le weekend');
			return false;
		}

		// TODO - Une demande d'absence ne modifie pas le solde des compteurs de congés. Cette opération est effectuée par le traitement de nuit.

		return false;
	};

	const onFormProcess = (event: any) => {
		event.preventDefault();
		if (formIsValid(event)) {
			createNewAbsence(event);
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
				</div>

				<div className="form-floating mb-3">
					<input
						type="date"
						className="form-control"
						id="endDate"
						name="endDate"
					/>
					<label htmlFor="endDate">Date de fin</label>
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
