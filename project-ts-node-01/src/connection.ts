import mongoose from "mongoose";

const connect = async (url: string) => mongoose.connect(url);

export {
    connect
}