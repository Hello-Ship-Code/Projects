import mongoose, { Schema, Document} from "mongoose";

interface IUser extends Document {
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    jobTitle: string
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, unique: true, required: true},
    gender: { type: String, required: true},
    jobTitle: { type: String, required: true},
},
{ timestamps: true });

const user = mongoose.model<IUser>("User", userSchema);

export {
    user
}