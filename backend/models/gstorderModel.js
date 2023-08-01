
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  gstNumber: {
    type: String,
  },

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
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
