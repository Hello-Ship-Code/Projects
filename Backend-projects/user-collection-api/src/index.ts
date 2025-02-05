import { connect } from './connection'
import express from 'express';
import { useRouter } from './routes/user';


function getPort(): number{
    const port = process.env.PORT;
    return port? parseInt(port,10) || 2000 : 2000;
}

// Create Express App
const app = express();
const PORT: number = getPort();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use("/user",useRouter);

// DataBase Connection
const mongoUrl: string = process.env.MONGO_URL || 'mongodb://localhost:27017';
connect(mongoUrl).then(() => console.log("Database Connected Successfully..."));

// Start Server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));