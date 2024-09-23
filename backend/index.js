import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './DB/connect.js';
import authRoutes from './routes/auth.js';

dotenv.config(); 
const app = express();  
const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use('/api/auth', authRoutes )

 

app.listen(PORT, ()=>{
    connectDB();
    console.log('server is on ioi...');
    })  