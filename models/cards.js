const mongoose = require("mongoose");


const CardsSchema = new mongoose.Schema({
   
    card_name:String,
    card_image:String,
    card_description:String,
    hq:String,
    customer_care:String,
    createdAt:{type:Date,default:Date.now()}
});


module.exports = mongoose.model("Cards", CardsSchema);




