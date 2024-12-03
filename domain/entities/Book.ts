import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    name: string;
    averageRating: number;
    ratings: number[];
}

const BookSchema: Schema = new Schema({
    name: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    ratings: { type: [Number], default: [] },
});

export default mongoose.model<IBook>('Book', BookSchema);
