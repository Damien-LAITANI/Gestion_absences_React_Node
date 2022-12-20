import Cookies from 'js-cookie';
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

	const isFormValid = (event: any) => {
		event.preventDefault();
		const [date, type, motif] = event.target;
		const dateValue = date.value;
		const typeValue = type.value;
		const motifValue = motif.value;
		//Tous les champs sont obligatoires
		if (!typeValue || !motifValue || !dateValue) {
			console.log('Tous les champs sont obligatoires');
			return false;
		}
		const day = new Date(dateValue);
		const options: any = { weekday: 'long' };
		const jour = new Intl.DateTimeFormat('fr-FR', options).format(day);
		//Un jour férié, ou RTT employeur, ne peut pas être saisi dans le passé
		if (day.valueOf() < Date.now()) {
			console.log(
				'Un jour férié, ou RTT employeur, ne peut pas être saisi dans le passé'
			);
			return false;
		}
		//Il est interdit de saisir un jour férié ou RTT employeur à la même date qu'un autre jour férié
		for (let holiday of holidays) {
			if (new Date(holiday.date).valueOf() === day.valueOf()) {
				console.log(
					"Il est interdit de saisir un jour férié ou RTT employeur à la même date qu'un autre jour férié"
				);
				return false;
			}
		}
		//Il est interdit de saisir une RTT employeur un samedi ou un dimanche
		if (
			(jour === 'samedi' && typeValue === 'RTT employeur') ||
			(jour === 'dimanche' && typeValue === 'RTT employeur')
		) {
			console.log(
				'Il est interdit de saisir une RTT employeur un samedi ou un dimanche'
			);
			return false;
		}
		//Les RTT employeurs ne peuvent pas dépasser 5 par année
		let count = 0;
		for (let holiday of holidays) {
			if (
				holiday.type === 'RTT employeur' &&
				day.getFullYear() ===
					new Date(holiday.date.split('T')[0]).getFullYear()
			) {
				count++;
			}
		}
		if (typeValue === 'RTT employeur' && count > 4) {
			console.log(
				'Les RTT employeurs ne peuvent pas dépasser 5 par année'
			);
			return false;
		}
		console.log(new Date(holidays[0].date.split('T')[0]).getFullYear());
		//Traiter le formulaire
		persistHolidayForm(event);
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
		const token = Cookies.get('Token');
		const response = await postHolidayToApi(newHoliday, token);

		console.log(response.data);
		const id = response.data._id;
		const newHolidayWithId = { _id: id, ...newHoliday };
		setHolidays([...holidays, newHolidayWithId]);
		toggleShowHolidayForm();
	};

	return (
		<div className="w-50 mx-auto">
			<h1 className="text-center my-5">
				Ajout d'un jour férié ou d'une RTT employeur
			</h1>
			<form onSubmit={isFormValid}>
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
