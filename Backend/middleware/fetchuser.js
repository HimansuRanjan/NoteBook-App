const jwt = require("jsonwebtoken");
const JWT_SECTET = "Himansusiadoogyob";

const fetchuser = (req, res, next)=>{
    // Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token!11"});
    }
    try {
        const data = jwt.verify(token, JWT_SECTET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using valid token!"});
    }
    
}

module.exports = fetchuser;