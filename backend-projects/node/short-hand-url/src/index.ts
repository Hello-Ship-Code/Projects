import express from 'express'
import { connect } from 'mongoose'
//test

import { env } from './env.config'

import { useRouter } from './routes/router'

const app = express()

app.use(express.json());

app.use('/url', useRouter);

// Database Connection
connect(env.DATABASE_URL).then(() => console.log(`connected to DataBase...`))

// Server
app.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT}`))
