import { Router } from "express";
import { getProductsController, getProductByIdController, getProductsByCategoryController, addProductController, updateProductController, deleteProductController } from "../controllers/Products.controller.js";
import { auth } from "../middlewares/auth.js";

const productsRouter = Router();

productsRouter.get("/", auth, async (req, res) => {
    let products = await getProductsController();
    res.send(products);
});

productsRouter.get("/:id", auth, async (req, res) => {
    const { id } = req.params;
    let product = await getProductByIdController(id);
    res.send(product);
});

productsRouter.get("/category/:category", auth, async (req, res) => {
    const { category } = req.params;
    let products = await getProductsByCategoryController(category);
    res.send(products);
})

productsRouter.post("/", async (req, res) => {
    const { title, category, description, price, thumbnail } = req.body;
    let savedProduct = await addProductController(title, category, description, price, thumbnail);
    res.send(savedProduct);
});

productsRouter.put("/", async (req, res) => {
    const { id, title, price, thumbnail, quantity } = req.body;
    const product = await updateProductController(id, title, price, thumbnail, quantity);
    res.send(product);
});

productsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.send(deleteProductController(id));
});

export default productsRouter;