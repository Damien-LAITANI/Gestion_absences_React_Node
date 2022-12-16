import { useState } from 'react';
import HolidayForm from '../HolidayForm/HolidayForm';
import HolidayList from '../HolidayList/HolidayList';

const defaultHoliday = {
	date: '30/10/2020',
	type: 'RTT',
	jour: 'Lundi',
	commentaires: 'Rien',
};

const Holiday = () => {
	const [showHolidayForm, setShowHolidayForm] = useState<Boolean>(false);
	const [holidays, setHolidays] = useState([defaultHoliday, defaultHoliday]);

	return (
		<>
			{showHolidayForm ? (
				<HolidayForm setShowHolidayForm={setShowHolidayForm} />
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
