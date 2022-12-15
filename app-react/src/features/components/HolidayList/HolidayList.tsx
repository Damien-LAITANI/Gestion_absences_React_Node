import { useState } from 'react';
import HolidayEdit from '../HolidayEdit/HolidayEdit';
import HolidayModal from '../HolidayModal/HolidayModal';
import HolidayShow from '../HolidayShow/HolidayShow';

interface IHolidayList {
	setShowHolidayForm: Function;
	holidays: any[];
	setHolidays: Function;
}

const HolidayList = ({
	setShowHolidayForm,
	holidays,
	setHolidays,
}: IHolidayList) => {
	const toggleShowHolidayForm = () => {
		setShowHolidayForm(true);
	};
	const [isEditable, setIsEditable] = useState<Boolean>(false);
	const toggleEdit = () => {
		setIsEditable(!isEditable);
	};

	return (
		<div className="d-flex flex-column mx-auto container">
			<h1 className="text-center my-3">Jours fériés et RTT employeurs</h1>

			<div className="form-floating mb-3">
				<select
					className="form-select"
					aria-label="Floating label select example"
					defaultValue={'2021'}
				>
					<option value="2020">2020</option>
					<option value="2021">2021</option>
					<option value="2022">2022</option>
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
						<th scope="col" className="text-center">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{holidays.map((holiday) => (
						<>
							{isEditable ? (
								<HolidayShow
									holiday={holiday}
									toggleEdit={toggleEdit}
								/>
							) : (
								<HolidayEdit
									holiday={holiday}
									toggleEdit={toggleEdit}
								/>
							)}
						</>
					))}
				</tbody>
			</table>
			<button
				className="btn btn-info ms-auto"
				style={{ width: 'fit-content' }}
				onClick={toggleShowHolidayForm}
			>
				Ajouter un jour férié ou une RTT employeur
			</button>

			<HolidayModal />
		</div>
	);
};

export default HolidayList;
