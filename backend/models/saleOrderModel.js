
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },

  // phoneNumber: {
  //   type: Number,
  // },
  Items: [
    {
      itemName: {
        type: String,

      },
      pricePerItem: {
        type: Number,

      },
      quantity: {
        type: String,

      },
      totalPrice: {
        type: Number,
      },
      amountWithoutGST: {
        type: Number,
      },
      cgstapplied: {
        type: Number,
      },
      sgstapplied: {
        type: Number,
      },
      pricePerItem: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("SaleOrder", OrderSchema);
