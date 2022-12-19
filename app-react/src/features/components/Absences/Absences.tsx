import { useState } from 'react';
import { IHoliday } from '../../../services/InterfacesServices/IHolidayService';
import { IUser } from '../../../services/InterfacesServices/IUserService';
import AbsenceForm from '../AbsenceForm/AbsenceForm';
import AbsenceList from '../AbsenceList/AbsenceList';

interface IAbsencesProps {
	user: IUser;
	setUser: Function;
	holidays: IHoliday[];
}

const Absences = ({ user, setUser, holidays }: IAbsencesProps) => {
	const [showAbsenceForm, setShowAbsenceForm] = useState<Boolean>(false);
	return (
		<>
			{showAbsenceForm ? (
				<AbsenceForm
					user={user}
					setUser={setUser}
					setShowAbsenceForm={setShowAbsenceForm}
					holidays={holidays}
				/>
			) : (
				<AbsenceList
					user={user}
					setUser={setUser}
					setShowAbsenceForm={setShowAbsenceForm}
				/>
			)}
		</>
	);
};

export default Absences;
