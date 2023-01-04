import { model, Schema } from 'mongoose';
export const holidaySchema = new Schema({
    date: { type: Date, required: true, default: Date.now },
    type: { type: String, required: true },
    jour: { type: String, required: true },
    motif: { type: String, required: true },
    status: { type: String, required: true },
});
export default model('holiday', holidaySchema);
