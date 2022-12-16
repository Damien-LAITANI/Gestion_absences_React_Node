import { useState } from 'react';
import { IUser } from '../../../services/InterfacesServices/IUserService';
import AbsenceForm from '../AbsenceForm/AbsenceForm';
import AbsenceList from '../AbsenceList/AbsenceList';

interface IAbsencesProps {
	user: IUser;
	setUser: Function;
}

const Absences = ({ user, setUser }: IAbsencesProps) => {
	const [showAbsenceForm, setShowAbsenceForm] = useState<Boolean>(false);
	return (
		<>
			{showAbsenceForm ? (
				<AbsenceForm
					user={user}
					setUser={setUser}
					setShowAbsenceForm={setShowAbsenceForm}
				/>
			) : (
				<AbsenceList
					user={user}
					setShowAbsenceForm={setShowAbsenceForm}
				/>
			)}
		</>
	);
};

export default Absences;
