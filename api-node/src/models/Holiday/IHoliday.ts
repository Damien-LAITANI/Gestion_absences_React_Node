export interface IHoliday {
	year: object[];
	date: Date;
	type: 'congé payé' | 'RTT' | 'congé sans solde';
	jour: string;
	motif: string;
}
