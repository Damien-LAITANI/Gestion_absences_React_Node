export interface IAbsence {
	startDateISO: Date;
	endDateISO: Date;
	type: 'congé payé' | 'RTT' | 'congé sans solde';
	motif: string;
	status: 'INITIALE' | 'EN_ATTENTE_VALIDATION' | 'VALIDEE' | 'REJETEE';
}
