import Cookies from 'js-cookie';
import { useState } from 'react';
import { getJsDate } from '../../../functions/date';
import { deleteHolidayToApi } from '../../../services/HolidayService/HolidayService';
import { IHoliday } from '../../../services/InterfacesServices/IHolidayService';
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
	holidays: IHoliday[] | null;
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
		if (holidays) {
			return holidays
				.filter((holiday) => {
					return getJsDate(holiday.date).getFullYear() === +year;
				})
				.filter((holiday) => {
					//si lutitisateur est un admin on fait rien
					if (isAdmin) {
						return holiday;
					}
					//sinon on garde holiday.status === validee
					else if (holiday.status === 'VALIDEE') {
						return holiday;
					}
				});
		}
	};
	const yearNow = new Date().getFullYear();
	const years = [yearNow - 2, yearNow - 1, yearNow, yearNow + 1];
	const [holidaysToDisplay, setHolidaysToDisplay] = useState(
		getHolidaysToDisplay(yearNow)
	);

	const deleteHoliday = (holidayId: any) => {
		if (holidays) {
			const updatedHolidays = holidays.filter(
				(holiday) => holiday._id !== holidayId
			);
			setHolidays(updatedHolidays);
			const token = Cookies.get('Token');
			deleteHolidayToApi(holidayId, token);
		}
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
					{holidays &&
						holidaysToDisplay?.map((holiday) => (
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
