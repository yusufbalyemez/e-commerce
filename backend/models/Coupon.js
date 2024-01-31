const mongoose = require("mongoose");

const CouponSchema = mongoose.Schema(
    {
        code: { type: String, required: true }, //Kupon Kodu
        discountPercent: { type: Number, required: true }, //İndirim Oranı
    },
    {timestamps: true}
)


const Coupon = mongoose.model("Coupon.js",CouponSchema)
module.exports = Coupon;