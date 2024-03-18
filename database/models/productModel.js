
import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[3,"title is too short"],
        trim:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    discription:{
        type:String,
        minLength:[3,'description is too short'],
        maxLength:[300,'description is too long'],
    },
    price:{
        type:Number,
        min:0,
        required:true,
    },
    priceAfterDiscount:{
        type:Number,
        min:0,
        required:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:'subCategory'
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    },
    imageCover:String,
    images:[String],
    sold:{
        type:Number,
        required:true,
        default:0
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    rateCount:Number,
    rateAvg:{
        type:Number,
        min:0,
        max:5,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }

},{timestamps:true,toJSON: { virtuals: true }})

productSchema.virtual('myReview', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product'
  });
  productSchema.pre('findOne',function(){
    this.populate('myReview')
  })
productSchema.post("init",function(doc){
    if(doc.imageCover || doc.images){
        doc.imageCover = process.env.BASEURL +'uploads/' + doc.imageCover
        doc.images =  doc.images?.map(ele=>process.env.BASEURL +'uploads/' + ele )
    }
    
})


export const productModel = mongoose.model('product',productSchema)