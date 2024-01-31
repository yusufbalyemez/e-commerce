const express = require("express"); //Veritabanı kurulumu için
const mongoose = require("mongoose"); // mangoDb için
const dotenv = require("dotenv") //gizli değişkenler , yollar oluşturmak için
const app = express()
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
app.use(logger("dev"))
app.use(express.json()) //bu gerekli. ara katmanmış


//Ana Router Dosyası
app.use("/api",mainRoute)

app.listen(port, () => {
    connect();
    console.log(`Sunucu ${port} portunda çalışıyor.`)
})