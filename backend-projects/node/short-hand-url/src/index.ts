import express, { urlencoded } from "express";
import { connect } from "mongoose";

import { env } from "./env.config";
import { errorHandle } from "./handler/error.handler";

import { useRouter } from "./routes/router";

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(errorHandle)

app.use("/url", useRouter);

// Database Connection
connect(env.DATABASE_URL).then(() => console.log(`connected to DataBase...`));

// Server
app.listen(env.PORT, () =>
  console.log(`Server is running on port ${env.PORT}`),
);
