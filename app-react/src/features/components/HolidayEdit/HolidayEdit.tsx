import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { updateHolidayToApi } from '../../../services/HolidayService/HolidayService';

export interface IHolidayEditProps {
	holiday: any;
	toggleEdit: Function;
	setHolidays: Function;
	holidays: any;
	setHolidaysToDisplay: Function;
}

const HolidayEdit = ({
	holiday,
	toggleEdit,
	setHolidays,
	holidays,
	setHolidaysToDisplay,
}: IHolidayEditProps) => {
	const [errorDateIsRequired, setErrorDateIsRequired] = useState(false);
	const [errorTypeIsRequired, setErrorTypeIsRequired] = useState(false);
	const [errorMotifIsRequired, setErrorMotifIsRequired] = useState(false);

	const navigate = useNavigate();

	const onSubmit = () => {
		// Il n'est pas possible de modifier une RTT employeur VALIDEE
		if (holiday.status === 'VALIDEE') {
			console.log(
				"Il n'est pas possible de modifier une RTT employeur VALIDEE"
			);
			return false;
		}

		console.clear();
		console.log(123);

		setErrorDateIsRequired(false);
		setErrorTypeIsRequired(false);
		setErrorMotifIsRequired(false);

		const newDateInput: any = document.querySelector('#date');
		const newTypeInput: React.DetailedHTMLProps<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			HTMLSelectElement
		> = document.querySelector('#type') as React.DetailedHTMLProps<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			HTMLSelectElement
		>;
		const newMotifInput: React.DetailedHTMLProps<
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		> = document.querySelector('#motif') as React.DetailedHTMLProps<
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		>;

		const date = newDateInput.value;
		if (!date || date === '') setErrorDateIsRequired(true);

		const newDay = new Date(newDateInput.value);
		const options: any = { weekday: 'long' };
		const updatedHoliday = {
			_id: holiday._id,
			date: newDateInput.value,
			type: newTypeInput.value,
			jour: new Intl.DateTimeFormat('fr-FR', options).format(newDay),
			motif: newMotifInput.value,
			status: 'INITIALE',
		};

		if (!updatedHoliday.motif || updatedHoliday.motif === '')
			setErrorMotifIsRequired(true);

		// * Règles métier
		//Tous les champs sont obligatoires
		if (
			!updatedHoliday.type ||
			!updatedHoliday.motif ||
			!updatedHoliday.date
		) {
			console.log('Tous les champs sont obligatoires');
			return false;
		}

		//Un jour férié, ou RTT employeur, ne peut pas être saisi dans le passé
		if (new Date(updatedHoliday.date) < new Date()) {
			console.log(
				'Un jour férié, ou RTT employeur, ne peut pas être saisi dans le passé'
			);
			return false;
		}
		//Il est interdit de saisir un jour férié ou RTT employeur à la même date qu'un autre jour férié
		for (let holiday of holidays) {
			if (holiday._id !== updatedHoliday._id) {
				if (
					new Date(holiday.date).valueOf() ===
					new Date(updatedHoliday.date).valueOf()
				) {
					console.log(
						"Il est interdit de saisir un jour férié ou RTT employeur à la même date qu'un autre jour férié"
					);
					return false;
				}
			}
		}
		//Il est interdit de saisir une RTT employeur un samedi ou un dimanche
		if (
			(updatedHoliday.jour === 'samedi' &&
				updatedHoliday.type === 'RTT employeur') ||
			(updatedHoliday.jour === 'dimanche' &&
				updatedHoliday.type === 'RTT employeur')
		) {
			console.log(
				'Il est interdit de saisir une RTT employeur un samedi ou un dimanche'
			);
			return false;
		}
		//Les RTT employeurs ne peuvent pas dépasser 5 par année
		let count = 0;
		for (let holiday of holidays) {
			if (holiday._id !== updatedHoliday._id) {
				if (
					holiday.type === 'RTT employeur' &&
					new Date(updatedHoliday.date).getFullYear() ===
						new Date(holiday.date.split('T')[0]).getFullYear()
				) {
					count++;
				}
			}
		}
		if (updatedHoliday.type === 'RTT employeur' && count > 4) {
			console.log(
				'Les RTT employeurs ne peuvent pas dépasser 5 par année'
			);
			return false;
		}
		// console.log(new Date(holidays[0].date.split('T')[0]).getFullYear());
		//Traiter le formulaire
		updateHoliday(updatedHoliday);
	};
	const updateHoliday = (updatedHoliday: any) => {
		const token = Cookies.get('Token');
		updateHolidayToApi(updatedHoliday, token);
		console.log(updatedHoliday);
		const updatedHolidays = holidays.map((holiday: any) => {
			if (holiday._id !== updatedHoliday._id) {
				return holiday;
			} else {
				return updatedHoliday;
			}
		});
		setHolidays(updatedHolidays);
		setHolidaysToDisplay(updatedHolidays);

		toggleEdit();
		// eslint-disable-next-line react-hooks/rules-of-hooks
		//navigate('/holiday');
		window.location.reload();
	};

	const setDate = (dateToUpdate: string) => {
		console.log(dateToUpdate);

		const date = new Date(dateToUpdate);
		console.log(date);

		return dateToUpdate.split('T')[0];
	};

	return (
		<tr className="">
			<td className="form-floating align-middle">
				<input
					defaultValue={setDate(holiday.date)}
					name="date"
					id="date"
					type="date"
					className="d-inline form-control"
				/>
				<label htmlFor="date">Date</label>
				{errorDateIsRequired && (
					<p className="errors text-danger mx-3">
						La date est requise
					</p>
				)}
			</td>

			<td className="form-floating align-middle">
				<select
					defaultValue={holiday.type}
					name="type"
					id="type"
					className="form-select"
					aria-label="Floating label select example"
				>
					<option value="Férié">Férié</option>
					<option value="RTT employeur">RTT employeur</option>
				</select>
				<label htmlFor="type">Type</label>
				{errorTypeIsRequired && (
					<p className="errors text-danger mx-3">
						La type est requis
					</p>
				)}
			</td>

			<td className="form-floating align-middle"></td>

			<td className="form-floating align-middle">
				<textarea
					defaultValue={holiday.motif}
					name="motif"
					id="motif"
					className="d-inline form-control"
				/>
				<label htmlFor="motif">Motif</label>
				{errorMotifIsRequired && (
					<p className="errors text-danger mx-3">
						Le motif est requis
					</p>
				)}
			</td>

			<td className="align-middle">
				<ul className="h-100 w-100 m-0 p-0 text-center">
					<li className="d-inline-block me-2">
						<button
							type="button"
							className="btn btn-success"
							onClick={onSubmit}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-check2"
								viewBox="0 0 16 16"
							>
								<path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
							</svg>
						</button>
					</li>
					<li className="d-inline-block">
						<button
							type="button"
							className="btn btn-danger"
							data-bs-toggle="modal"
							data-bs-target="#deleteAbsence"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-trash3"
								viewBox="0 0 16 16"
							>
								<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
							</svg>
						</button>
					</li>
				</ul>
			</td>
		</tr>
	);
};

export default HolidayEdit;
