import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AbsenceProcess from './features/components/AbsenceProcess/AbsenceProcess';
import Absences from './features/components/Absences/Absences';
import Holiday from './features/components/Holiday/Holiday';
import Login from './features/components/Login/Login';
import Planning from './features/components/Planning/Planning';
import ReportList from './features/components/ReportList/ReportList';
import { login } from './services/ConnectService/connectService';
import { getAllHolidayFromAPI } from './services/HolidayService/HolidayService';
import { IHoliday } from './services/InterfacesServices/IHolidayService';
import { IAbsence, IUser } from './services/InterfacesServices/IUserService';

import {
	deleteUserToApi,
	getAllEmployeeFromAPI,
	getAllUserFromAPI,
	getUserFromApi,
	postUserToApi,
	updateUserToApi,
} from './services/UserService/UserService';

const defaultHolidays: IHoliday[] = [
	{
		date: new Date('2020-11-03'),
		type: 'RTT employeur',
		jour: 'Lundi',
		motif: 'Rien',
		status: 'INITIALE',
	},
	{
		date: new Date('2020-12-25'),
		type: 'Férié',
		jour: 'Mardi',
		motif: 'Nada',
		status: 'VALIDEE',
	},
];

const defaultAbsences: IAbsence[] = [
	{
		startDateISO: '2022-12-12T23:00:00:000Z',
		endDateISO: '2022-12-24T23:00:00:000Z',
		type: 'congé payé',
		motif: 'vacances',
		status: 'EN_ATTENTE_VALIDATION',
	},
	{
		startDateISO: '2022-12-12T23:00:00:000Z',
		endDateISO: '2022-12-24T23:00:00:000Z',
		type: 'congé payé',
		motif: 'vacances',
		status: 'VALIDEE',
	},
];

const defaultUser: IUser = {
	firstname: 'Default User',
	lastname: 'SILVESTRE',
	email: 'val@gmail.fr',
	password: 'admin',
	roles: ['admin', 'manager', 'employee'],
	absences: defaultAbsences,
	employees: [], // IDs
	superior: '', // ID
	_id: 'azeertsddv',
};

