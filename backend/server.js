const express = require("express"); //Veritabanı kurulumu için
const mongoose = require("mongoose"); // mangoDb için
const dotenv = require("dotenv") //gizli değişkenler , yollar oluşturmak için
const app = express()
const cors = require("cors")
const logger = require("morgan") //console ekranda atılan req, res leri gösteriyor
const mainRoute = require("./routes/index.js")
const port = 5000;

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoDb");
    } catch (error) {
        throw error;
    }
}

//middlewares
app.use(logger("dev")) //bu ne bilmiyorum bak.
app.use(express.json()) //bu gerekli. ara katmanmış
app.use(cors()); //bu da hangi ip den ulaşılacağına izin veriyor bu da çok önemli


//Ana Router Dosyası
app.use("/api",mainRoute)

app.listen(port, () => {
    connect();
    console.log(`Sunucu ${port} portunda çalışıyor.`)
})