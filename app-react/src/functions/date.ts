/**
 * - Renvoie vrai si les deux dates sont le même jour
 */
export const datesAreOnSameDay = (date1: Date, date2: Date) => {
	console.log(date1, date2);
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};
