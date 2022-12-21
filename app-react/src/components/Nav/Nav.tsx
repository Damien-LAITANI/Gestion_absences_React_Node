import { NavLink } from 'react-router-dom';

interface INavProps {
	user: any;
	isManager: boolean;
}

const Nav = ({ user, isManager }: INavProps) => {
	// const isManager = user.roles.includes('manager');

	return (
		<nav className="navbar navbar-expand-lg d-flex align-items-center p-0">
			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item active d-flex align-items-center">
						<NavLink
							to="/"
							className="nav-link d-flex align-items-center"
						>
							<img
								src="favicon.png"
								alt="cloud"
								className="image-fluid me-1"
								style={{ width: '40px' }}
							/>
							<span>Accueil</span>
						</NavLink>
					</li>
					<li className="nav-item d-flex align-items-center">
						<NavLink to="/absences" className="nav-link">
							Gestion des absences
						</NavLink>
					</li>
					<li className="nav-item d-flex align-items-center">
						<NavLink to="/planning" className="nav-link">
							Planning des absences
						</NavLink>
					</li>
					<li className="nav-item d-flex align-items-center">
						<NavLink to="/absences-process" className="nav-link">
							Validation demandes
						</NavLink>
					</li>
					{isManager && (
						<li className="nav-item d-flex align-items-center">
							<NavLink to="/report-list" className="nav-link">
								Vues synthétiques
							</NavLink>
						</li>
					)}
					<li className="nav-item d-flex align-items-center">
						<NavLink to="/holiday" className="nav-link">
							Jours fériés
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
