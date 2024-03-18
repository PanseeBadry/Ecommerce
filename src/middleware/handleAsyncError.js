import { appError } from "../utilis/appError.js"

export const handleError = (fn)=>{
    return (req,res,next) =>{
        fn(req,res,next).catch(err => next(new appError(err,401)))
    }
}