const mongoose = require("mongoose");


const CardsSchema = new mongoose.Schema({
   
    card_name:String,
    card_image:String,
    card_description:String,
    hq:String,
    canFake:{type:Boolean,default:false},
    customer_care:String,
    balance_link:String,
    createdAt:{type:Date,default:Date.now()}
});


module.exports = mongoose.model("Cards", CardsSchema);




