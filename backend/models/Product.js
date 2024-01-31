const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    text: {type: String, required: true},
    rating: {type: Number, required:true},
    user: {type:mongoose.Schema.Types.ObjectId, ref: "User", required:true}, //user modelinden referans alacak. Orayla ilişkilendirildi.
    description: {type:String, required:true},
    colors: [{type: String, required:true}],
    sizes: [{type:String, required:true}],
    price: {
        current: {type:Number,required:true},
        discound: {type:Number}
    },
    category: {type:mongoose.Schema.Types.ObjectId, ref: "Category",required:true}
});

const ProductSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        img: [{ type: String, required: true }],
        reviews: [ReviewSchema]
    },
    {timestamps: true}
)


const Product = mongoose.model("Product",ProductSchema)
module.exports = Product;