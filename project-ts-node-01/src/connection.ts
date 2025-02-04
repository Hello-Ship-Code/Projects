import mongoose from "mongoose";

const connect = async (url: string): Promise<typeof mongoose> => mongoose.connect(url);

// async function connect(url: string): Promise<string>{
//     await mongoose.connect(url);
//     return "Database Connected Successfully...";
// }

export {
    connect
}