import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config({
    path: './.env'
});
import router from './userRouter/router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router);  

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`);
    });
});