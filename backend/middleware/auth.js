const jwt = require('jsonwebtoken')
require("dotenv").config();
const User = require("../models/User")

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = req.cookies.token || req.body.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null);
        // console.log("authHeader",authHeader);
        // const token=req.cookies.token ||req.body.token || req.header("Authorization").replace("Bearer ","");
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "token is missing...."
            })
        }
        // console.log(token);
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode
        } catch (error) {
            console.log("token is invalid", error);
            return res.status(500).json({
                success: false,
                message: "token is invalid"
            })
        }
        next();
    } catch (error) {
        console.log("error occuring while validating token in middleware", error, error.message);
        res.status(500).json({
            success: false,
            message: "somthing wrong while validating token"
        })
    }
}

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Student') {
            return res.status(400).json({
                success: false,
                message: 'this is protected route for student'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role not verified try again"
        })
    }
}


exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Instructor') {
            return res.status(400).json({
                success: false,
                message: 'this is protected route for instructor'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role not verified try again"
        })
    }
}


exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Admin') {
            return res.status(400).json({
                success: false,
                message: 'this is protected route for Admin'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role not verified try again"
        })
    }
}