import OrderModel from "../models/orderModal.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";
// import productValidationSchema from "../validation/productValidationSchema.js";
import moment from "moment";
import mongoose from "mongoose";


export const submitOrder = async (req, res) => {

    const orderID = `OID-COD${moment().format('DDMMYYY')}`

    const { totalAmount, quantity, productId, productPrice, discountPrice } = req.body
    const findUser = await UserModel.findOne({ _id: req.userId })

    if (findUser == null) {
        return res.send({
            status: false,
            message: "Unauthorized user"
        })
    }

    const result = await OrderModel.aggregate([
        { $match: { productObjectId: mongoose.Types.ObjectId.createFromHexString(productId) } },
        {
            $lookup: {
                from: 'products',
                localField: 'productObjectId',
                foreignField: '_id',
                as: 'productDetails',
            },
        },
        { $unwind: '$productDetails' },
        {
            $group: {
                _id: '$productObjectId',
                totalQuantity: { $sum: '$quantity' },
                productQty: { $first: '$productDetails.qty' },
            },
        },
        {
            $project: {
                _id: 0,
                productObjectId: '$_id',
                totalQuantity: 1,
                productQty: 1,
            },
        },
    ]);

    if (result.length) {
        console.log("vvvvvvvvvv");

        if ((result[0].productQty <= result[0].totalQuantity)) {

            return res.status(400).json({
                status: false,
                message: "Product out of stock"
            })
        } else {
            console.log("ssssssssss", result[0].totalQuantity);

            if (result[0].totalQuantity <= quantity)
                return res.status(400).json({
                    status: false,
                    message: "Product out of stock"
                })
        }
    }

    // Create Order
    await OrderModel.create({
        quantity: quantity,
        totalAmount: totalAmount,
        orderId: orderID,
        status: true,
        productPrice: productPrice,
        discountedPrice: discountPrice,
        userObjectId: req.userId,
        productObjectId: productId,
    })

    // manage stock
    const findproduct = await ProductModel.findOne({ _id: productId }).select('availableQTY')

    const checkQty = +(findproduct.availableQTY) - quantity
    await ProductModel.updateOne({ _id: productId }, { availableQTY: checkQty })

    return res.status(200).json({
        status: true,
        message: "Order placed successfully"
    })
}