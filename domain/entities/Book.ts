import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    name: string;
    score: number;
    voteCount: number;
}

const BookSchema: Schema = new Schema({
    name: { type: String, required: true },
    score: { type: Number, default: -1 },
    voteCount: { type: Number, default: 0 },
}, { versionKey: false });

export default mongoose.model<IBook>('Book', BookSchema);
