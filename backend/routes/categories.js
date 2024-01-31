const express = require("express")
const router = express.Router();
const Category = require("../models/Category") //Category tablosundaki verileri getir.


//YENİ BİR KATEGORİ OLUŞTURMA(CREATE)
router.post("/", async (req, res) => {
    try {
        const { name, img } = req.body;

        const newCategory = new Category({ name, img }); //Veritabanına göndermek için nesne oluşturuldu.
        await newCategory.save(); // Veritabanına kaydeder.

        //frontendden gönderilen veriyi yakalar.
        const myData = req.body;

        console.log(name)
        console.log(img)

        //Başarılı bir kod olduysa bu kodu gönder. (https response status diye arat ayrıntıları var)
        res.status(201).json(newCategory)
    } catch (error) {
        res.status(500).send("Hata")
        console.log(error)
    }
})

// Tüm kategorileri getirme (Read - All)
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find(); //Tüm kategorideki özellikleri alıp getirecek
        res.status(200).json(categories); //bunla frontend tarafına bilgi gönderiliyor
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server error."})
    }
})

module.exports = router;