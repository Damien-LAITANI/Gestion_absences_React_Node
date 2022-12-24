import { model, Schema } from 'mongoose';
import { IHoliday } from './IHoliday';

export const holidaySchema = new Schema<IHoliday>({
	date: { type: Date, required: true, default: Date.now },
	type: { type: String, required: true },
	jour: { type: String, required: true },
	motif: { type: String, required: true },
	status: { type: String, required: true },
});

export default model('holiday', holidaySchema);
