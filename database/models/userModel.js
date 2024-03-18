import bcrypt from "bcrypt"

import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:String,
    role:{
        type:String,
        enums:["Admin","User"],
        default:"User"
    },
    password:{
        type:String,
        required:true,
    },
    changePasswordAt:Date,
    isActive:{
        type:Boolean,
        default:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    wishlist:[{type:mongoose.Types.ObjectId,ref:'product'}],
    adressess:[
        {
            street:String,
            phone:String,
            city: String
        }
        
    ]
    

},{timestamps:true})
userSchema.pre("save",function (){
    // console.log(this)
    if(this.password) this.password = bcrypt.hashSync(this.password,7) 
})
userSchema.pre("findOneAndUpdate",function (){
    // console.log(this)
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password ,7) 

    
})


export const userModel = mongoose.model('user',userSchema)