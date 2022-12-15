import { AxiosRequestConfig } from 'axios';
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
import { IUser } from './services/IUser';
import {
	deleteUserToApi,
	getAllUserFromAPI,
	getUserFromApi,
	postUserToApi,
	updateUserToApi,
} from './services/UserService';

const App = () => {
	const getAll = async () => {
		const response = await getAllUserFromAPI();
		console.log(response);
	};

	const getUser = async () => {
		const response = await getUserFromApi('6399b638770d91e6e0b21c2d');
		console.log(response);
	};

	const addUser = async () => {
		const newUser: IUser = {
			firstname: 'employé 5',
			lastname: 'testUpdate',
			email: 'testUpdate',
			password: 'testUpdate',
			roles: ['employee'],
			employees: [''],
			absences: [
				{
					startDate: new Date(),
					endDate: new Date(),
					types: 'congé payé',
					motif: 'test',
					status: 'INITIALE',
				},
			],
			superior: '6399b638770d91e6e0b21c2d',
		};
		const response = await postUserToApi(newUser);
		console.log(response);
	};

	const updateUser = async () => {
		const newUser: IUser = {
			_id: '639b04e76f2aca72e4e70fe7',
			firstname: 'employé 5',
			lastname: 'testUpdate',
			email: 'testUpdate',
			password: 'testUpdate',
			roles: ['employee'],
			employees: [''],
			absences: [
				{
					startDate: new Date(),
					endDate: new Date(),
					types: 'congé payé',
					motif: 'test',
					status: 'INITIALE',
				},
				{
					startDate: new Date(),
					endDate: new Date(),
					types: 'RTT',
					motif: 'test',
					status: 'INITIALE',
				},
				{
					startDate: new Date(),
					endDate: new Date(),
					types: 'congé sans solde',
					motif: 'test',
					status: 'INITIALE',
				},
				{
					startDate: new Date(),
					endDate: new Date(),
					types: 'congé sans solde',
					motif: 'test',
					status: 'INITIALE',
				},
			],
			superior: '6399b638770d91e6e0b21c2d',
		};
		const response = await updateUserToApi(newUser);
		console.log(response);
	};

	const deleteUser = async () => {
		const response = await deleteUserToApi('639b04ce6f2aca72e4e70fe4');
		console.log(response);
	};

	useEffect(() => {
		deleteUser();
	}, []);

	return (
		<div className="app container-fluid min-vh-100 d-flex flex-column p-5">
			<Header />
			<main className="flex-grow-1">
				<Routes>
					<Route path="/" element={<h1>Accueil</h1>} />
					<Route path="/absences" element={<Absences />} />
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
