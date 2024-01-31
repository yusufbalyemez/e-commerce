const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs")

const generateRandomAvatar = () =>{
    //1-70 arası random rakam at
    const randomAvatar = Math.floor(Math.random()*70 + 1)
    return `https://i.pravatar.cc/300?img=${randomAvatar}`
}


//Kullanıcı Oluşturma (Create - Register)
router.post("/register", async (req,res)=>{
    try {
        //Frontendden gelen her bir bilgiyi bu değişkenlere al
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email}); //email User tablosunda hali hazırda kayıtlı var bak

        //Eğer aynı email varsa
        if(existingUser){
            return res.status(400).json({error:"Email Address is already registered"})
        }

        const hashedPassword = await  bcrypt.hash(password,10)

        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
            avatar: generateRandomAvatar()
        });
        await newUser.save(); //bunu unutma veri tabanına bu kayıt ediyor.
        res.status(201).json(newUser) // yeni kullanıcıyı kaydettiği bilgisini gönder
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."})
    }
})

module.exports = router;
