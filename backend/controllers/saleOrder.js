const SaleOrder = require("../models/saleOrderModel");



// create student --Admin
exports.createSaleOrder = (async (req, res, next) => {
    const sale = await SaleOrder.create(req.body);

    res.status(201).json({
        success: true,
        sale,
    });
});



exports.getAllsaleOrder = async (req, res) => {
    const saleorders = await SaleOrder.find();
    res.status(200).json({
        success: true,
        saleorders,
    });

}


// get single item 

exports.getSaleOrderDetail = async (req, res, next) => {
    const sale = await SaleOrder.findById(req.params.id);

    if (!sale) {
        return res.status(500).json({
            success: false,
            message: "SaleOrder not Found"
        });
    }

    res.status(200).json({
        success: true,
        sale,
    })

};




exports.updateSaleOrder = async (req, res, next) => {
    let sale = await SaleOrder.findById(req.params.id);

    if (!sale) {
        return res.status(500).json({
            success: false,
            message: "SaleOrder not Found"
        });
    }
    sale = await SaleOrder.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        sale,
    });

}
// exports.updateOrderStatus = async (req, res, next) => {
//   try {
//     const orderId = req.params.id;
//     const { newStatus } = req.body;
//     const updatedOrder = await SaleOrder.findByIdAndUpdate(
//       orderId,
//       { Status: newStatus },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       order: updatedOrder,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update order status',
//     });
//   }
// };



exports.deleteSaleOrder = async (req, res, next) => {

    // req.body.student=req.student.id
    const sale = await SaleOrder.findById(req.params.id);
  
    if (!sale) {
      return next(new ErrorHandler("SaleOrder Not Found ", 404));
    }
  
    // ==========================================================================
  
    // another trick to delete one record
  
    await sale.deleteOne({_id:req.params.id});
  
    //   ===========================================================================
  
    // await Order.findOneAndDelete();
  
    res.status(200).json({
      success: true,
      message: "SaleOrder delete successfully",
    });
  } ;