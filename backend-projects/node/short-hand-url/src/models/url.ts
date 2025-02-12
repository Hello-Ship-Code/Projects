import { Schema, type Types, type InferSchemaType, model } from "mongoose";

const urlSchema = new Schema(
  {
    shortId: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    visitHistory: [{ timeStamps: Number }],
  },
  { timestamps: true },
);

export type IUrl = InferSchemaType<typeof urlSchema> & { _id: Types.ObjectId };

export const UrlModel = model<IUrl>("url", urlSchema);
