import Nav from '../Nav/Nav';

interface IHeaderProps {
	user: any;
	isManager: boolean;
}

const Header = ({ user, isManager }: IHeaderProps) => {
	return (
		<header className="d-flex justify-content-between">
			<Nav user={user} isManager={isManager} />
			<div>
				<p>Bonjour {user.firstname}</p>
				<button>Se déconnecter</button>
			</div>
		</header>
	);
};

export default Header;
