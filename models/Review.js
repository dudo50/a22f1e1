import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    review_id:{type:String, required:true, unique:true, trim:true},
    game:{type:Number, required:true, unique:false, trim:true},
    user:{type:Number, required:true, unique:false, trim:true},
    stars:{type:Number, required:true, unique:false, trim:true},
    text:{type:String, required:false, unique:false},
    date:{type:String, required:true, unique:false, trim:true},


})

const RevMdl = mongoose.model("review", reviewSchema)

export default RevMdl
