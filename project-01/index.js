import express from "express";
import { userRoutes } from "./routes/user.js"
import { connect } from "./connection.js";
import { logreq } from "./middlewares/index.js";


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/project-01";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

logreq("./log.txt");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connection
connect(mongoUrl).then(() => console.log("Connected to database..."));

// Use the userRoutes
app.use("/users", userRoutes);;

// Start Server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));