const express = require("express");
const router  = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Json web token secret to sign a token
const JWT_secreat = "Himansusiadoogyob";

// Create a user using : POST "/api/auth/createuser". Does not require authentication  
router.post('/createuser', [ 
    body("name", "Enter a valid Name!").isLength({min: 3}),
    body("email", "Enter a Valid Email!").isEmail(),
    body('password', 'Password must be at least 5 Characters').isLength({ min:5 }),
], async (req, res)=>{

    // If there are errors return bad request and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    // Check whether the user with same email exist alerady 
    try{
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({error: "Sorry a user with the same email already exists"});
        }

        // Using bcrypt library to generate hash and add salt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Creating new user  
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user:{
                id: user.id
            }
        }

        //signing token using JWT_Secreat
        const authtoken = jwt.sign(data, JWT_secreat);

        res.json(authtoken);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Some Error Occured!!!");
    }
    
})

module.exports = router;