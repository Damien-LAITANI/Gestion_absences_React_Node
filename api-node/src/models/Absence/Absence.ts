import { model, Schema } from 'mongoose';
import { IAbsence } from './IAbsence';

export const absenceSchema = new Schema<IAbsence>({
	startDateISO: { type: Date, required: true },
	endDateISO: { type: Date, required: true },
	type: { type: String, required: true },
	motif: { type: String, required: true },
	status: { type: String, required: true },
});

export default model('absence', absenceSchema);
