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
import { getAllHolidayFromAPI } from './services/HolidayService/HolidayService';
import { IHoliday } from './services/InterfacesServices/IHolidayService';
import { IUser } from './services/InterfacesServices/IUserService';

import {
	getAllEmployeeFromAPI,
	getUserFromApi,
} from './services/UserService/UserService';

const App = () => {
	const [user, setUser] = useState<IUser | null>(null);
	const [userToken, setUserToken] = useState<string | null>(null);
	const [holidays, setHolidays] = useState<IHoliday[] | null>(null);
	const [employees, setEmployees] = useState<any[] | []>([]);
	const [isManager, setIsManager] = useState(false);

	const navigate = useNavigate();

	// récupère les employés du user
	const getEmployeeFromUser = async () => {
		if (user) {
			const token = Cookies.get('Token');
			const response = await getAllEmployeeFromAPI(user._id, token);

			if (response.status === 200) {
				setEmployees(response.data);
			}
		}
	};

	// récupère les holidays
	const getHolidays = async () => {
		const token = Cookies.get('Token');
		const response = await getAllHolidayFromAPI(token);

		if (response.status === 200) {
			setHolidays(response.data);
		}
	};

	// Fonction qui récupère le user grâce à son id présent dans le token
	const getUser = async () => {
		const token = Cookies.get('Token');

		if (token) {
			const response = await getUserFromApi(token);

			if (response.status === 200) {
				setUser(response.data);
				setIsManager(
					response.data.roles.includes('manager') ||
						response.data.roles.includes('admin')
				);
				setUserToken(token);
			}
		}
	};

	// Fonction de déconnexion
	const logout = () => {
		Cookies.remove('Token');
		Cookies.remove('Roles');
		navigate('/login');
		window.location.reload();
	};

	// reconnexion si token dans le cookie
	useEffect(() => {
		getUser();
	}, []);

	// récupère les employés d'un user et les holidays quand le user est modifié
	useEffect(() => {
		getEmployeeFromUser();
		getHolidays();
	}, [user]);

	return (
		<div className="app container-fluid min-vh-100 d-flex flex-column px-5">
			{user ? (
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
							<Route
								path="/planning"
								element={
									<Planning
										absences={user.absences}
										holidays={holidays}
										user={user}
									/>
								}
							/>
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
								setUserToken={setUserToken}
								setIsManager={setIsManager}
							/>
						}
					/>
				</Routes>
			)}
		</div>
	);
};

export default App;
