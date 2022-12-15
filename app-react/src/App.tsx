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
import { getAllUser } from './services/UserService';

const App = () => {
	const getAll = async () => {
		const response = await getAllUser();
		console.log(response);
	};
	useEffect(() => {
		getAll();
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
