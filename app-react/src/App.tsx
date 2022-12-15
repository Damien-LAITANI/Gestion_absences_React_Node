import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AbsenceProcess from './features/components/AbsenceProcess/AbsenceProcess';
import Absences from './features/components/Absences/Absences';
import Holiday from './features/components/Holiday/Holiday';
import Login from './features/components/Login/Login';
import Planning from './features/components/Planning/Planning';
import ReportList from './features/components/ReportList/ReportList';
import { getAllUserFromAPI, getUserFromApi } from './services/UserService';

const defaultAbsences = [
	{
		startDate: '2022-12-12T23:00:00:000Z',
		endDate: '2022-12-24T23:00:00:000Z',
		type: 'congés payés',
		motif: 'vacances',
		status: 'EN_ATTENTE_VALIDATION',
	},
	{
		startDate: '2022-12-24T23:00:00:000Z',
		endDate: '2022-12-31T23:00:00:000Z',
		type: 'congés payés',
		motif: 'vacances',
		status: 'VALIDEE',
	},
];

const defaultUser: {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	roles: string[];
	absences: any[];
	employees: string[]; // IDs
	superior: string; // ID
	id: string;
} = {
	firstname: 'Valentin',
	lastname: 'SILVESTRE',
	email: 'val@gmail.fr',
	password: '123456789',
	roles: ['ADMIN', 'MANAGER'],
	absences: defaultAbsences,
	employees: [], // IDs
	superior: 'ae123456', // ID
	id: 'azeertsddv',
};

const App = () => {
	const [user, setUser] = useState(defaultUser);
	const userID = '6399b395ba1d4a74d1521322';

	const getAll = async () => {
		const response = await getAllUserFromAPI();
		// console.log(response);
	};

	const getUser = async () => {
		const userData = await getUserFromApi(userID);
		// console.log(userData.data);
		setUser(userData.data);
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="app container-fluid min-vh-100 d-flex flex-column p-5">
			<Header user={user} />
			<main className="flex-grow-1">
				<Routes>
					<Route path="/" element={<h1>Accueil</h1>} />
					<Route
						path="/absences"
						element={<Absences user={user} />}
					/>
					<Route path="/planning" element={<Planning />} />
					<Route
						path="/absences-process"
						element={<AbsenceProcess user={user} />}
					/>
					<Route path="/report-list" element={<ReportList />} />
					<Route path="/holiday" element={<Holiday />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
};

export default App;
