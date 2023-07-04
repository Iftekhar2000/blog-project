const nodeMailer = require("nodemailer");

/* const sendEmailUtility = async (EmailTo, EmailText,EmailSubject) => { */

    let transporter = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:"testingnm.2334@gmail.com",
            pass:"ydawjycramncqhus"
        }

    })

    let mailOption = {
        from:'testingnm.2334@gmail.com',
        to:"iftekharulhaque2000@gmail.com",
        subject:"OTP",
        text:"first otp"
    }


    transporter.sendMail(mailOption, (err) =>{
        if(err){
            console.log("error sending failed", err)
        } else{
            console.log("send successful");
        }
    })

    /* let result = await transporter.sendMail(mailOption)
    return result
 */


/* module.exports=sendEmailUtility; */