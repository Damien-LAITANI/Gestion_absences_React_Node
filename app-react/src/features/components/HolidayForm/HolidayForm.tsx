import { postHolidayToApi } from '../../../services/HolidayService/HolidayService';

export interface IHolidayFormProps {
	setShowHolidayForm: Function;
	setHolidays: Function;
	holidays: any;
}

const HolidayForm = ({
	setShowHolidayForm,
	setHolidays,
	holidays,
}: IHolidayFormProps) => {
	const toggleShowHolidayForm = () => {
		setShowHolidayForm(false);
	};

	const persistHolidayForm = async (event: any) => {
		event.preventDefault();
		const [date, type, motif] = event.target;
		const dateValue = date.value;
		const typeValue = type.value;
		const motifValue = motif.value;
		const day = new Date(dateValue);
		const options: any = { weekday: 'long' };
		const newHoliday = {
			date: dateValue,
			jour: new Intl.DateTimeFormat('fr-FR', options).format(day),
			type: typeValue,
			motif: motifValue,
			status: 'INITIALE',
		};
		//save dataBase and get id
		const response = await postHolidayToApi(newHoliday);

		console.log(response.data);
		const id = response.data._id;
		const newHolidayWithId = { _id: id, ...newHoliday };
		setHolidays([...holidays, newHolidayWithId]);
		toggleShowHolidayForm();
	};

	return (
		<div className="w-50 mx-auto">
			<h1 className="text-center my-5">Demande d'absence</h1>
			<form onSubmit={persistHolidayForm}>
				<div className="form-floating mb-3">
					<input
						type="date"
						className="form-control"
						id="date"
						name="date"
					/>
					<label htmlFor="date">Date</label>
				</div>

				<div className="form-floating mb-3">
					<select
						id="type"
						name="type"
						className="form-select"
						aria-label="Floating label select example"
					>
						<option value="Férié">Férié</option>
						<option value="RTT employeur">RTT employeur</option>
					</select>
					<label>Type</label>
				</div>

				<div className="form-floating mb-3">
					<textarea
						className="form-control"
						name="motif"
						rows={5}
						placeholder=""
						id="motif"
						style={{ height: '150px' }}
					></textarea>
					<label htmlFor="motif">Motif</label>
				</div>

				<ul className="p-0 text-center mt-3">
					<button type="submit" className="btn btn-success me-5">
						Valider
					</button>

					<button
						type="reset"
						className="btn btn-danger"
						onClick={toggleShowHolidayForm}
					>
						Annuler
					</button>
				</ul>
			</form>
		</div>
	);
};

export default HolidayForm;
