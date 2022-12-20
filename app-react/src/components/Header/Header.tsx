import { MouseEventHandler } from 'react';
import Nav from '../Nav/Nav';

interface IHeaderProps {
	user: any;
	isManager: boolean;
	logout: MouseEventHandler;
}

const Header = ({ user, isManager, logout }: IHeaderProps) => {
	return (
		<header className="d-flex justify-content-between">
			<Nav user={user} isManager={isManager} />
			<div>
				<p>Bonjour {user.firstname}</p>
				<button onClick={logout}>Se déconnecter</button>
			</div>
		</header>
	);
};

export default Header;
