// to hash password 
const bcrypt = require('bcrypt');
const user = require('../model/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Sign up route handler
exports.signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // check if user already exist 
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exits"
            })
        }
        // Secured password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "issue is hashing password",

            })
        }

        // Create Entry for User
        const newUser = await user.create({
            name, email, password: hashedPassword, role
        })

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            password: hashedPassword,

        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        //fetch data
        const { email, password } = req.body;
        //validate email and pasword
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill all the details"
            });
        }
        //check for registered user
        const registeredUser = await user.findOne({ email });
        //if not a registerd user
        if (!registeredUser) {
            return res.status(401).json({
                success: false,
                message: 'user is not registerd'
            })
        }

        //verify password and generate a jwt token

        const payload = {
             id: registeredUser._id,
            email: registeredUser.email,
            // password: registeredUser.password,
            role: registeredUser.role,
        }
        if (await bcrypt.compare(password, registeredUser.password)) {
            // console.log("SECRET:", process.env.JWTSECRET);
            let token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "2h" })

            // inserting a tooken into registeredUser object
            const userObj = registeredUser.toObject();
            userObj.token = token;    
            //as the other dev or hackers can see all the data of our registered user so we will hide the password
            userObj.password = null;
                    

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                userObj,
            })
        }
        //if password does not match
        else {
            return res.status(403).json({
                success: false,
                message: "password incorrect",
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "login failure"
        })

    }
}