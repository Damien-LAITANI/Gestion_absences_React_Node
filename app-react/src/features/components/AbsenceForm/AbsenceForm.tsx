import { useNavigate } from 'react-router';
import {
	IAbsence,
	IUser,
} from '../../../services/InterfacesServices/IUserService';
import { updateUserToApi } from '../../../services/UserService/UserService';

interface IAbsenceListProps {
	setShowAbsenceForm: Function;
	setUser: Function;
	user: IUser;
}

const AbsenceForm = ({
	setShowAbsenceForm,
	user,
	setUser,
}: IAbsenceListProps) => {
	const navigate = useNavigate();

	const toggleShowAbsenceForm = () => {
		setShowAbsenceForm(false);
	};

	const createNewAbsence = async (event: any) => {
		event.preventDefault();
		const [startDate, endDate, types, motif] = event.target;
		const startDateValue = startDate.value;
		const endDateValue = endDate.value;
		const typesValue = types.value;
		const motifValue = motif.value;

		const newAbsence: IAbsence = {
			startDate: startDateValue,
			endDate: endDateValue,
			types: typesValue,
			motif: motifValue,
			status: 'INITIALE',
		};

		const updatedUser: IUser = {
			...user,
			absences: [...user.absences, newAbsence],
		};

		const response = await updateUserToApi(updatedUser);

		if (response.status === 200) {
			console.log(updatedUser);
			setUser(response.data);
			toggleShowAbsenceForm();
			navigate('/absences');
		}
	};

	return (
		<div className="w-50 mx-auto">
			<h1 className="text-center my-5">Demande d'absence</h1>
			<form onSubmit={createNewAbsence}>
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

					<button type="reset" className="btn btn-danger">
						Annuler
					</button>
				</ul>
			</form>
		</div>
	);
};

export default AbsenceForm;
