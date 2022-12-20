import CartsDAOMongo from "../DAO/CartsDAOMongo.js";


const cartsDAO = CartsDAOMongo.createInstance();

async function getCartById(id) {
    return await cartsDAO.findCart(id);
};

async function addProductToCart(userID, productID) {
    return await cartsDAO.addProduct(userID, productID)
}

async function deleteProductFromCart(userID, productID) {
    return await cartsDAO.deleteProduct(userID, productID);
};

export { getCartById, addProductToCart, deleteProductFromCart }