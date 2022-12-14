import AbsenceModal from '../AbsenceModal/AbsenceModal';
const AbsenceList = () => {
	return (
		<div className="w-50 d-flex flex-column mx-auto container">
			<h1 className="text-center my-3">Gestion des absences</h1>
			<table className="table table-hover border shadow">
				<thead>
					<tr>
						<th scope="col">Date de début</th>
						<th scope="col">Date de fin</th>
						<th scope="col">Type</th>
						<th scope="col">Statut</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
				</tbody>
			</table>
			<button
				className="btn btn-info"
				className="ms-auto"
				style={{ width: 'fit-content' }}
			>
				Demander une absence
			</button>
			<p>Soldes des compteurs</p>
			<ul>
				<li>Congés payés : 15</li>
				<li>RTT : 3</li>
			</ul>
			{/* <button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#deleteAbsence"
			>
				Launch demo modal
			</button> */}
			<AbsenceModal />
		</div>
	);
};

export default AbsenceList;
