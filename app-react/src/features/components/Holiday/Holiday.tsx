import { useState } from 'react';
import HolidayForm from '../HolidayForm/HolidayForm';
import HolidayList from '../HolidayList/HolidayList';

const Holiday = () => {
	const [showHolidayForm, setShowHolidayForm] = useState<Boolean>(false);
	return (
		<>
			{showHolidayForm ? (
				<HolidayForm setShowHolidayForm={setShowHolidayForm} />
			) : (
				<HolidayList setShowHolidayForm={setShowHolidayForm} />
			)}
		</>
	);
};

export default Holiday;
