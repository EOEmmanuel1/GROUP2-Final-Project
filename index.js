const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')



dotenv.config()

const app = express()

app.use(express.json())
const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log("MongoDB is connected..."))

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

app.use('/api/users', userRoutes)

app.use('/api/doctors', doctorRoutes)


