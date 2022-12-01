import express from 'express'
import cors from 'cors'

require('dotenv').config()
const cookieParser = require("cookie-parser");
const {AppDataSource} = require('./config/ormconfig')
const errorMiddleWare = require('./middlewares/error-middleware')
const router = require('./users/routes/index')
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: true}))
app.use('/api', router)
app.use(errorMiddleWare)
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})