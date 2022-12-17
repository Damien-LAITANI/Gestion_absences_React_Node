import { useEffect, useState } from 'react';
import {
	IAbsence,
	IUser,
} from '../../../services/InterfacesServices/IUserService';
import { updateUserToApi } from '../../../services/UserService/UserService';
import AbsenceContainer from '../AbsenceContainer';
import AbsenceModal from '../AbsenceModal/AbsenceModal';

interface IAbsenceListProps {
	setShowAbsenceForm: Function;
	user: IUser;
	setUser: Function;
}

const AbsenceList = ({
	setShowAbsenceForm,
	user,
	setUser,
}: IAbsenceListProps) => {
	useEffect(() => {
		user.absences.map((absence) => (absence._id = crypto.randomUUID()));
	}, [user]);

	const toggleShowAbsenceForm = () => {
		setShowAbsenceForm(true);
	};

	const onDelete = (absenceID?: string) => {
		const updatedAbsences = user.absences.filter(
			(absence) => absence._id !== absenceID
		);

		const updatedUser = { ...user };
		updatedUser.absences = updatedAbsences;

		setUser(updatedUser);

		updateUserToApi({ ...user, absences: updatedAbsences });
	};

	const defaultAbsenceToDeleteID = '';
	const [absenceToDeleteID, setAbsenceToDeleteID] = useState(
		defaultAbsenceToDeleteID
	);

	return (
		<div className="d-flex flex-column mx-auto container">
			<h1 className="text-center my-3">Gestion des absences</h1>
			<table className="table table-hover border shadow">
				<thead>
					<tr>
						<th scope="col">Date de début</th>
						<th scope="col">Date de fin</th>
						<th scope="col">Type</th>
						<th scope="col">Statut</th>
						<th scope="col" className="text-center">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{user.absences.map((absence: IAbsence) => (
						<AbsenceContainer
							absence={absence}
							setAbsenceToDeleteID={setAbsenceToDeleteID}
						/>
					))}
				</tbody>
			</table>

			<button
				className="btn btn-info ms-auto"
				style={{ width: 'fit-content' }}
				onClick={toggleShowAbsenceForm}
			>
				Demander une absence
			</button>
			<p>Soldes des compteurs</p>
			<ul>
				<li>Congés payés : 15</li>
				<li>RTT : 3</li>
			</ul>

			<AbsenceModal
				absenceToDeleteID={absenceToDeleteID}
				deleteAbsence={onDelete}
			/>
		</div>
	);
};

export default AbsenceList;
