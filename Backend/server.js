const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 5000;
/** IMPORTING FILES **/
const projectsRoutes = require('./Routes/projectsRoutes')
const resumesRoutes = require('./Routes/resumesRoutes')
const userRoutes = require('./Routes/userRoutes')
//link the config.env
dotenv.config({ path: './Config/config.env'})
// import connectDB function 
const { connectDB }= require('./Config/db')
connectDB()
//link morgan 
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(express.json())

//include body-parser
app.use(bodyparser.urlencoded({extended:true}))

/** static file **/
app.use(express.static(path.join(__dirname,'public')))


/************************ Api Routes ***************/


//  /api/v1 for project routes 
app.use('/api/v1', projectsRoutes)
//  /api/v2 for resume routes 
app.use('/api/v2', resumesRoutes)
// api/vi3/ for article routes
app.use('/api/v3/', require('./Routes/articleRoutes'))
// api/vi3/ for article routes
app.use('/api/v4', userRoutes)
/***************************************/


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode at port: ${PORT}`.yellow.bold))