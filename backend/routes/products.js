const express = require("express")
const router = express.Router();
const Product = require("../models/Product.js"); //Product tablosundaki(modeldeki) verileri getir.

//YENİ BİR ÜRÜN OLUŞTURMA(CREATE)
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({error: "Server error."})
        console.log(error)
    }
});

// Tüm ürünleri getirme (Read - All)
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});

// Belirli bir ürünü id'ye göre getirme (Read - Single)
router.get("/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});


// Ürün güncelleme (Update)
router.put("/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const updates = req.body;

        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updates,
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});


//Ürün Silme (Delete)

router.delete("/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;

        // Önce kategoriyi bul
        const product = await Product.findById(productId);

        // Kategori varsa, sil
        if (product) {
            await Product.deleteOne({ _id: productId });
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error." });
    }
});




module.exports = router;