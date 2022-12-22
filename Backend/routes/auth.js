const express = require("express");
const router  = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a user using : POST "/api/auth/". Does not require authentication  
router.post('/', [ 
    body("name", "Enter a valid Name!").isLength({min: 3}),
    body("email", "Enter a Valid Email!").isEmail(),
    body('password', 'Password must be at least 5 Characters').isLength({ min:5 }),
], (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then( user => res.json(user))
    .catch(err => {
        console.log(err);
        res.json({error : "Please enter a unique value for email!", message : err.message});
    });
})

module.exports = router;