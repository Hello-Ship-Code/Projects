import mongoose from "mongoose";

async function connect(url) {
    // database connection
    return mongoose.connect(url)
}

export { connect };