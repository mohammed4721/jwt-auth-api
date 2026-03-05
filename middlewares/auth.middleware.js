const jwt = require('jsonwebtoken');
require('dotenv').config();

//ath, isStudent, isAdmin

exports.auth = (req, res, next) =>{
    try{
        //extract the tolken 
        const token = req.body.token || req.cookies.token || req.headers("Authorization").replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'token missing',
            });
        }

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWTSECRET);
            console.log(decode);


            req.userObj = decode;

        }catch(err){
            return res.status(401).json({
                success: false,
                message: 'invalid token'
            })
        }

        next();

    }catch(err){
        return res.status(401).json({
            success: false,
            message: "comething went wrong while verifying the token"
        })
    }
}



exports.isStudent = (req, res, next) => {
    try{
        if(req.userObj.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: 'this is protected route for students',
            });
        }
         next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'user role is not matching'
        })
    }

}



exports.isAdmin = (req, res, next) => {
    try{
        if(req.userObj.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: 'this is protected route for admin',
            });
        }
         next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'user role is not matching'
        })
    }

}


