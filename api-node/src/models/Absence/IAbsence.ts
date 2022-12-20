type AbsenceType = 'congé payé' | 'RTT' | 'congé sans solde';

export interface IAbsence {
	startDateISO: Date;
	endDateISO: Date;
	type: AbsenceType;
	motif: string;
	status: 'INITIALE' | 'EN_ATTENTE_VALIDATION' | 'VALIDEE' | 'REJETEE';
}
