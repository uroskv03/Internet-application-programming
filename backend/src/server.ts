import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.router'
import zahtevRouter from './routers/zahtev.router'
import rezervacijaRouter from './routers/rezervacija.router'
import vikendicaRouter from './routers/vikendica.router'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('uploads')); 

mongoose.connect('mongodb://127.0.0.1:27017/PlaninarskaVikendica')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()
router.use("/users", userRouter)
router.use("/zahtevi", zahtevRouter)
router.use("/rezervacije", rezervacijaRouter)
router.use("/vikendice", vikendicaRouter)

app.use('/', router)
app.listen(4000, ()=>console.log('Express running on port 4000'))
