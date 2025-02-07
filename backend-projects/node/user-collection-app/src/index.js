"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
function getPort() {
    const port = process.env.PORT;
    return port ? parseInt(port, 10) || 2000 : 2000;
}
// Create Express App
const app = (0, express_1.default)();
const PORT = getPort();
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Router
app.use("/user", user_1.useRouter);
// DataBase Connection
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
(0, connection_1.connect)(mongoUrl).then(() => console.log("Database Connected Successfully..."));
// Start Server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
