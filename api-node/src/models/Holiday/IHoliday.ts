export interface IHoliday {
	date: Date;
	type: 'RTT employeur' | 'Férié';
	jour: string;
	motif: string;
	status: 'INITIALE' | 'VALIDEE';
}
