import { useState } from 'react';
import HolidayForm from '../HolidayForm/HolidayForm';
import HolidayList from '../HolidayList/HolidayList';

const Holiday = ({ holidays, setHolidays, user }: any) => {
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
