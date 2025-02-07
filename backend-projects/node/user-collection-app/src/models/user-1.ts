import { InferSchemaType, Model, model, models, Schema, Types } from 'mongoose'

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    gender: { type: String, required: true },
    jobTitle: { type: String, required: true }
  },
  { timestamps: true }
)

export type IUser = InferSchemaType<typeof userSchema> & { _id: Types.ObjectId }

export const UserModel = model('User', userSchema)
