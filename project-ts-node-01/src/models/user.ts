import mongoose, { Schema, Document} from "mongoose";

interface IUser extends Document {
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    job_title: string
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, unique: true, required: true},
    gender: { type: String, required: true},
    job_title: { type: String, required: true},
},
{ timestamps: true });

const user = mongoose.model<IUser>("User", userSchema);

export {
    user
}