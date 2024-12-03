import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    borrowedBooks: { bookId: string; score?: number }[];
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    borrowedBooks: [
        {
            bookId: { type: String, required: true },
            score: { type: Number, default: null },
        },
    ],
},
{ versionKey: false });

export default mongoose.model<IUser>('User', UserSchema);
