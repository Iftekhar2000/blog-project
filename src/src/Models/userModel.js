const mongoose=require('mongoose')

const UsersSchema=mongoose.Schema(
    {
        userName:{type:String, required:true},
        email:{type:String,unique:true, required:true},
        password:{type:String, required:true},
    },
    {timestamps:true,versionKey:false}
)

const UsersModel=mongoose.model('users',UsersSchema);
module.exports=UsersModel;