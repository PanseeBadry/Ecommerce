import 'dotenv/config.js'
import express from 'express'
import { connection } from './database/connection.js'
import { allRoutes } from './src/modules/routes.js'
import { appError } from './src/utilis/appError.js'
import cors from 'cors'
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))
connection()
allRoutes(app)
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.statusCode).json({message:err.message,stack:err.stack})
  })
app.use("*",(req,res,next)=>{
    next(new appError("url not found",404))
})
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`)) 