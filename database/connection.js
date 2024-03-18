import mongoose from "mongoose"



export const connection = ()=>{
    mongoose.connect(process.env.DB_ONLINE,{
         socketTimeoutMS: 30000,
         connectTimeoutMS: 30000
    })
    .then(()=>console.log("db connected"))
    .catch((err)=>console.log(err))
}


