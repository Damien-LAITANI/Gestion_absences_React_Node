import { useState } from 'react';
import HolidayEdit from '../HolidayEdit/HolidayEdit';
import HolidayShow from '../HolidayShow/HolidayShow';

const HolidayContainer = ({ holiday }: any) => {
	const [isEditable, setIsEditable] = useState<Boolean>(false);
	const toggleEdit = () => {
		setIsEditable(!isEditable);
	};
	return (
		<>
			{!isEditable ? (
				<HolidayShow holiday={holiday} toggleEdit={toggleEdit} />
			) : (
				<HolidayEdit holiday={holiday} toggleEdit={toggleEdit} />
			)}
		</>
	);
};

export default HolidayContainer;
