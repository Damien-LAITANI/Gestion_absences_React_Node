import { useState } from 'react';
import {
	IAbsence,
	IUser,
} from '../../../services/InterfacesServices/IUserService';
import AbsenceEdit from '../AbsenceEdit/AbsenceEdit';
import AbsenceShow from '../AbsenceShow/AbsenceShow';

interface IAbsenceContainer {
	user: IUser;
	setUser: Function;
	absence: IAbsence;
	setAbsenceToDelete: void | React.MouseEventHandler<HTMLButtonElement>;
}

const AbsenceContainer = ({
	user,
	absence,
	setUser,
	setAbsenceToDelete,
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
					user={user}
					setUser={setUser}
					absence={absence}
					toggleEdit={toggleEdit}
					setAbsenceToDelete={setAbsenceToDelete}
				/>
			) : (
				<AbsenceShow
					absence={absence}
					toggleEdit={toggleEdit}
					setAbsenceToDelete={setAbsenceToDelete}
				/>
			)}
		</>
	);
};

export default AbsenceContainer;
