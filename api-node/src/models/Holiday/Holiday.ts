import { model, Schema } from 'mongoose';
import { IHoliday } from './IHoliday';

export const holidaySchema = new Schema<IHoliday>({
	year: [
		{
			date: { type: Date, required: true },
			type: { type: String, required: true },
			jour: { type: String, required: true },
			motif: { type: String, required: true },
		},
	],
});

export default model('holiday', holidaySchema);
