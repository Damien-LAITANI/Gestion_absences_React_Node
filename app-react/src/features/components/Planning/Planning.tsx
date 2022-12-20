import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Plannig = ({ absences, holidays }: any) => {
	let events: any = [];
	const colorEvent = (type: any) => {
		if (type === 'RTT') {
			return '#30b16d';
		}
		if (type === 'RTT employeur') {
			return '#d71a4a';
		}
		if (type === 'congé payé') {
			return '#48289f';
		}
		if (type === 'congé sans solde') {
			return '#a938a7';
		}
		if (type === 'Férié') {
			return '#973c3c';
		}
	};
	for (let holiday of holidays) {
		events.push({
			id: holiday._id,
			title: holiday.type,
			start: holiday.date.split('T')[0],
			end: holiday.date.split('T')[0],
			backgroundColor: colorEvent(holiday.type),
		});
	}
	for (let absence of absences) {
		events.push({
			id: absence._id,
			title: absence.type,
			start: absence.startDateISO.split('T')[0],
			end: absence.endDateISO.split('T')[0],
			backgroundColor: colorEvent(absence.type),
		});
	}

	return (
		<div className="w-75 mx-auto">
			<h1 className="text-center mt-2">Planning des absences</h1>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				weekends={true}
				events={events}
			/>
		</div>
	);
};

export default Plannig;
