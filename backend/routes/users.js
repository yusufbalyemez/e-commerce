const express = require("express")
const router = express.Router();
const User = require("../models/User"); //Category tablosundaki verileri getir.

//Kullanıcıları Getir

router.get("/", async (req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }catch(error){
        console.error(error)
        res.status(500).json({error: "Server Error"})
    }
}); 

module.exports = router;