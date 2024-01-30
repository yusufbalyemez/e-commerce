const express = require("express");
const mongoose = require("mongoose");
const app = express()
const port = 5000;

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://yusuf-e-commerce:ddX00qeCVgLoBzQr@mern-e-commerce.po0xg06.mongodb.net/");
        console.log("Connected to mongoDb");
    }catch(error){
        throw error;
    }
}

app.get("/", (req,res)=>{
    res.send("s.a")
});

app.get("/api", (req,res)=>{
    res.send("d")
})


app.listen(port,()=>{
    connect();
    console.log(`Sunucu ${port} portunda çalışıyor.`)
})