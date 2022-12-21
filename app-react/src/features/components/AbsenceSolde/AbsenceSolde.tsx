import { getRemainingAbsenceCount } from '../../../functions/user';
import { IUser } from '../../../services/InterfacesServices/IUserService';

export interface IAbsenceSoldeProps {
	user: IUser;
}

const AbsenceSolde = ({ user }: IAbsenceSoldeProps) => {
	return (
		<div className="mt-3">
			<p>
				Nombre d'absences pouvant être demandées pour l'année{' '}
				{new Date().getFullYear()} :
			</p>
			<ul>
				<li>
					Congés payés :{' '}
					{getRemainingAbsenceCount(user, 'congé payé')}
				</li>
				<li>RTT employés : {getRemainingAbsenceCount(user, 'RTT')}</li>
				{/* <li>
					RTT employeur : <span style={{ color: 'red' }}>TODO</span>
				</li> */}
			</ul>
		</div>
	);
};

export default AbsenceSolde;
