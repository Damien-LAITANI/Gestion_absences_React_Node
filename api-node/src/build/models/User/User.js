import { model, Schema } from 'mongoose';
import { absenceSchema } from '../Absence/Absence.js';
const userSchema = new Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	roles: { type: [String], required: true },
	absences: { type: [absenceSchema], required: true },
	employees: { type: [String], required: true },
	superior: { type: String, required: true },
});
export default model('user', userSchema);
