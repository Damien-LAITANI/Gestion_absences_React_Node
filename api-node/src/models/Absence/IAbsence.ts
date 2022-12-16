export interface IAbsence {
	startDate: Date;
	endDate: Date;
	types: 'congé payé' | 'RTT' | 'congé sans solde';
	motif: string;
	status: 'INITIALE' | 'EN_ATTENTE_VALIDATION' | 'VALIDEE' | 'REJETEE';
}
