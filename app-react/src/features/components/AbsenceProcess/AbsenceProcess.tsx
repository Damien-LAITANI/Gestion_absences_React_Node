interface IAbsenceProcessProps {
	user: any;
}

const AbsenceProcess = ({ user }: IAbsenceProcessProps) => {
	const getFilteredAbsences = () =>
		user.absences.filter(
			(absence: any) => absence.status === 'EN_ATTENTE_VALIDATION'
		);
	return (
		<div className="w-50 d-flex flex-column mx-auto container">
			<h1 className="text-center my-3">Validation des demandes</h1>
			<table className="table table-hover border shadow">
				<thead>
					<tr>
						<th scope="col">Date de début</th>
						<th scope="col">Date de fin</th>
						<th scope="col">Type</th>
						<th scope="col">Nom</th>
						<th scope="col" className="text-center">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{getFilteredAbsences().map((absence: any) => {
						console.log(absence.startDate);
						return (
							<tr
								className="container align-items-center w-100"
								key={crypto.randomUUID()}
							>
								<td>
									<p className="my-2">
										{new Date(
											absence.startDate
										).toLocaleDateString()}
									</p>
								</td>
								<td>
									<p className="my-2">
										{new Date(
											absence.endDate
										).toLocaleDateString()}
									</p>
								</td>
								<td>
									<p className="my-2">{absence.type}</p>
								</td>
								<td>
									<p className="my-2">{absence.status}</p>
								</td>
								<td className="d-flex justify-content-center align-items-center">
									<ul className="m-0 p-0 d-inline text-center">
										<li className="d-inline-block me-1">
											<button
												type="button"
												className="btn btn-warning"
												data-bs-toggle="modal"
												data-bs-target="#deleteAbsence"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													className="bi bi-pencil"
													viewBox="0 0 16 16"
												>
													<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
												</svg>
											</button>
										</li>
										<li className="d-inline-block">
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
										</li>
									</ul>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default AbsenceProcess;
