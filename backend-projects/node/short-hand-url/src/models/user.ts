import { type Types, type InferSchemaType, Schema, model } from "mongoose";

const urlSchema = new Schema({
  shortId: { type: String, required: true },
  redirectUrl: { type: String, required: true },
  visitHistory: [{ timeStamp: Number }]
}, { timestamps: true })

export type IUrl = InferSchemaType<typeof urlSchema> & { _id: Types.ObjectId }

export const UrlModel = model<IUrl>('url', urlSchema)