import HolidayContainer from '../HolidayContainer/HolidayContainer';
import HolidayModal from '../HolidayModal/HolidayModal';

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
						<HolidayContainer key={holiday._id} holiday={holiday} />
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
