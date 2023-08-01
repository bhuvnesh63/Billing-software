const express = require("express");
const {
  getAllOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderDetail,
  updateOrderStatus
} = require("../controllers/gstorderController");

const router = express.Router();


// Routes
router.route("/gstorders").get(getAllOrder);
router.route("/gstorder/new").post(createOrder);
// router.route("/order/status/:id").put(updateOrderStatus);
router.route("/gstorder/:id").put(updateOrder).delete(deleteOrder).get(getOrderDetail);


module.exports = router;
