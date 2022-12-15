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

const App = () => {
	const getAll = async () => {
		const response = await getAllUserFromAPI();
		console.log(response);
	};

	const getUser = async () => {
		const response = await getUserFromApi('6399b638770d91e6e0b21c2d');
		console.log(response);
	};

	useEffect(() => {
		getUser();
	}, []);

	const absences = [
		{
			startDate: new Date(2022, 12, 12),
			endDate: new Date(2022, 12, 24),
			type: 'congés payés',
			motif: 'vacances',
			status: 'EN ATTENTE',
		},
		{
			startDate: new Date(2022, 12, 24),
			endDate: new Date(2022, 12, 31),
			type: 'congés payés',
			motif: 'vacances',
			status: 'FINI',
		},
	];
	const connectedUser: {
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
		absences: absences,
		employees: [], // IDs
		superior: 'ae123456', // ID
		id: 'azeertsddv',
	};

	const [user, setUser] = useState(connectedUser);

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
						element={<AbsenceProcess />}
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
