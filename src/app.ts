import express from 'express'
import cors from 'cors'

require('dotenv').config()
const cookieParser = require("cookie-parser");
const {AppDataSource} = require('./config/ormconfig')
const errorMiddleWare = require('./middlewares/error-middleware')
const userRouter = require('./users/routes/index')
const fileRouter = require('./files/routes/index')
const morgan = require('morgan')
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({credentials: true, origin: true}))
app.use('', userRouter)
app.use('/file', fileRouter)
app.use(errorMiddleWare)
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})