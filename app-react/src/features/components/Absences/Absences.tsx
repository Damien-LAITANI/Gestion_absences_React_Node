import { useState } from 'react';
import { IHoliday } from '../../../services/InterfacesServices/IHolidayService';
import { IUser } from '../../../services/InterfacesServices/IUserService';
import AbsenceForm from '../AbsenceForm/AbsenceForm';
import AbsenceList from '../AbsenceList/AbsenceList';

interface IAbsencesProps {
	user: IUser;
	setUser: Function;
	holidays: IHoliday[] | null;
}

const Absences = ({ user, setUser, holidays }: IAbsencesProps) => {
	const [showAbsenceForm, setShowAbsenceForm] = useState<Boolean>(false);

	const toggleShowAbsenceForm = () => {
		setShowAbsenceForm(!showAbsenceForm);
	};

	return (
		<>
			{showAbsenceForm ? (
				<AbsenceForm
					user={user}
					setUser={setUser}
					setShowAbsenceForm={setShowAbsenceForm}
					holidays={holidays}
					toggleShowAbsenceForm={toggleShowAbsenceForm}
				/>
			) : (
				<AbsenceList
					user={user}
					setUser={setUser}
					setShowAbsenceForm={setShowAbsenceForm}
					toggleShowAbsenceForm={toggleShowAbsenceForm}
				/>
			)}
		</>
	);
};

export default Absences;
