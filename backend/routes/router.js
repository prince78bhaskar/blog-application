import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("user router is running");
})

router.post('/registerUser' , userController.registerUser);

export default router;