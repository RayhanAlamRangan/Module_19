


const UserModel=require('../Models/user.Model.js');
const jwt=require('jsonwebtoken');
const OTPModel=require('../Models/OTP.Model.js');
const SendEmailUtility=require('../Utiliti/SendEmailUtility.js');



// registration


exports.registration=async(req,res)=>{


let reqBody=req.body;

try{

    let result= await UserModel.create(reqBody);
    res.status(200).json({status:"Successfully Data Recieved",data:result})


}catch(e){

    res.status(200).json({status:"Data Recieved Failed", data:e})

}

}

exports.login=async(req,res)=>{


    let reqBody=req.body;
  try{

  let result=await UserModel.find(reqBody).count();
   
   if(result===1){

   // Login create

   // Token create

   let Payload={exp:Math.floor(Date.now()/1000)+ (24*60*60),
   
    data:reqBody['email']
   
   
   }
   let token=jwt.sign(Payload,"SecretKey123SSxcSS43RR1");
   res.status(200).json({status:"User Login Successfully", data:token})

}else{
   res.status(200).json({status:"Failed",data:"No User Found"});
}


}catch(e){

res.status(200).json({status:'Failed', data:e})
}

}





exports.profileDetails=async(req,res)=>{



    try {
        let email= req.headers['email'];
        let result= await UserModel.find({email:email});
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
    
    }



exports.profileUpdate=async(req,res)=>{


    try{
let email=req.headers['email'];
let reqBody=req.body
let result=await UserModel.updateOne({email:email},reqBody)
res.status(200).json({status:"Successfully YouserProile  Updated", data:result})



    }catch(e){
      res.status(200).json({status:"Failed", data:e})

    }
}

exports.RecoverVerifyEmail=async(req,res)=>{

let email=req.params.email;
let OTPCode=Math.floor(100000  + Math.random()* 900000)
let Emailtext="Your Verification Code Is ="+OTPCode
let Emailsubject="Youser Profile Manage Code"
let result=await UserModel.find(reqBody).count()

if(result===1){

// Verification Email
        await SendEmailUtility(email,Emailtext,Emailsubject)
       await OTPModel.create({email:email,otp:OTPCode})

       res.status(200).json({status:"Success", data:"6 digit code has been send"})





}else{
    res.status(200).json({status:"Failed",data:"No User Found"});
 }



}


exports.RecoverVerifyOtp=async(req,res)=>{

    let email= req.params.email  
    let OTPCode= req.params.otp
    let status=0
    let statusUpdate=1

    let result= await OTPModel.find({email:email, otp:OTPCode,status:status}).count()

if(result===1){

     await OTPModel.updateOne({email:email, otp:OTPCode, status:status},
        {status:statusUpdate})
res.status(200).json({status:"Success ", data:"Verification Successfully Completed"})
}else{

res.status(200).json({status:"Failed", data:"Invalid Verification"})

}



}

exports.RecoverResetPass=async(req,res)=>{

    let email=req.body['email'];
    let OTPCode=req.body['OTP'];
    let Newpass=req.body['password'];
    let statusUpdate=1;


    let result= await OTPModel.find({email:email, otp:OTPCode, status:statusUpdate}
      ).count()

      if(result===1){

let result= await OTPModel.updateOne({email:email,  password:Newpass})
    res.status(200).json({status:"Success",  data:"Password Reset Success"})
      }else{

        res.status(200).json({status:"Failed",  data:"Invalid Password"});
      }



}