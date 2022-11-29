import express from 'express'
const app = express()
app.use(express.json())
const PORT = process.env.PORT||5000
app.get('/',(req,res)=>{
    res.send('hello worasdasdld')
})
app.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
})