import mongoose from "mongoose"



export const connection = ()=>{
    mongoose.connect('mongodb+srv://nodecourse:ZP5rrV2KenyltlSm@cluster0.1dkot7l.mongodb.net/ecommerce')
    .then(()=>console.log("db connected"))
    .catch((err)=>console.log(err))
}


