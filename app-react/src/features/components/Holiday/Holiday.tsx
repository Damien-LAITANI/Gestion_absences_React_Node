import { useState } from 'react';
import { IHoliday } from '../../../services/InterfacesServices/IHolidayService';
import { IUser } from '../../../services/InterfacesServices/IUserService';
import HolidayForm from '../HolidayForm/HolidayForm';
import HolidayList from '../HolidayList/HolidayList';

interface IHolidaysProps {
	holidays: IHoliday[] | null;
	setHolidays: Function;
	user: IUser;
}
const Holiday = ({ holidays, setHolidays, user }: IHolidaysProps) => {
	const [showHolidayForm, setShowHolidayForm] = useState<Boolean>(false);
	const isAdmin = user.roles.includes('admin');

	return (
		<>
			{showHolidayForm ? (
				<HolidayForm
					setShowHolidayForm={setShowHolidayForm}
					setHolidays={setHolidays}
					holidays={holidays}
				/>
			) : (
				<HolidayList
					holidays={holidays}
					setHolidays={setHolidays}
					setShowHolidayForm={setShowHolidayForm}
					isAdmin={isAdmin}
				/>
			)}
		</>
	);
};

export default Holiday;
