import { Router } from "express";
import { auth } from "../middlewares/auth.js";

const messageRouter = Router();

messageRouter.get("/", auth, async (req, res) => {
    res.render("chat", { email: req.user.email });
});

messageRouter.get("/:email", auth, async (req, res) => {
    res.send("Estos son los mensajes del usuario");
});

export default messageRouter;