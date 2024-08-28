const userSchema = require('../../model/client/user-account')
const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // assuming you want to use JWT for authentication
const sendOtpMail = require('../../function/sendOtpMail');
require('dotenv').config()

router.post('/create',async (req,res)=>{
try{
    const findUser = await userSchema.findOne({ email: req.body.email });
    const emailExists = !findUser; 
    
    const min = 100000;
    const max = 999999;
    const generatedOTP = Math.floor(Math.random() * (max - min + 1)) + min;

    if (emailExists) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const tempDoc = new  userSchema({...req.body,password:hashedPassword,otp:generatedOTP})
        const saveDoc = await tempDoc.save()
        sendOtpMail(req.body.email,generatedOTP)
        return res.status(200).json({data:saveDoc,message:"Account Request sent"})
    }else{
       return  res.status(409).json({message:"Usre All Ready exist"})
    }

}catch(error){
res.status(500).json({error:error,message:error.message})
}
})

router.post('/verify_createdAccount', async (req, res) => {
  try {
      const { otp, email } = req.body;

      const findUser = await userSchema.findOne({ email, otp });

      if (!findUser) {
          return res.status(401).json({ message: "Invalid OTP or email." });
      }
      await userSchema.findByIdAndUpdate(findUser._id,{ email, otp,isEmailVerify:true },{new:false})
      res.status(200).json({ message: "Account Created successfully"});
  } catch (error) {
      res.status(500).json({ error: error.message, message: "Something went wrong..." });
  }
});


router.post('/login', async (req, res) => {
  try {

    const min = 100000;
    const max = 999999;
    const generatedOTP = Math.floor(Math.random() * (max - min + 1)) + min;

    const { email, password } = req.body;
    // Find the user by email
    console.log(email)
    const findUser = await userSchema.findOne({ email });
    console.log(req.body)

    if (!findUser || !findUser?.isEmailVerify) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
      await userSchema.findByIdAndUpdate(findUser._id, {otp:generatedOTP}, { new: true });
    
      sendOtpMail(email,generatedOTP)


    res.status(200).json({ message: "Account Login.... " });

  } catch (error) {
    res.status(500).json({ error: error.message, message: "Something went wrong..." });
  }
});


router.post('/verify_otp', async (req, res) => {
    try {
        const { otp, email } = req.body;

        const findUser = await userSchema.findOne({ email, otp });

        if (!findUser) {
            return res.status(401).json({ message: "Invalid OTP or email." });
        }
        const token = jwt.sign(
            { id: findUser._id, email: findUser.email },
            process.env.SECRET_KEY, // Use your secret key
            { expiresIn: '365d' } // Expires in 365 days (1 year)
        );

       return res.status(200).json({ message: "Successfully Login", token,name:findUser.fullName||""});
    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});


router.post('/verify_email', async (req, res) => {
    try {
        const {email } = req.body;

        const min = 100000;
        const max = 999999;
        const generatedOTP = Math.floor(Math.random() * (max - min + 1)) + min;

        const findUser = await userSchema.findOne({ email });
        await userSchema.findByIdAndUpdate(findUser._id, {otp:generatedOTP}, { new: true });

        if (!findUser) {
            return res.status(401).json({ message: "Invalid OTP or email." });
        }
        sendOtpMail(email,generatedOTP)
        res.status(200).json({ message: "Successfully Confirm"});
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});

router.post('/verify_email_otp', async (req, res) => {
    try {
        const { otp, email } = req.body;

        const findUser = await userSchema.findOne({ email, otp });

        if (!findUser) {
            return res.status(401).json({ message: "Invalid OTP or email." });
        }

        const token = jwt.sign(
            { id: findUser._id, email: findUser.email },
            process.env.SECRET_KEY, // Use your secret key
            { expiresIn: '365d' } // Expires in 365 days (1 year)
        );

        res.status(200).json({ message: "OTP Confirm", token,email:findUser.email||""});

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});

router.post('/create_verify_email_password', async (req, res) => {
    try {
        const findUser = await userSchema.findOne({ email: req.body.email });
        const emailExists = findUser; 
        if (emailExists) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10); 
            await userSchema.findByIdAndUpdate(findUser._id, {password:hashedPassword}, { new: true });
            res.status(200).json({data:req.body.email,message:"Successfully saved"})
        }else{
            res.status(400).json({message:"Bad request"})
        }

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});


module.exports = router;


