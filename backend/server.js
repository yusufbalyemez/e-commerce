const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const app = express()
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
app.use(express.json()) //bu gerekli. ara katmanmış


//Ana Router Dosyası
app.use("/api",mainRoute)

app.listen(port, () => {
    connect();
    console.log(`Sunucu ${port} portunda çalışıyor.`)
})