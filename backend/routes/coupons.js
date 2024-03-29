const express = require("express")
const router = express.Router();
const Coupon = require("../models/Coupon.js"); //Coupon tablosundaki verileri getir.


//YENİ BİR KUPON OLUŞTURMA(CREATE)
router.post("/", async (req, res) => {
    try {

        //Aynı kuponu eklememek için - start
        const {code} = req.body;
        const existingCoupon = await Coupon.findOne({code}); //Eğer bu varsa

        if(existingCoupon){
            return res.status(400).json({error: "This coupon is already exist."})
        }

        //Aynı kuponu eklememek için - end


        const newCoupon = new Coupon(req.body); //Veritabanına göndermek için nesne oluşturuldu.
        await newCoupon.save(); // Veritabanına kaydeder.

        //Başarılı bir kod olduysa bu kodu gönder. (https response status diye arat ayrıntıları var)
        res.status(201).json(newCoupon)
    } catch (error) {
        res.status(500).json({error: "Server error."})
        console.log(error)
    }
});

// Tüm kuponları getirme (Read - All)
router.get("/", async (req, res) => {
    try {
        const coupons = await Coupon.find(); //Tüm kuponlardaki özellikleri alıp getirecek
        res.status(200).json(coupons); //bunla frontend tarafına bilgi gönderiliyor
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error." })
    }
});

// Id'ye göre Belirli bir kuponu getirme (read - single by Coupon Id)
router.get("/:couponId", async (req, res) => {
    try {
        const couponId = req.params.couponId;

            const coupon = await Coupon.findById(couponId)

            if(!coupon){
                return res.status(404).json({ error: "Coupon not found" })
            }

            res.status(200).json(coupon)
       
            
  

    } catch (error) {
        console.log(error)
       res.status(500).json({ error: "Server Error." })
    }


});

// Belirli bir kuponu koduna göre getirme (read - single by Coupon Code)
router.get("/code/:couponCode", async (req, res) => {
    try {
        const couponCode = req.params.couponCode;

            const coupon = await Coupon.findOne({code: couponCode});

            if(!coupon){
                return res.status(404).json({ error: "Coupon not found" })
            }

            //tüm bilgileri gönderir.
            res.status(200).json(coupon)
    
    //Bu şekilde de gönderilebilir

    // const {discountPercent} = coupon;
    // res.status(200).json({discountPercent});      
  

    } catch (error) {
        console.log(error)
       res.status(500).json({ error: "Server Error." })
    }


});

//Kupon Güncelleme (Update)
router.put("/:couponId", async (req, res) => {
    try {
        const couponId = req.params.couponId; //id yi alıyoruz
        const updates = req.body; //güncellenecek veriler updates değişkenine aktarılıyor.

        const existingcoupon = await Coupon.findById(couponId);

        if (!existingcoupon) {
            return res.status(404).json({ error: "coupon not found" })
        }

        const updatedcoupon = await Coupon.findByIdAndUpdate(
            couponId,
            updates,
            { new: true } //bunu yapmazsan eski değeri gönderiyor. Onun için bu özellik önemli
        )

        res.status(200).json(updatedcoupon)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error." })
    }
});


//Kupon Kodu Silme (Delete)

router.delete("/:couponId", async (req, res) => {
    try {
        const couponId = req.params.couponId;

        // Önce kuponu bul
        const coupon = await Coupon.findById(couponId);

        // kupon varsa, sil
        if (coupon) {
            await Coupon.deleteOne({ _id: couponId });
            res.status(200).json({ message: "Coupon deleted successfully" });
        } else {
            res.status(404).json({ error: "Coupon not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error." });
    }
});


module.exports = router;