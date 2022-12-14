const AbsenceList = () => {
	return (
		<div className="w-50 d-flex flex-column mx-auto container">
			<h1 className="text-center my-3">Gestion des absences</h1>
			<table className="table table-hover border shadow">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">First</th>
						<th scope="col">Last</th>
						<th scope="col">Handle</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td colSpan={2}>Larry the Bird</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</table>
			<button className="ms-auto" style={{ width: 'fit-content' }}>
				Demander une absence
			</button>
			<p>Soldes des compteurs</p>
			<ul>
				<li>Congés payés : 15</li>
				<li>RTT : 3</li>
			</ul>
		</div>
	);
};

export default AbsenceList;
