export interface IHoliday {
	date: Date;
	type: 'congé payé' | 'RTT' | 'congé sans solde';
	jour: string;
	motif: string;
}
