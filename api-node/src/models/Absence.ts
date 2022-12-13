import { model, Schema } from 'mongoose';
import { IAbsence } from './IAbsence';

const absenceSchema = new Schema<IAbsence>({
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	types: { type: String, required: true },
	motif: { type: String, required: true },
	status: { type: String, required: true },
});

export default model('absence', absenceSchema);
