import { listUserByIdController } from "../controllers/User.controller.js";
import { getProductsController, addProductController, updateProductController, deleteProductController } from "../controllers/Products.controller.js";
import { getCartByIdController, addProductToCartController, deleteProductFromCartController } from "../controllers/Carts.controller.js"

async function getUser({ id }) {
    const user = await listUserByIdController(id);
    if(!user) {
        throw new Error("User not found.");
    };
    return user;
};

async function getProducts({ field, value }) {
    const products = Object.values(await getProductsController());
    if (field && value ) {
        return products.filter((p) => p[field] == value);
    } else {
        return products;
    };
};

async function createProduct({ data }) {
    try {
        let title = data.title,
        price = data.price,
        thumbnail = data.thumbnail;
        return await addProductController(title, price, thumbnail);
    } catch (error) {
        throw new Error(error);
    }
};

async function updateProduct({ id, data }) {
    try {
        let title = data.title,
            price = data.price,
            thumbnail = data.thumbnail,
            quantity = data.quantity;
        return await updateProductController(id, title, price, thumbnail, quantity);    
    } catch (error) {
        throw new Error(error);
    }
};

async function deleteProduct({ id }) {
    try {
        const deleteProductById = await deleteProductController(id);
        const products = await getProductsController();
        return products;
    } catch (error) {
        throw new Error(error);
    }
};

async function getCart({ userId }) {
    const cart = await getCartByIdController(userId);
    if(!cart) {
        throw new Error("Cart not found.");
    };
    return cart;
};

async function addProductToCart({ userId, productId }) {
    try {
        const addProduct = await addProductToCartController(userId, productId);
        const getCartById = await getCartByIdController(userId);
        return getCartById;
    } catch (error) {
        throw new Error(error);
    }
};

async function deleteProductFromCart({ userId, productId }) {
    try {
        const deleteProduct = await deleteProductFromCartController(userId, productId);
        const getCartById = await getCartByIdController(userId);
        return getCartById;
    } catch (error) {
        throw new Error(error);
    }
};

export { getUser, getProducts, createProduct, updateProduct, deleteProduct, getCart, addProductToCart, deleteProductFromCart };