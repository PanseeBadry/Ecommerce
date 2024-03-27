import { cartModel } from "../../../../database/models/cart.model.js"
import { orderModel } from "../../../../database/models/order.model.js"
import { productModel } from "../../../../database/models/productModel.js"
import { handleError } from "../../../middleware/handleAsyncError.js"
import apiFeatures from "../../../utilis/apiFeature.js"
import { appError } from "../../../utilis/appError.js"
import Stripe from 'stripe';
const stripe = new Stripe(process.env.ORDER_SECRET_KEY);


const createCashOrder= handleError(async(req,res,next)=>{
    //get cart
    let cart = await cartModel.findById(req.params.id)
    if(!cart) return next(new appError("cart not found",404))
    // order total price
    let orderTotalPrice = cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount:cart.totalPrice
    // create order
    let order = new orderModel({
        userId:req.user._id,
        orderItems:cart.cartItems,
        orderTotalPrice,
        shippingAddress:req.body.shippingAddress
    })
    await order.save()
    let options = cart.cartItems.map((item)=>{
        return (
            {
                updateOne:{
                    "filter":{_id:item.product},
                    "update":{$inc:{sold:item.quantity,quantity:-item.quantity}}
                }
            }
        )

    }) 
    await productModel.bulkWrite(options)
    await cartModel.findByIdAndDelete(req.params.id)
    res.json({message:"Done",order})
})

const getAllOrders = handleError(async(req,res,next)=>{
    let apiFeature=    new apiFeatures(orderModel.find().populate('orderItems.product'),req.query).pagination().sort().search().fields()
    let orders = await apiFeature.mongooseQuery.exec()
    orders && res.json({message:"Done",orders})
    !orders && next(new appError(`order not found`,404))

    
})
const getSpecificOrder = handleError(async(req,res,next)=>{
    let order = await orderModel.findOne({userId:req.user._id}).populate('orderItems.product')
    order && res.json({message:"Done",order})
    !order && next(new appError(`order not found`,404))

})

const createCheckOutSession = handleError(async(req,res,next)=>{
    let cart = await cartModel.findById(req.params.id)
    if(!cart) return next(new appError("cart not found",404))
    // order total price
    let orderTotalPrice = cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount:cart.totalPrice
    let session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:'egp',
                    unit_amount:orderTotalPrice * 100,
                    product_data:{
                        name:req.user.name
                    }
                },
                quantity:1
            }
        ],
        mode:'payment',
        success_url:'https://www.google.com/',
        cancel_url:'https://www.facebook.com/',
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress
    })
    res.json({message:"Done",session})
})


const createOnlineOrder = handleError(async(request,response,next)=>{
    const sig = request.headers['stripe-signature'].toString();

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, "whsec_kP3HT4gMVR8soUWvFtCcVFubbQpuse3G");
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
      
    }
  
    // Handle the event
    if(event.type=="checkout.session.completed"){
        const checkoutSessionCompleted = event.data.object;
        console.log("create order here......")
    }else{
        console.log(`Unhandled event type ${event.type}`)
    }    
})










export{
    createCashOrder,
    getSpecificOrder,
    getAllOrders,
    createCheckOutSession,
    createOnlineOrder
}