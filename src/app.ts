import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
const {AppDataSource} = require('./config/ormconfig')
const errorMiddleWare = require('./middlewares/error-middleware')
const router = require('./routes/index')
config()
const PORT = process.env.PORT || 5000
const app = express()
app.use('/api', router)
app.use(express.json())
app.use(express.json());
app.use(cors());
app.use(errorMiddleWare)
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})