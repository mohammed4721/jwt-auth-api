const express = require('express');
const router = express.Router();


//import controller
const {signUp, login} = require('../controller/auth.controller');
const {auth, isStudent, isAdmin} = require("../middlewares/auth.middleware")


router.post("/login", login);
router.post("/signup", signUp);

router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for students",
    })
});
router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for Admin",
    })
});

module.exports = router;
