import express from 'express';

const app = express();

app.get("/", (req,res)=>{
    res.send("welcome Gee")
})




app.listen(5000, ()=>{
    console.log('server is on ...');
    
})