import 'dotenv/config.js'
import express from 'express'
import { connection } from './database/connection.js'
import { allRoutes } from './src/modules/routes.js'
import { appError } from './src/utilis/appError.js'
import cors from 'cors'
import { createOnlineOrder } from './src/modules/order/controller/order.controller.js'
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))
app.post('/webhook', express.raw({type: 'application/json'}),createOnlineOrder)

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