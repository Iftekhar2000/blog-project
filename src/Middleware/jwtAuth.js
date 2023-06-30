const jwt = require('jsonwebtoken');
require("dotenv").config()

exports.generateToken = (user) =>{
    const {_id ="", name = "", email} = user
    if(!_id || !name || !email){
        throw {code : 401, msg : "unauthorized"}
    }
    const token = jwt.sign({_id, name}, process.env.SECRET_KEY,{expiresIn : "7d"})
    return token
}

exports.verifyToken = (req, res, next) => {
    const tokenContainer = req.headers.authorization
    if(!tokenContainer){next({code : 401, msg : "Authorization failed"})}
    else{
        const token = tokenContainer.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(!err){
                console.log("authorized user : " + decoded.name)
                req.user = decoded
                next()
                return null
            }
            else{
                console.log(err)
                next({code : 401, msg : "Authorization failed"})
            }
        })
    }

}