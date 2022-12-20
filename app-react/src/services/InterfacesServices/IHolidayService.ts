export interface IHoliday {
	_id: string;
	date: Date;
	type: 'RTT employeur' | 'Férié';
	jour: string;
	motif: string;
	status: 'INITIALE' | 'VALIDEE';
}
