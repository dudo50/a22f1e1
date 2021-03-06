const mongoose = require ("mongoose");


const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true, trim:true},
    email:{type:String, required:true, unique:true, trim:true},
    password:{type:String, required:true, trim:true},
    profilePicture:{type:String, required:true, default:"default.jpg"},
    status:{type:String, enum:['ACTIVE', 'INACTIVE', 'DISABLED'], required:true, default:'INACTIVE'},
    user_id:{type:Number, required:true, unique:true, trim:true},
    reviews: [{type:String, unique:false, default:"0"}],

})

const UsrMdl = mongoose.model("user", userSchema)


module.exports = UsrMdl;