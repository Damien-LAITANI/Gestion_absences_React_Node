import { useState } from 'react';
import HolidayForm from '../HolidayForm/HolidayForm';
import HolidayList from '../HolidayList/HolidayList';

const defaultHolidays = [
	{
		_id: crypto.randomUUID(),
		date: '2020-11-03',
		type: 'RTT',
		day: 'Lundi',
		motif: 'Rien',
	},
	{
		_id: crypto.randomUUID(),
		date: '2020-12-25',
		type: 'RTT',
		day: 'Marid',
		motif: 'Nada',
	},
];

const Holiday = () => {
	const [showHolidayForm, setShowHolidayForm] = useState<Boolean>(false);
	const [holidays, setHolidays] = useState(defaultHolidays);

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
