import { useEffect } from 'react';
import { IUser } from '../../../services/InterfacesServices/IUserService';

export interface IAccueilProps {
	user: IUser;
}

const Accueil = ({ user }: IAccueilProps) => {
	// useEffect
	console.table(user);
	// Afficher le supérieur

	return (
		<>
			<h1 className="mb-5">
				Bonjour {user.firstname} {user.lastname}
			</h1>
			<p className="mb-3">
				Vous êtes sur le site de gestion d'absence de l'entreprise
				DIGINAMIC.
			</p>
			<p></p>
			<p>Voici les différents onglets :</p>
			<ul>
				<li>
					<span className="fst-italic">Gestion des absences</span> :
					demande, modification et suppression des absences
				</li>
				<li>
					<span className="fst-italic">Planning des absences</span> :
					Calendrier récapitulatif de vos absences et jours fériés
				</li>
				<li>
					<span className="fst-italic">Validation des absences</span>{' '}
					: Suivi de vos absences
				</li>
				<li>
					<span className="fst-italic">Jours fériés</span> : Liste des
					jours fériés et RTT employeurs
				</li>
			</ul>
		</>
	);
};

export default Accueil;
