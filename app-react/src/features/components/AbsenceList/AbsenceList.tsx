import Cookies from 'js-cookie';
import { useState } from 'react';
import {
	IAbsence,
	IUser,
} from '../../../services/InterfacesServices/IUserService';
import { updateUserToApi } from '../../../services/UserService/UserService';
import AbsenceContainer from '../AbsenceContainer/AbsenceContainer';
import AbsenceModal from '../AbsenceModal/AbsenceModal';

interface IAbsenceListProps {
	setShowAbsenceForm: Function;
	user: IUser;
	setUser: Function;
}

const defaultAbsenceToDelete: IAbsence = {
	startDateISO: '2022-12-12T23:00:00:000Z',
	endDateISO: '2022-12-24T23:00:00:000Z',
	type: 'congé payé',
	motif: 'TEST TEST TEST',
	status: 'EN_ATTENTE_VALIDATION',
};

const AbsenceList = ({
	setShowAbsenceForm,
	user,
	setUser,
}: IAbsenceListProps) => {
	// useEffect(() => {
	// 	user.absences?.map((absence) => (absence._id = crypto.randomUUID()));
	// }, [user]);

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

		const token = Cookies.get('Token');
		updateUserToApi({ ...user, absences: updatedAbsences }, token);
	};

	const [absenceToDelete, setAbsenceToDelete] = useState<IAbsence>(
		defaultAbsenceToDelete
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
						<th scope="col">Motif</th>
						<th scope="col">Statut</th>
						<th scope="col" className="text-center">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{user.absences?.map((absence: IAbsence) => (
						<AbsenceContainer
							key={absence._id}
							user={user}
							setUser={setUser}
							absence={absence}
							setAbsenceToDelete={() => {
								setAbsenceToDelete(absence);
							}}
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
				absenceToDelete={absenceToDelete!}
				deleteAbsence={onDelete}
			/>
		</div>
	);
};

export default AbsenceList;
