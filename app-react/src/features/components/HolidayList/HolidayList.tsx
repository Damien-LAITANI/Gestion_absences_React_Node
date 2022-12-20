import Cookies from 'js-cookie';
import { useState } from 'react';
import { deleteHolidayToApi } from '../../../services/HolidayService/HolidayService';
import HolidayContainer from '../HolidayContainer/HolidayContainer';
import HolidayModal from '../HolidayModal/HolidayModal';

const defaultHolidayToDelete = {
	_id: crypto.randomUUID(),
	date: '2022-12-12T23:00:00:000Z',
	type: 'Férié',
	jour: 'Lundi',
	motif: 'Rien',
	status: 'INITIALE',
};

interface IHolidayList {
	setShowHolidayForm: Function;
	holidays: any[];
	setHolidays: Function;
	isAdmin: Boolean;
}

const HolidayList = ({
	setShowHolidayForm,
	holidays,
	setHolidays,
	isAdmin,
}: IHolidayList) => {
	const toggleShowHolidayForm = () => {
		setShowHolidayForm(true);
	};

	const [holidayToDelete, setHolidayToDelete] = useState<any>(
		defaultHolidayToDelete
	);
	const getHolidaysToDisplay = (year: number) => {
		return holidays.filter((holiday) => {
			return new Date(holiday.date.split('T')[0]).getFullYear() === +year;
		});
	};
	const yearNow = new Date().getFullYear();
	const years = [yearNow - 2, yearNow - 1, yearNow, yearNow + 1];
	const [holidaysToDisplay, setHolidaysToDisplay] = useState(
		getHolidaysToDisplay(yearNow)
	);

	const deleteHoliday = (holidayId: any) => {
		const updatedHolidays = holidays.filter(
			(holiday) => holiday._id !== holidayId
		);
		setHolidays(updatedHolidays);
		const token = Cookies.get('Token');
		deleteHolidayToApi(holidayId, token);
	};

	const onChangeYear = (event: any) => {
		console.log(event.target.value);
		const newYear = +event.target.value;
		setHolidaysToDisplay(getHolidaysToDisplay(newYear));
	};

	return (
		<div className="d-flex flex-column mx-auto container">
			<h1 className="text-center my-3">Jours fériés et RTT employeurs</h1>

			<div className="form-floating mb-3">
				<select
					className="form-select"
					aria-label="Floating label select example"
					defaultValue={yearNow}
					onChange={onChangeYear}
				>
					{years.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
				<label>Année</label>
			</div>

			<table className="table table-hover border shadow">
				<thead>
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Type</th>
						<th scope="col">Jour</th>
						<th scope="col">Commentaires</th>
						{isAdmin && (
							<th scope="col" className="text-center">
								Actions
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{holidaysToDisplay.map((holiday) => (
						<HolidayContainer
							key={holiday._id}
							holiday={holiday}
							setHolidays={setHolidays}
							holidays={holidays}
							setHolidayToDelete={setHolidayToDelete}
							isAdmin={isAdmin}
						/>
					))}
				</tbody>
			</table>
			{isAdmin && (
				<button
					className="btn btn-info ms-auto"
					style={{ width: 'fit-content' }}
					onClick={toggleShowHolidayForm}
				>
					Ajouter un jour férié ou une RTT employeur
				</button>
			)}
			<HolidayModal
				holidayToDelete={holidayToDelete}
				deleteHoliday={deleteHoliday}
			/>
		</div>
	);
};

export default HolidayList;
