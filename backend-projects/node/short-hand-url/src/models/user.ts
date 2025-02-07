import mongoose,{ Schema } from "mongoose"

export interface IUrlData {
  shortID: string,
  redirectUrl: string,
  visitHistory: {timeStamp: number}[]
}

const userSchema = new Schema<IUrlData>({
  shortID: { type: String, required: true },
  redirectUrl: { type: String, required: true},
  visitHistory: [{timeStamp: { type: Number}}]
})

export const Url = mongoose.model<IUrlData>('url',userSchema);
