const express = require("express");
const { getAllsaleOrder, createSaleOrder, updateSaleOrder, deleteSaleOrder, getSaleOrderDetail } = require("../controllers/saleOrder");

const router = express.Router();


// Routes
router.route("/saleorders").get(getAllsaleOrder);
router.route("/saleorder/new").post(createSaleOrder);
// router.route("/order/status/:id").put(updateOrderStatus);
router.route("/saleorder/:id").put(updateSaleOrder).delete(deleteSaleOrder).get(getSaleOrderDetail);


module.exports = router;
