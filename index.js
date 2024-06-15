import express, { json } from 'express'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoute from './backend.js/routes/authRoute.js'
import userRoutes from './backend.js/routes/userRoutes.js'
import doctorRoutes from './backend.js/routes/doctorRoutes.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

const app = express()
app.use(bodyParser.json())
dotenv.config();
app.use(bodyParser.json())
const corOptions = {
    origin: true,
}

const PORT = process.env.PORT || 8000

connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB is connected..."))

app.use(express.json())
app.use(cookieParser)
app.use(cors(corOptions))

app.use('/api/auth', authRoute)
app.use('/api/user', userRoutes)
app.use('/api/doctor', doctorRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
