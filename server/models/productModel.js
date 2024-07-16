import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    metaTitle: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discountedPrice: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    isActive:{
      type:Boolean,
      required: false,
      default:true,
    },
    qty: {
      type: String,
      require: true,
      default: 0,
    },
    availableQTY: {
      type: String,
      require: true,
      default: 0,
    }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
