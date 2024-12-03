import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    books: {
        past: { bookId: string; name: string; userScore?: number }[];
        present: { bookId: string; name: string }[];
    };
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    books: {
        past: [
            {
                bookId: { type: String, required: true },
                name: { type: String, required: true },
                userScore: { type: Number, default: null },            },
        ],
        present: [
            {
                bookId: { type: String, required: true },
                name: { type: String, required: true },
            },
        ],
    },
}, { versionKey: false });

export default mongoose.model<IUser>('User', UserSchema);
