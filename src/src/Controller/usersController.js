const UsersModel=require('../Models/userModel');
const jwt=require("jsonwebtoken");

exports.registration=async(req,res)=>{
    let reqBody=req.body;
    try{
       let result= await UsersModel.create(reqBody)
       res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}

exports.login=async (req,res)=>{
    try{
        let reqBody=req.body;
        let result= await UsersModel.find(reqBody).count('total');
        if(result===1){
            // Token issue
            let Payload={
                exp:Math.floor(Date.now()/1000)+(24*60*60),
                data:req.body['email']
            }
            let token=jwt.sign(Payload,'SecretKey123456789',{ algorithm: 'HS256' });
            res.status(200).json({status:"success",data:token})
        }
        else{
            res.status(200).json({status:"fail",data:result})
        }

    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}

exports.profileDetails=async(req,res)=>{
    try {
        let email=req.headers['email'];
        let result= await UsersModel.find({email:email});
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}






