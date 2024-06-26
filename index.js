import express, { json } from 'express'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './backend.js/routes/authRoutes.js'
import userRoutes from './backend.js/routes/userRoutes.js'
import doctorRoutes from './backend.js/routes/doctorRoutes.js'
import appointmentRoutes from './backend.js/routes/appointmentRoutes.js' 
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import logger from 'morgan'

const app = express()
app.use(bodyParser.json())
dotenv.config();
app.use(bodyParser.json())
const corOptions = {
    origin: true,
}


const PORT = process.env.PORT || 8000
app.use(logger("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corOptions))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/appointments', appointmentRoutes);

connect(process.env.MONGODB_URL)
.then(() => console.log("MongoDB is connected..."))

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

app.get("/",(req , res)=>{
    return res.status(200).json({message:"WELCOME TO EMMANUEL OBUH PROJECT"})
})

//Emmanuel Obuh