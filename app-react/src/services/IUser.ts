interface IAbsence {
	startDate: Date;
	endDate: Date;
	types: 'congé payé' | 'RTT' | 'congé sans solde';
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
