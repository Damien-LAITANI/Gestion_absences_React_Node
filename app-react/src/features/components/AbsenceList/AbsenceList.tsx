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
						<th scope="col" className="text-center">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="container align-items-center w-100">
						<td>
							<p className="my-2">30/10/2020</p>
						</td>
						<td>
							<p className="my-2">15/11/2021</p>
						</td>
						<td>
							<p className="my-2">Congé payé</p>
						</td>
						<td>
							<p className="my-2">Validée</p>
						</td>
						<td className="d-flex justify-content-center align-items-center">
							<button
								type="button"
								className="h-75 btn btn-danger"
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
						</td>
					</tr>
				</tbody>
			</table>
			<button
				className="btn btn-info ms-auto"
				style={{ width: 'fit-content' }}
			>
				Demander une absence
			</button>
			<p>Soldes des compteurs</p>
			<ul>
				<li>Congés payés : 15</li>
				<li>RTT : 3</li>
			</ul>

			<AbsenceModal />
		</div>
	);
};

export default AbsenceList;
