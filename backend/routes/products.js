
const express = require("express")
const router = express.Router();
const Product = require("../models/Product.js"); //Product tablosundaki(modeldeki) verileri getir.

// Tüm ürünleri getirme (Read - All)
router.get("/", async (req,res)=>{
    res.send("Ürünler getirildi.")
})

//YENİ BİR ÜRÜN OLUŞTURMA(CREATE)
router.post("/", async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
  
      res.status(201).json(newProduct);
    } catch (error) {
      console.log(error);
    }
  });


module.exports = router;