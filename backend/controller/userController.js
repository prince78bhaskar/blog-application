import express from 'express';
import  user from '../model/model.js';



async function registerUser(req, res) {
    // Logic to register a user }

    try{
        const{name,email,mobile,course}=req.body;

        const response = await User.create({
            name: name,
            email: email,
            mobile: mobile,
            course: course
        });
        res.status(201).json(response);
    } 
    catch (error) {
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
    // res.send("User registered successfully");
}

const userController = { registerUser };

export default userController;