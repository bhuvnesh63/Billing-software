
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({

    itemName: {
        type: String,
    },
    sellingPrice: {
        type: Number,
    },
    purchasingPrice: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    // image: {
    //     type:String
    //   },


});

module.exports = mongoose.model("Item", itemSchema);

