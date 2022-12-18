import ProductsDAOMongo from "../DAO/product/ProductsDAOMongo.js";
import ProductsDAOFile from "../DAO/product/ProductsDAOFile.js";
import ProductsDAOMemory from "../DAO/product/ProductsDAOMemory.js";
import { config } from "../utils/config.js";

let productsDAO;

switch (config.pers) {
    case "mongodb":
        productsDAO = ProductsDAOMongo.createInstance();
        break;
    case "file":
        productsDAO = ProductsDAOFile.createInstance();
        break;
    case "memory":
        productsDAO = ProductsDAOMemory.createInstance();
        break;
};

async function getProducts() {
    return await productsDAO.listAll();
};

async function getProductById(id) {
    return await productsDAO.list(id);
};

async function getProductsByCategory(category) {
    return await productsDAO.findByCategory(category);
}

async function addProduct(title, category, description, price, thumbnail) {
    let savedProduct = await productsDAO.save({ title, category, description, price, thumbnail, quantity: 1 })
    return savedProduct;
};

async function updateProduct(id, title, price, thumbnail, quantity) {
    let updatedProduct = await productsDAO.update({ id: id, title: title, price: price, thumbnail: thumbnail, quantity: quantity });
    return updatedProduct;
};

async function deleteProduct(id) {
    return await productsDAO.delete(id);
};

export { getProducts, getProductById, getProductsByCategory, addProduct, updateProduct, deleteProduct };