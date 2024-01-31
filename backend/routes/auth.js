const express = require("express");
const router = express.Router();
const User = require("../models/User.js");


//Kullanıcı Oluşturma (Create - Register)
router.post("/register", async (req,res)=>{
    try {
        //Frontendden gelen her bir bilgiyi bu değişkenlere al
        const {username, email, password} = req.body;

        const newUser = await new User({
            username,email,password
        });
        await newUser.save(); //bunu unutma veri tabanına bu kayıt ediyor.
        res.status(201).json(newUser) // yeni kullanıcıyı kaydettiği bilgisini gönder
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."})
    }
})

module.exports = router;
