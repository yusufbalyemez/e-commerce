const express = require("express")
const router = express.Router();
const Category = require("../models/Category"); //Category tablosundaki verileri getir.


//YENİ BİR KATEGORİ OLUŞTURMA(CREATE)
router.post("/", async (req, res) => {
    try {
        const { name, img } = req.body;

        const newCategory = new Category({ name, img }); //Veritabanına göndermek için nesne oluşturuldu.
        await newCategory.save(); // Veritabanına kaydeder.

        //frontendden gönderilen veriyi yakalar.
        const myData = req.body;

        //Başarılı bir kod olduysa bu kodu gönder. (https response status diye arat ayrıntıları var)
        res.status(201).json(newCategory)
    } catch (error) {
        res.status(500).json({error: "Server error."})
        console.log(error)
    }
});

// Tüm kategorileri getirme (Read - All)
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find(); //Tüm kategorideki özellikleri alıp getirecek
        res.status(200).json(categories); //bunla frontend tarafına bilgi gönderiliyor
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error." })
    }
});

// Belirli bir kategoriyi getirme (read - single)
router.get("/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        try {
            const category = await Category.findById(categoryId)
            res.status(200).json(category)
        } catch (error) {
            return res.status(404).json({ error: "Category not found" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error." })
    }


});


//Kategori Güncelleme (Update)
router.put("/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId; //id yi alıyoruz
        const updates = req.body; //güncellenecek veriler updates değişkenine aktarılıyor.

        const existingCategory = await Category.findById(categoryId);

        if (!existingCategory) {
            return res.status(404).json({ error: "Category not found" })
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            updates,
            { new: true } //bunu yapmazsan eski değeri gönderiyor. Onun için bu özellik önemli
        )

        res.status(200).json(updatedCategory)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error." })
    }
})


//Kategori Silme (Delete)

router.delete("/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // Önce kategoriyi bul
        const category = await Category.findById(categoryId);

        // Kategori varsa, sil
        if (category) {
            await Category.deleteOne({ _id: categoryId });
            res.status(200).json({ message: "Category deleted successfully" });
        } else {
            res.status(404).json({ error: "Category not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error." });
    }
});


module.exports = router;