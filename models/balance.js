const mongoose = require("mongoose");


const BalanceSchema = new mongoose.Schema({
   
    card_name:String,
    card_number:String,
    card_pin:String,
    checked:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
});


module.exports = mongoose.model("Balance", BalanceSchema);




