import { NavLink } from 'react-router-dom';

const Nav = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<NavLink className="navbar-brand" to="/">
				Logo
			</NavLink>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item active">
						<NavLink to="/" className="nav-link">
							Accueil
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/absences" className="nav-link">
							Gestion des absences
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/planning" className="nav-link">
							Planning des absences
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/absences-process" className="nav-link">
							Validation demandes
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/report-list" className="nav-link">
							Vues synthétiques
						</NavLink>
					</li>
					<li className="nav-item">
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
