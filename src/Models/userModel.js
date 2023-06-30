const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name : {
        type : String,
        maxlength : 30,
        required : true,
    },
    email : {
        type : String,
        maxlength : 64,
        required : true,
    },
    password : {
        type : String,
        maxlength : 128,
        required : true,
    }
},{
    timestamps : true, versionKey : false
})

const UserModel = model("user", userSchema)

module.exports = UserModel