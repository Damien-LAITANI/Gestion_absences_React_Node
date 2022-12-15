import { useState } from 'react';
import AbsenceForm from '../AbsenceForm/AbsenceForm';
import AbsenceList from '../AbsenceList/AbsenceList';

interface IAbsencesProps {
	user: any;
}

const Absences = ({ user }: IAbsencesProps) => {
	const [showAbsenceForm, setShowAbsenceForm] = useState<Boolean>(false);
	return (
		<>
			{showAbsenceForm ? (
				<AbsenceForm
					user={user}
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
