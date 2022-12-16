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

	const persistHolidayForm = (event: any) => {
		event.preventDefault();
		const [date, type, motif] = event.target;
		const dateValue = date.value;
		const typeValue = type.value;
		const motifValue = motif.value;
		const day = new Date(dateValue);
		const options: any = { weekday: 'long' };
		const newHoliday = {
			date: dateValue,
			day: new Intl.DateTimeFormat('fr-FR', options).format(day),
			type: typeValue,
			motif: motifValue,
		};
		//save dataBase and get id
		const id = crypto.randomUUID();
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
					<label htmlFor="date">Date de début</label>
				</div>

				<div className="form-floating mb-3">
					<select
						id="type"
						name="type"
						className="form-select"
						aria-label="Floating label select example"
					>
						<option value="congé payé">Congé payé</option>
						<option value="RTT">RTT</option>
						<option value="congé sans solde">
							Congé sans solde
						</option>
					</select>
					<label>Type de congé</label>
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
