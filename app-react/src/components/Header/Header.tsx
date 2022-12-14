import Nav from '../Nav/Nav';

const Header = () => {
	return (
		<header className="d-flex justify-content-between">
			<Nav />
			<div>
				<p>Bonjour Admin</p>
				<button>Se déconnecter</button>
			</div>
		</header>
	);
};

export default Header;
