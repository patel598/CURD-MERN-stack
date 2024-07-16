import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";
import productValidationSchema from "../validation/productValidationSchema.js";



export const createProducts = async (req, res) => {
    const { error } = productValidationSchema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const users = await UserModel.find();
    if (users.length) {
        const findUser = await UserModel.findById({ _id: req.userId })
        if (findUser == null) return res.status(200).json({ status: false, message: "Unauthorized user" })
        try {
            const { metaTitle, productName, price, discountedPrice, description, qty } = req.body;
            const oldProduct = await ProductModel.findOne({ productName });
            if (oldProduct)
                return res.json({ status: false, message: "Product already exists" });
            const image = req.file ? req.file.filename : "";
            const newProduct = new ProductModel({
                metaTitle,
                productName,
                price,
                discountedPrice,
                description,
                image,
                qty,
                availableQTY: qty,
            })

            await newProduct.save();
            return res.status(200).json({ status: true, message: 'Product created successfully', data: newProduct })
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create product' });
        }
    } else {
        return res.status(200).json({ status: false, message: "Unauthorized user" })
    }
}


export const getAllProducts = async (req, res) => {
    const userObjectId = req.params.userObjectId;
    const userData = await UserModel.findById({ _id: userObjectId })
    if (userData == null) {
        return res.status(200).json({ status: false, message: "Unauthorized user" })
    }
    try {
        const products = await ProductModel.find()
        // Filtering product for user
        const data = userData.type === "user" ? products.filter(val => val.isActive) : products
        res.status(200).json({ status: true, products: data })
    } catch (error) {
        res.status(400).json({ message: 'Product not found...' })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ status: true, data: product });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};



export const updateProduct = async (req, res) => {
    const { error } = productValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const { metaTitle, productName, price, discountedPrice, description, qty } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            {
                metaTitle,
                productName,
                price,
                qty,
                availableQTY: qty,
                discountedPrice,
                description,
                ...(image && { image })
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ status: true, message: 'Product updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};


export const deleteProduct = async (req, res) => {

    const filter = { _id: req.params.id };
    const update = { isActive: req.params.isActive }
    try {
        await ProductModel.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        res.status(200).json({ status: true, message: 'Product status updated.' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

