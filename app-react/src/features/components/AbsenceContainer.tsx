import { useState } from 'react';
import { IAbsence } from '../../services/InterfacesServices/IUserService';
import AbsenceEdit from './AbsenceEdit/AbsenceEdit';
import AbsenceShow from './AbsenceShow/AbsenceShow';

interface IAbsenceContainer {
	absence: IAbsence;
	setAbsenceToDeleteID: Function;
}

const AbsenceContainer = ({
	absence,
	setAbsenceToDeleteID,
}: IAbsenceContainer) => {
	const [isEditable, setIsEditable] = useState<Boolean>(false);
	const toggleEdit = () => {
		setIsEditable(!isEditable);
	};
	return (
		<>
			{' '}
			{isEditable ? (
				<AbsenceEdit
					absence={absence}
					toggleEdit={toggleEdit}
					setAbsenceToDeleteID={setAbsenceToDeleteID}
				/>
			) : (
				<AbsenceShow
					absence={absence}
					toggleEdit={toggleEdit}
					setAbsenceToDeleteID={setAbsenceToDeleteID}
				/>
			)}
		</>
	);
};

export default AbsenceContainer;
