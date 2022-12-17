import { MouseEventHandler } from 'react';
import { IAbsence } from '../../../services/InterfacesServices/IUserService';

interface IAbsenceEdit {
	absence: IAbsence;
	toggleEdit: MouseEventHandler;
	setAbsenceToDeleteID: Function;
}

const AbsenceEdit = ({
	absence,
	toggleEdit,
	setAbsenceToDeleteID,
}: IAbsenceEdit) => {
	const setDate = (dateToUpdate: Date) => {
		const date = new Date(dateToUpdate);
		return (
			date.toLocaleDateString('fr-FR', { year: 'numeric' }) +
			'-' +
			date.toLocaleDateString('fr-FR', { month: 'numeric' }) +
			'-' +
			date.toLocaleDateString('fr-FR', { day: 'numeric' })
		).toString();
	};

	const updateAbsence = () => {
		const startDateInput: any = document.querySelectorAll('#startDate');
		const endDateInput: any = document.querySelectorAll('#endDate');
		const updateTypeInput: React.DetailedHTMLProps<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			HTMLSelectElement
		> = document.querySelector('#type') as React.DetailedHTMLProps<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			HTMLSelectElement
		>;
		const updateMotifInput: React.DetailedHTMLProps<
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		> = document.querySelector('#motif') as React.DetailedHTMLProps<
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		>;
		if (
			startDateInput.value &&
			endDateInput.value &&
			updateTypeInput.value
		) {
			const startDate = new Date(startDateInput.value);
			const options: any = { weekday: 'long' };

			const updatedHoliday = {
				_id: absence._id,
				startDate: startDateInput.value,
				endDate: endDateInput.value,
				type: updateTypeInput.value,
				status: absence.status,
				motif: updateMotifInput.value,
			};
			//update bd
			//console.log(newHoliday);
			const updatedHolidays = absences.map((absence: any) => {
				if (holiday._id !== updatedHoliday._id) {
					return holiday;
				} else {
					return updatedHoliday;
				}
			});
			setHolidays(updatedHolidays);
		}
		toggleEdit();
	};

	return (
		<tr className="">
			<td className="form-floating align-middle">
				<input
					defaultValue={setDate(absence.startDate)}
					name="startDate"
					id="startDate"
					type="date"
					className="d-inline form-control"
				/>
				<label htmlFor="startDate">Date de début</label>
			</td>

			<td className="form-floating align-middle">
				<input
					defaultValue={setDate(absence.endDate)}
					name="endDate"
					id="endDate"
					type="date"
					className="d-inline form-control"
				/>
				<label htmlFor="endDate">Date de fin</label>
			</td>

			<td className="form-floating align-middle">
				<select
					defaultValue={absence.types}
					name="type"
					id="type"
					className="form-select"
					aria-label="Floating label select example"
				>
					<option value="congé payé">Congé payé</option>
					<option value="RTT">RTT</option>
					<option value="congé sans solde">Congé sans solde</option>
				</select>
				<label htmlFor="type">Type</label>
			</td>

			<td className="form-floating align-middle">
				<p className="my-2">{absence.status}</p>
			</td>

			<td className="align-middle">
				<ul className="h-100 w-100 m-0 p-0 text-center">
					<li className="d-inline-block me-2">
						<button
							onClick={toggleEdit}
							type="button"
							className="btn btn-success"
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

export default AbsenceEdit;
