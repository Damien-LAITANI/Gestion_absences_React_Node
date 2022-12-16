import { useState } from 'react';
import HolidayForm from '../HolidayForm/HolidayForm';
import HolidayList from '../HolidayList/HolidayList';

const defaultHolidays = [
	{
		id: crypto.randomUUID,
		date: '30/10/2020',
		type: 'RTT',
		jour: 'Lundi',
		commentaires: 'Rien',
	},
	{
		id: crypto.randomUUID,
		date: '03/11/2019',
		type: 'RTT',
		jour: 'Marid',
		commentaires: 'Nada',
	},
];

const Holiday = () => {
	const [showHolidayForm, setShowHolidayForm] = useState<Boolean>(false);
	const [holidays, setHolidays] = useState(defaultHolidays);

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
