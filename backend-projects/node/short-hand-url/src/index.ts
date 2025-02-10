import express from 'express'
import { connect } from 'mongoose'

import { env } from "./env.config"
import { errorHandler } from './handler/error.handler'

import { useRouter } from './routes/router'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/url', useRouter)

app.use(errorHandler)

// Database Connection
connect(env.DATABASE_URL).then(() => console.log(`connected to DataBase...`))

// Server
app.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT}`))
