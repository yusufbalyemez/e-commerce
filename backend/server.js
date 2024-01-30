const express = require("express")
const app = express()

app.get("/", (req,res)=>{
    res.send("s.a")
});

app.get("/api", (req,res)=>{
    res.send("d")
})


app.listen(5000,()=>{
    console.log(`Sunucu ${5000} portunda çalışıyor.`)
})