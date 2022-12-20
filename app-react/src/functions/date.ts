/**
 * - Renvoie vrai si les deux dates sont le même jour
 */
export const datesAreOnSameDay = (
	date1: Date | string,
	date2: Date | string
) => {
	const d1 =
		typeof date1 === 'string' ? new Date(date1.split('T')[0]) : date1;
	const d2 =
		typeof date2 === 'string' ? new Date(date2.split('T')[0]) : date2;

	return (
		d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate()
	);
};

/**
 * vérifie le format de la date donnée en params et retourne un format Date
 * @param date
 */
export const getJsDate: (date: any) => Date = (date: any) => {
	if (typeof date === 'object') {
		return date;
	} else {
		return new Date(date.split('T')[0]);
	}
};
