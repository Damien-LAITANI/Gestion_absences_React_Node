interface IAbsenceListProps {
	setShowAbsenceForm: Function;
	user: any;
}

const AbsenceForm = ({ setShowAbsenceForm }: IAbsenceListProps) => {
	const toggleShowAbsenceForm = () => {
		setShowAbsenceForm(false);
	};

	return (
		<div className="w-50 mx-auto">
			<h1 className="text-center my-5">Demande d'absence</h1>
			<form>
				<div className="form-floating mb-3">
					<input
						type="date"
						className="form-control"
						id="startDate"
						name="startDate"
					/>
					<label htmlFor="startDate">Date de début</label>
				</div>

				<div className="form-floating mb-3">
					<input
						type="date"
						className="form-control"
						id="endDate"
						name="endDate"
					/>
					<label htmlFor="endDate">Date de fin</label>
				</div>

				<div className="form-floating mb-3">
					<select
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
					<button
						type="submit"
						className="btn btn-success me-5"
						onClick={toggleShowAbsenceForm}
					>
						Valider
					</button>

					<button
						type="reset"
						className="btn btn-danger"
						onClick={toggleShowAbsenceForm}
					>
						Annuler
					</button>
				</ul>
			</form>
		</div>
	);
};

export default AbsenceForm;
