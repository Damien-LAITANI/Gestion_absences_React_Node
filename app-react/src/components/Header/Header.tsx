import Nav from '../Nav/Nav';

interface IHeaderProps {
	user: any;
}

const Header = ({ user }: IHeaderProps) => {
	return (
		<header className="d-flex justify-content-between">
			<Nav />
			<div>
				<p>Bonjour {user.firstname}</p>
				<button>Se déconnecter</button>
			</div>
		</header>
	);
};

export default Header;