const App = () => {
	const [user, setUser] = useState<IUser>(defaultUser);
	const [userToken, setUserToken] = useState<string | null>(null);
	const [holidays, setHolidays] = useState(defaultHolidays);
	const [employees, setEmployees] = useState<any[] | []>([]);
	const [isManager, setIsManager] = useState(false);

	console.log(userToken);

	const navigate = useNavigate();
	// console.log(user);
	// console.log(Cookies.get('Token'));

	// const getAll = async () => {
	// 	const response = await getAllUserFromAPI();
	// 	// console.log(response);
	// };

	// const addUser = async () => {
	// 	const newUser: IUser = {
	// 		firstname: 'employé 5',
	// 		lastname: 'testUpdate',
	// 		email: 'testUpdate',
	// 		password: 'testUpdate',
	// 		roles: ['employee'],
	// 		employees: [''],
	// 		absences: [
	// 			{
	// 				startDateISO: new Date().toISOString(),
	// 				endDateISO: new Date().toISOString(),
	// 				type: 'congé payé',
	// 				motif: 'test',
	// 				status: 'INITIALE',
	// 			},
	// 		],
	// 		superior: '6399b638770d91e6e0b21c2d',
	// 	};
	// 	const response = await postUserToApi(newUser);
	// 	console.log(response);
	// };

	// const updateUser = async () => {
	// 	const newUser: IUser = {
	// 		_id: '639b04e76f2aca72e4e70fe7',
	// 		firstname: 'employé 5',
	// 		lastname: 'testUpdate',
	// 		email: 'testUpdate',
	// 		password: 'testUpdate',
	// 		roles: ['employee'],
	// 		employees: [''],
	// 		absences: [
	// 			{
	// 				startDateISO: new Date().toISOString(),
	// 				endDateISO: new Date().toISOString(),
	// 				type: 'congé payé',
	// 				motif: 'test',
	// 				status: 'INITIALE',
	// 			},
	// 			{
	// 				startDateISO: new Date().toISOString(),
	// 				endDateISO: new Date().toISOString(),
	// 				type: 'RTT',
	// 				motif: 'test',
	// 				status: 'INITIALE',
	// 			},
	// 			{
	// 				startDateISO: new Date().toISOString(),
	// 				endDateISO: new Date().toISOString(),
	// 				type: 'congé sans solde',
	// 				motif: 'test',
	// 				status: 'INITIALE',
	// 			},
	// 			{
	// 				startDateISO: new Date().toISOString(),
	// 				endDateISO: new Date().toISOString(),
	// 				type: 'congé sans solde',
	// 				motif: 'test',
	// 				status: 'INITIALE',
	// 			},
	// 		],
	// 		superior: '6399b638770d91e6e0b21c2d',
	// 	};
	// 	const response = await updateUserToApi(newUser);
	// 	console.log(response);
	// };

	// const deleteUser = async () => {
	// 	const response = await deleteUserToApi('639b04ce6f2aca72e4e70fe4');
	// };

	const getEmployeeFromUser = async () => {
		const token = Cookies.get('Token');
		const response = await getAllEmployeeFromAPI(user._id, token);
		console.log(response);

		if (response.status === 200) {
			setEmployees(response.data);
		}
	};

	const getHolidays = async () => {
		const token = Cookies.get('Token');
		const response = await getAllHolidayFromAPI(token);

		if (response.status === 200) {
			// const holidaysData = response.data;
			// const newHolidays =
			setHolidays(response.data);
		}
	};

	const autoLogin = async () => {
		// hash du password : $2b$12$b3FFHx75wZDosEgVea3mGOJ0eI839YTjPYsUiEkA2LkRMhiLpaF2u
		const response = await login({
			email: 'testUpdate',
			password: 'admin',
		});
	};

	// Fonction qui récupère le user du token
	const getUser = async () => {
		const token = Cookies.get('Token');
		console.log(token);

		if (token) {
			const response = await getUserFromApi(token);
			console.log(response);

			if (response.status === 200) {
				setUser(response.data);
				setIsManager(
					user.roles.includes('manager') ||
						user.roles.includes('admin')
				);
				console.log(isManager);
			}
		}
	};

	// Fonction de déconnexion
	const logout = () => {
		Cookies.remove('Token');
		navigate('/login');
		window.location.reload();
	};

	// reconnexion si token dans le cookie
	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		getEmployeeFromUser();
		getHolidays();
	}, [user]);

	// const isManager = user.roles.includes('manager');

	return (
		<div className="app container-fluid min-vh-100 d-flex flex-column px-5">
			{userToken ? (
				<>
					<Header user={user} isManager={isManager} logout={logout} />
					<main className="flex-grow-1">
						<Routes>
							<Route path="/" element={<h1>Accueil</h1>} />
							<Route
								path="/absences"
								element={
									<Absences
										user={user}
										setUser={setUser}
										holidays={holidays}
									/>
								}
							/>
							<Route path="/planning" element={<Planning />} />
							<Route
								path="/absences-process"
								element={
									<AbsenceProcess
										employees={employees}
										setEmployees={setEmployees}
									/>
								}
							/>
							{isManager && (
								<Route
									path="/report-list"
									element={<ReportList />}
								/>
							)}
							<Route
								path="/holiday"
								element={
									<Holiday
										holidays={holidays}
										setHolidays={setHolidays}
										user={user}
									/>
								}
							/>
							<Route
								path="/login"
								element={
									<Login
										setUser={setUser}
										setUserToken={setUserToken}
										setIsManager={setIsManager}
									/>
								}
							/>
							<Route path="*" element={<Navigate to="/" />} />
						</Routes>
					</main>
					<Footer />
				</>
			) : (
				<Routes>
					<Route
						path="/*"
						element={
							<Login
								setUser={setUser}
								setIsManager={setIsManager}
								setUserToken={setUserToken}
							/>
						}
					/>
				</Routes>
			)}
		</div>
	);
};

export default App;
