import { useState } from 'react';
import { IHoliday } from '../../../services/InterfacesServices/IHolidayService';
import { IUser } from '../../../services/InterfacesServices/IUserService';
import HolidayForm from '../HolidayForm/HolidayForm';
import HolidayList from '../HolidayList/HolidayList';

interface IHolidaysProps {
	holidays: IHoliday[] | null;
	setHolidays: Function;
	user: IUser;
	errors: any;
	setErrors: Function;
}
const Holiday = ({
	holidays,
	setHolidays,
	user,
	errors,
	setErrors,
}: IHolidaysProps) => {
	const [showHolidayForm, setShowHolidayForm] = useState<Boolean>(false);
	const isAdmin = user.roles.includes('admin');

	return (
		<>
			{showHolidayForm ? (
				<HolidayForm
					setShowHolidayForm={setShowHolidayForm}
					setHolidays={setHolidays}
					holidays={holidays}
					errors={errors}
					setErrors={setErrors}
				/>
			) : (
				<HolidayList
					holidays={holidays}
					setHolidays={setHolidays}
					setShowHolidayForm={setShowHolidayForm}
					isAdmin={isAdmin}
					errors={errors}
					setErrors={setErrors}
				/>
			)}
		</>
	);
};

export default Holiday;
