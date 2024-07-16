import mongoose from "mongoose";



const OrderSchema = mongoose.Schema(
    {
        quantity: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        }, status: {
            type: String,
            required: true,
        },
        productPrice: {
            type: String,
            required: true,
        },
        discountedPrice: {
            type: String,
        },
        userObjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        productObjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true,
        },
    },
    { timestamps: true }
)


const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;