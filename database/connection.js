import mongoose from "mongoose"



export const connection = ()=>{
    mongoose.connect(process.env.DB_ONLINE)
    .then(()=>console.log("db connected"))
    .catch((err)=>console.log(err))
}


