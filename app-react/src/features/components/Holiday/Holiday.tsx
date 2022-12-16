import { useState } from 'react';
import HolidayForm from '../HolidayForm/HolidayForm';
import HolidayList from '../HolidayList/HolidayList';

const Holiday = ({ holidays, setHolidays }: any) => {
	const [showHolidayForm, setShowHolidayForm] = useState<Boolean>(false);

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
				/>
			)}
		</>
	);
};

export default Holiday;
