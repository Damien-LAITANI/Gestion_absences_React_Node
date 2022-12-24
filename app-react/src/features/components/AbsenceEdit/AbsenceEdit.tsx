import Cookies from 'js-cookie';
import { formIsValid } from '../../../functions/form';
import { IHoliday } from '../../../services/InterfacesServices/IHolidayService';
import {
	IAbsence,
	IUser,
} from '../../../services/InterfacesServices/IUserService';
import { updateUserToApi } from '../../../services/UserService/UserService';

interface IAbsenceEdit {
	user: IUser;
	setUser: Function;
	absence: IAbsence;
	toggleEdit: Function;
	setAbsenceToDelete: void | React.MouseEventHandler<HTMLButtonElement>;
	errors: any;
	setErrors: Function;
	holidays: IHoliday[] | null;
}

const AbsenceEdit = ({
	user,
	setUser,
	absence,
	toggleEdit,
	setAbsenceToDelete,
	errors,
	setErrors,
	holidays,
}: IAbsenceEdit) => {
	const setDate = (dateToUpdate: string) => {
		return dateToUpdate.split('T')[0];
	};
	// const MOTIF_MIN_LENGTH = 4;

	// const formIsValid = (updatedAbsence: any) => {
	// 	console.clear();
	// 	console.table(updatedAbsence);
	// 	let isValid = true;

	// 	// On vide les erreurs dans le cas ou il y en avait déjà pour éviter les doublons et supprimer les erreurs corriger pas le user
	// 	let errors = {};

	// 	// * Le motif n'est obligatoire que si le type de demande est "congés sans solde"
	// 	if (
	// 		updatedAbsence.type === 'congé sans solde' &&
	// 		updatedAbsence.motif.length < MOTIF_MIN_LENGTH
	// 	) {
	// 		console.error(
	// 			`Le motif des absences de type "congé sans solde" est obligatoire (${MOTIF_MIN_LENGTH} caractères minimum)`
	// 		);
	// 		errors = {
	// 			...errors,
	// 			motif: 'Le motif est obligatoire quand le type est congé sans solde (au moins 6 caractères)',
	// 		};
	// 		isValid = false;
	// 	}

	// 	console.log(errors);
	// 	setErrors(errors);

	// 	return isValid;
	// };

	const updateAbsence = async () => {
		const startDateInput: any = document.querySelector('#startDate');
		const endDateInput: any = document.querySelector('#endDate');
		const updateTypeInput: React.DetailedHTMLProps<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			HTMLSelectElement
		> = document.querySelector('#type') as React.DetailedHTMLProps<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			HTMLSelectElement
		>;
		const updateMotifInput: React.DetailedHTMLProps<
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		> = document.querySelector('#motif') as React.DetailedHTMLProps<
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		>;
		console.log(startDateInput);

		if (
			startDateInput.value &&
			endDateInput.value &&
			updateTypeInput.value
		) {
			const startDate = new Date(startDateInput.value).toISOString();
			const endDate = new Date(endDateInput.value).toISOString();

			const updatedAbsence = {
				_id: absence._id,
				startDateISO: startDate,
				endDateISO: endDate,
				type: updateTypeInput.value,
				status: absence.status,
				motif: updateMotifInput.value,
			};

			// * Si le formulaire est valide
			if (formIsValid(updatedAbsence, user, holidays, setErrors)) {
				// * Une fois modifiée la demande revient au statut INITIALE
				updatedAbsence.status = 'INITIALE';

				const updatedAbsences = user.absences.map((absence: any) => {
					if (absence._id !== updatedAbsence._id) {
						return absence;
					} else {
						return updatedAbsence;
					}
				});

				const newUser = {
					...user,
					absences: updatedAbsences,
				};
				const token = Cookies.get('Token');
				const response = await updateUserToApi(newUser, token);

				if (response.status === 200) {
					setUser(newUser);
					toggleEdit();
					// navigate('/absences');
				}
			}
			// * Si le formulaire n'est pas valide
			else {
				console.error(
					"Impossible de modifier l'absence, elle n'est pas valide"
				);
			}
		}
	};

	const onUpdate = (event: any) => {
		const startDateInput: any = document.querySelector('#startDate');
		const endDateInput: any = document.querySelector('#endDate');
		const updateTypeInput: React.DetailedHTMLProps<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			HTMLSelectElement
		> = document.querySelector('#type') as React.DetailedHTMLProps<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			HTMLSelectElement
		>;
		const updateMotifInput: React.DetailedHTMLProps<
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		> = document.querySelector('#motif') as React.DetailedHTMLProps<
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		>;

		if (
			startDateInput.value &&
			endDateInput.value &&
			updateTypeInput.value
		) {
			const startDate = new Date(startDateInput.value).toISOString();
			const endDate = new Date(endDateInput.value).toISOString();

			const updatedAbsence = {
				_id: absence._id,
				startDateISO: startDate,
				endDateISO: endDate,
				type: updateTypeInput.value,
				status: absence.status,
				motif: updateMotifInput.value,
			};

			if (formIsValid(updatedAbsence, user, holidays, setErrors))
				updateAbsence();
			else console.error('Absence non modifiée car invalide');
		}
	};

	return (
		<tr className="">
			<td className="form-floating align-middle">
				<input
					defaultValue={setDate(absence.startDateISO.split('T')[0])}
					name="startDate"
					id="startDate"
					type="date"
					className="d-inline form-control"
				/>
				<label htmlFor="startDate">Date de début</label>
				{errors && Object.keys(errors).length !== 0 && (
					<>
						<p className="errors text-danger mx-3">
							{errors.weekendStartDate}
						</p>
						<p className="errors text-danger mx-3">
							{errors.overlapStartDate}
						</p>
						<p className="errors text-danger mx-3">
							{errors.holidayStartDate}
						</p>
						<p className="errors text-danger mx-3">
							{errors.rttStartDate}
						</p>
						<p className="errors text-danger mx-3">
							{errors.oldStartDate}
						</p>
						<p className="errors text-danger mx-3">
							{errors.requiredStartDate}
						</p>
					</>
				)}
			</td>

			<td className="form-floating align-middle">
				<input
					defaultValue={setDate(absence.endDateISO.split('T')[0])}
					name="endDate"
					id="endDate"
					type="date"
					className="d-inline form-control"
				/>
				<label htmlFor="endDate">Date de fin</label>
				{errors && Object.keys(errors).length !== 0 && (
					<>
						<p className="errors color-danger mx-3">
							{errors.endDateFirst}
						</p>
						<p className="errors text-danger mx-3">
							{errors.holidayEndDate}
						</p>
						<p className="errors text-danger mx-3">
							{errors.overlapEndDate}
						</p>
						<p className="errors text-danger mx-3">
							{errors.rttEndDate}
						</p>
						<p className="errors text-danger mx-3">
							{errors.weekendEndDate}
						</p>
						<p className="errors text-danger mx-3">
							{errors.oldEndDate}
						</p>
						<p className="errors text-danger mx-3">
							{errors.requiredEndDate}
						</p>
					</>
				)}
			</td>

			<td className="form-floating align-middle">
				<select
					defaultValue={absence.type}
					name="type"
					id="type"
					className="form-select"
					aria-label="Floating label select example"
				>
					<option value="congé payé">Congé payé</option>
					<option value="RTT">RTT</option>
					<option value="congé sans solde">Congé sans solde</option>
				</select>
				<label htmlFor="type">Type</label>
			</td>
			<td className="form-floating align-middle">
				<input
					defaultValue={absence.motif}
					name="motif"
					id="motif"
					type="text"
					className="d-inline form-control"
				/>
				<label htmlFor="motif">Motif</label>
				{Object.keys(errors).length !== 0 && (
					<p className="errors text-danger mx-3">{errors.motif}</p>
				)}
			</td>

			<td className="form-floating align-middle">
				<p className="my-2">{absence.status}</p>
			</td>

			<td className="align-middle">
				<ul className="h-100 w-100 m-0 p-0 text-center">
					<li className="d-inline-block me-2">
						<button
							onClick={onUpdate}
							type="button"
							className="btn btn-success"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-check2"
								viewBox="0 0 16 16"
							>
								<path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
							</svg>
						</button>
					</li>
					<li className="d-inline-block">
						<button
							type="button"
							className="btn btn-danger"
							data-bs-toggle="modal"
							data-bs-target="#deleteAbsence"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-trash3"
								viewBox="0 0 16 16"
							>
								<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
							</svg>
						</button>
					</li>
				</ul>
			</td>
		</tr>
	);
};

export default AbsenceEdit;
