import { Router } from "express";
import { listUserByIdController } from "../controllers/User.controller.js";
import { verifyCartExistenceController } from "../controllers/Carts.controller.js";
import { getProductsController } from "../controllers/Products.controller.js";
import { auth } from "../middlewares/auth.js";

const mainRouter = Router();

mainRouter.get("/", auth, async (req, res) => {
    const userData = await listUserByIdController(req.user._id);
    const dataProd = await getProductsController();

    const cart = await verifyCartExistenceController(req.user._id, null);
    
    res.render("main", {
      data: userData,
      productData: dataProd,
    });
});

export default mainRouter;