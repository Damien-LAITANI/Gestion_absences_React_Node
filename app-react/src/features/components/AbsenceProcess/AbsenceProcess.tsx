import {
	IAbsence,
	IUser,
} from '../../../services/InterfacesServices/IUserService';
import { updateUserToApi } from '../../../services/UserService/UserService';

interface IAbsenceProcessProps {
	employees: IUser[];
	setEmployees: Function;
}

const AbsenceProcess = ({ employees, setEmployees }: IAbsenceProcessProps) => {
	const onValidated = (id: string, employee: IUser) => {
		const updatedEmployee = { ...employee };
		const updatedAbsences = updatedEmployee.absences;
		updatedAbsences.map((absence) => {
			if (absence._id !== id) return absence;
			else {
				absence.status = 'VALIDEE';
				return absence;
			}
		});
		updatedEmployee.absences = updatedAbsences;
		const updatedEmployees = [...employees];
		updatedEmployees.map((e) => {
			if (e._id !== employee._id) return e;
			else {
				return updatedEmployee;
			}
		});
		updateUserToApi(updatedEmployee);
		setEmployees(updatedEmployees);
	};

	const onRejected = (id: string, employee: IUser) => {
		const updatedEmployee = { ...employee };
		const updatedAbsences = updatedEmployee.absences;
		updatedAbsences.map((absence) => {
			if (absence._id !== id) return absence;
			else {
				absence.status = 'REJETEE';
				return absence;
			}
		});
		updatedEmployee.absences = updatedAbsences;
		const updatedEmployees = [...employees];
		updatedEmployees.map((e) => {
			if (e._id !== employee._id) return e;
			else {
				return updatedEmployee;
			}
		});
		updateUserToApi(updatedEmployee);
		setEmployees(updatedEmployees);
	};

	const getFilteredAbsences = (employee: IUser) => {
		let filteredAbsences: any[] = employee.absences?.filter(
			(absence: any) => absence.status === 'EN_ATTENTE_VALIDATION'
		);
		return filteredAbsences;
	};

	return (
		<div className="d-flex flex-column mx-auto container">
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
					{employees?.map((employee: any) => {
						return getFilteredAbsences(employee)?.map((absence) => {
							return (
								<tr
									className="container align-items-center w-100"
									key={absence._id}
								>
									<td>
										<p className="my-2">
											{new Date(
												absence.startDateISO
											).toLocaleDateString()}
										</p>
									</td>
									<td>
										<p className="my-2">
											{new Date(
												absence.endDateISO
											).toLocaleDateString()}
										</p>
									</td>
									<td>
										<p className="my-2">{absence.type}</p>
									</td>
									<td>
										<p className="my-2">
											{employee.lastname}{' '}
											{employee.firstname}
										</p>
									</td>
									<td className="d-flex justify-content-center align-items-center">
										<ul className="m-0 p-0 d-inline text-center">
											<li className="d-inline-block me-1">
												<button
													type="button"
													className="btn btn-success"
													onClick={() =>
														onValidated(
															absence._id,
															employee
														)
													}
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
													onClick={() =>
														onRejected(
															absence._id,
															employee
														)
													}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-x"
														viewBox="0 0 16 16"
													>
														<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
													</svg>
												</button>
											</li>
										</ul>
									</td>
								</tr>
							);
						});
					})}
				</tbody>
			</table>
		</div>
	);
};

export default AbsenceProcess;
