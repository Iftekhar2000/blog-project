const UserModel = require("../Models/userModel")
const OtpModel = require("../Models/otpModel")
const bcrypt = require("bcrypt")
const sendMail = require("../utils/sendMail")
const { generateToken } = require("../Middleware/jwtAuth")
require("dotenv").config()



//sign up new user
exports.signup = (role) =>{
    return async (req, res) =>{
        try {
            const {password = "", email } = req.validData
            const existUser = await UserModel.findOne({email})  //checking if user exist
            if(existUser){ res.status(500).json({Error: "Email already exist"})}
            else{
                const hashedPassword = await bcrypt.hash(password, 10)  //hashing the pass
                req.validData.password = hashedPassword
                const user = UserModel(req.validData)
                await user.save()   //saving user to database
                .then(()=>{
                    const {name, email, createdAt} = user
                    console.log("====> user created : " + _id)
                    res.json({name,email,createdAt})
        
                })
                .catch((err)=> res.status(500).json({Error: err}))
            }
            
        } catch (err) {
            res.josn(err)
        }
    }
}

//login 
exports.login = async (req, res) => {
        const {email = "", password = ""} = req.body
        if(!email){ res.status(500).json({Error: "fill all the field"})}
        if(!password){ res.status(500).json({Error: "fill all the field"})}
        const user = await UserModel.findOne({email})
        if(!user){ res.status(500).json({Error: "user not exist"})}
        else{
            const passMatch = await bcrypt.compare(password, user.password)
            if(!passMatch){ res.status(500).json({Error: "verification failed"})}
            else{
                const token = generateToken(user)
            console.log(`====> user logged : ${user.role} ${user._id}`)
                    res.json({
                    msg : "welcome " + user.name,
                    access_token : token,
                    type : "bearer token",
                    valid_for : "7d"
                })
            }
        }
}


//changePassword
exports.changePassword = async (req, res) => {

    const {_id} = req.user
    const {password, newPassword, confirmPassword} = req.body
    if(!password || !newPassword || !confirmPassword){res.status(400).json({Error:  "fill all the field"})}
    if(password === newPassword ){res.status(400).json({Error: "enter a new password"})}
    else{
        if(newPassword === confirmPassword){
        const user = await UserModel.findById(_id,{_id : 0,password : 1})
        const match = await bcrypt.compare(password, user.password)
            if(!match){
                res.status(400).json({Error : "wrong password"})
            }
            else{
                const hashedPassword = await bcrypt.hash(newPassword, 10)
                const userUpdate = await UserModel.findByIdAndUpdate(_id,{"password" : hashedPassword})
                res.json({"msg" : "password updated successfully"})
            }
        }
        else{
            res.status(400).json({Error : "password didn't match"})
        }
    }
    
}

//changeEmail
exports.changeEmail = async (req, res) => {
    const {_id} = req.user
    const {newEmail, password} = req.body
    if(!newEmail || !password){res.status(400).json({Error: "fill all the field"})}
    else{
        const user = await UserModel.findById(_id,{_id : 0,password : 1})
        if(!user){res.status(400).json({Error: "user not found"})}
        else{
        const match = await bcrypt.compare(password, user.password)
            if(!match){
                res.status(400).json({Error:  "wrong password"})
            }
            else{
                try {
                    const userUpdate = await UserModel.findByIdAndUpdate(_id,{"email" : newEmail})
                    res.json({"msg" : "email updated successfully"})
                } catch (error) {
                    res.status(400).json({Error:  "email is taken" })
                }
            }
        }
    }
}

//getProfile
exports.getProfile = async (req, res) =>{
    const {_id} = req.user
    try {
        const user = await UserModel.findById(_id,{_id : 0, name : 1, email : 1, createdAt : 1})
        res.json(user)
        
    } catch (err) {
        res.status(500).json({Error: "internal server error"})   
    }
}

//delete profile
exports.deleteProfile = async (req, res) =>{
    try {
        const userId = req.user._id
        const user = await UserModel.findByIdAndDelete(userId)
        if(user){
            res.json({msg : "deleted successfully", data : {name : user.name, email : user.email}})
        }
        else{ res.status(500).json({Error:"user not found"})}
        
    } catch (err) {
         res.status(500).json({Error:err})   
    }
}

//reset password
exports.resetPassword = async (req, res) => {

    const {_id} = req.user
    const otpObj = await OtpModel.findOneAndDelete({"userId" : _id,"status" : "verified"})
    if(!otpObj){ res.status(400).json({Error:"otp expired or not verified"})}
    else {

        const { newPassword, confirmPassword} = req.body
        if(!newPassword || !confirmPassword){res.status(400).json({Error: "fill all the field"})}
        else{
            if(newPassword === confirmPassword){
            const user = await UserModel.findById(_id,{_id : 0,password : 1})
                const hashedPassword = await bcrypt.hash(newPassword, 10)
                const userUpdate = await UserModel.findByIdAndUpdate(_id,{"password" : hashedPassword})
                res.json({"msg" : "password updated successfully"})
            }
            else{
                 res.status(400).json({Error: "password didn't match"})
            }
        }
    }
    
}

//otp send
exports.otpSend = async (req, res) => {
    const {_id} = req.user
    const otpObjExist = await OtpModel.findOneAndDelete({"userId" : _id})
    const otp = generateOtp()
    const otpObj = new OtpModel({
        userId : _id,
        otp
    })
    await otpObj.save()
    const mail = {
        from : `E-Commerce : <${process.env.email}>`,
        to : `${req.user.email}`,
        subject : "reset password",
        body : `You have requested for reseting password. Your otp code is <h2>${otp}</h2>. If you didn't requested for reseting password you can ignore it safely`
    }
    const status = sendMail(mail)
    status ? res.json({msg : "successfull",data : "check your email for otp","fortest" : otp}) :  res.status(500).json({Error:"couldn't send mail..try again"})
}

//verifi otp
exports.verifyOtp = async (req, res) => {
    const {otp} = req.body
    const {_id} = req.user
    if(!otp){ res.status(500).json({Error: "please enter otp first"})}
    else{
        const otpObj = await OtpModel.findOne({"userId" : _id})
        if(!otpObj){ res.status(500).json({Error: "otp expired"})}
        else{
            if(otpObj.otp === otp){
                otpObj.status = "verified",
                await otpObj.save()
                res.json({status : "OTP verified"})
            }else{
                 res.status(500).json({Error:"incorrect otp"})
            }
        }
    }
}