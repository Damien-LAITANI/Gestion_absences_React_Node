import Cookies from 'js-cookie';
import { formIsValid } from '../../../functions/form';
import { getRemainingAbsenceCount } from '../../../functions/user';
import { IHoliday } from '../../../services/InterfacesServices/IHolidayService';
import {
	IAbsence,
	IUser,
} from '../../../services/InterfacesServices/IUserService';
import { updateUserToApi } from '../../../services/UserService/UserService';

interface IAbsenceListProps {
	setShowAbsenceForm: Function;
	setUser: Function;
	user: IUser;
	holidays: IHoliday[] | null;
	toggleShowAbsenceForm: Function;
	errors: any;
	setErrors: Function;
}

const AbsenceForm = ({
	setShowAbsenceForm,
	user,
	setUser,
	holidays,
	toggleShowAbsenceForm,
	errors,
	setErrors,
}: IAbsenceListProps) => {
	const onFormProcess = (event: any) => {
		event.preventDefault();

		const [startDate, endDate, types, motif] = event.target;
		let startDateValue = startDate.value;
		let endDateValue = endDate.value;
		const typesValue = types.value;
		const motifValue = motif.value;

		// On vérifie que des valeurs on été saisie pour les dates avant de les transformer en ISO
		if (startDateValue && endDateValue) {
			startDateValue = new Date(startDateValue).toISOString();
			endDateValue = new Date(endDateValue).toISOString();
		}

		const newAbsence: IAbsence = {
			startDateISO: startDateValue,
			endDateISO: endDateValue,
			type: typesValue,
			motif: motifValue,
			status: 'INITIALE',
		};

		if (formIsValid(newAbsence, user, holidays, setErrors)) {
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
								{errors.oldDate}
							</p>
							<p className="errors text-danger mx-3">
								{errors.requiredStartDate}
							</p>
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
							<p className="errors text-danger mx-3">
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
								{errors.oldDate}
							</p>
							<p className="errors text-danger mx-3">
								{errors.requiredEndDate}
							</p>
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
						<p className="errors text-danger mx-3">
							{errors.motif}
						</p>
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
