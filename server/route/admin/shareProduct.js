const adminSchema = require('../../model/admin/adminAccount')
const router = require('express').Router()
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken'); // assuming you want to use JWT for authentication
require('dotenv').config()



router.post('/share-t-shirt', async (req, res) => {
    try {
        const { otp, email } = req.body;
        const findUser = await adminSchema.findOne({ email, otp });
        res.status(200).json({ message: "Successfully saved", token,email:findUser.email||""});
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong..." });
    }
});





module.exports = router;