const AbsenceForm = () => {
	return (
		<>
			<h1>Demande d'absence</h1>
			<form>
				<div className="mb-3">
					<label htmlFor="startDate" className="form-label">
						Date de début
					</label>
					<input
						type="date"
						className="form-control"
						id="startDate"
						name="startDate"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="endDate" className="form-label">
						Date de fin
					</label>
					<input
						type="date"
						className="form-control"
						id="endDate"
						name="endDate"
					/>
				</div>
				<select className="form-select">
					<option selected>Type de congé</option>
					<option value="congé payé">Congé payé</option>
					<option value="RTT">RTT</option>
					<option value="congé sans solde">Congé sans solde</option>
				</select>
				<label htmlFor="motif" className="form-label">
					Motif
				</label>
				<textarea
					name="motif"
					id="motif"
					cols={30}
					rows={10}
				></textarea>
				<button type="submit" className="btn btn-success">
					Valider
				</button>
				<button type="reset" className="btn btn-danger">
					Annuler
				</button>
			</form>
		</>
	);
};

export default AbsenceForm;
