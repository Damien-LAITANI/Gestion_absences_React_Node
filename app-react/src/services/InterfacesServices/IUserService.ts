export interface IAbsence {
	_id?: string;
	/** - Date au format ISO, donc chaîne de caractères */
	startDateISO: string;
	/** - Date au format ISO, donc chaîne de caractères */
	endDateISO: string;
	type: 'congé payé' | 'RTT' | 'congé sans solde';
	motif: string;
	status: 'INITIALE' | 'EN_ATTENTE_VALIDATION' | 'VALIDEE' | 'REJETEE';
}

type UserRole = 'admin' | 'manager' | 'employee';

export interface IUser {
	_id?: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	roles: UserRole[];
	absences: IAbsence[];
	employees: string[]; // IDs
	superior: string; // ID
}

export interface ILogin {
	email: string;
	password: string;
}
