import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dontenv from 'dotenv'

dontenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export  const signUpReq = async(req,res) => {
    try{
        const { username, email, password, address } = req.body;
        //check username length
        if(username.length < 4){
            return res.status(400)
                    .json({message : "Username length should be greater than 3"})
        }

        //check user 
        const existingUsername = await User.findOne({username: username});
        if(existingUsername){
            return res.status(400).json({message : "Username already exists"});
        }
        //check email
        const existingEmail = await User.findOne({email: email});
        if(existingEmail){
            return res.status(400).json({message : "Email already exists"});
        }
        // password length
        if(password.length < 5){
            return res.status(400)
                    .json({message : "Password length should be greater than 4"})
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            username : username,
            password : hashedPass,
            email : email,
            address : address
        })
        await newUser.save();
        res.status(200).json({message : "Sign up successfully"});
    }catch(error){
        res.status(500)
            .json({message : "Internal server error"});
    }
}

export const signInReq = async(req,res) => {
    try{
        const{username, password} = req.body;

        const existingUser = await User.findOne({username : username});
        if(!existingUser){
            return res.status(404)
                    .json({message : "Invalid credentials"});
        }
        await bcrypt.compare(password, existingUser.password, (error, data) => {
            if(data) {
                const authClaims = [
                    {name : existingUser.username},
                    {role : existingUser.role},
                ];
                const token = jwt.sign({authClaims},SECRET_KEY, {
                    expiresIn:"30d",
                });
                res.status(200)
                    .json({id : existingUser._id, role : existingUser.role, token : token});
            }
            else{
                return res.status(404)
                    .json({message : "Invalid credentials"});
            }
        })
       
    }catch(error){
        res.status(500)
            .json({message : "Internal server error"});
    }
}

export const getUserInformation = async(req,res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500)
            .json({message : "Internal server error"});
    }
}

export const updateAddress = async(req,res) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address: address});
        return res.status(200).json({message : "Address updated successfully"});
    } catch (error) {
        res.status(500)
        .json({message : "Internal server error"});
    }
}