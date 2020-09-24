import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()
createConnection()
app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(process.env.PORT || 3333)