import { MouseEventHandler } from 'react';
import Nav from '../Nav/Nav';
import './Header.scss';

interface IHeaderProps {
	user: any;
	isManager: boolean;
	logout: MouseEventHandler;
}

const Header = ({ user, isManager, logout }: IHeaderProps) => {
	return (
		<header
			className="d-flex justify-content-between px-5 py-2"
			style={{ position: 'sticky', top: '0' }}
		>
			<Nav user={user} isManager={isManager} />
			<div className="user__info">
				<p className="text-center">
					Bonjour <span className="user__name">{user.firstname}</span>
				</p>
				<button className="btn-logout" onClick={logout}>
					Se déconnecter
				</button>
			</div>
		</header>
	);
};

export default Header;
