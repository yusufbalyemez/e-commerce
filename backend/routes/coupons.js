const express = require("express")
const router = express.Router();
const Coupon = require("../models/Coupon.js"); //Coupon tablosundaki verileri getir.


//YENİ BİR KATEGORİ OLUŞTURMA(CREATE)
router.post("/", async (req, res) => {
    try {

        const newCoupon = new Coupon(req.body); //Veritabanına göndermek için nesne oluşturuldu.
        await newCoupon.save(); // Veritabanına kaydeder.

        //Başarılı bir kod olduysa bu kodu gönder. (https response status diye arat ayrıntıları var)
        res.status(201).json(newCoupon)
    } catch (error) {
        res.status(500).json({error: "Server error."})
        console.log(error)
    }
})


module.exports = router;