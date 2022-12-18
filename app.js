import express from "express";
import path from "path";
import {fileURLToPath} from 'url';
import router from "./src/routes/index.js";
import sessionMiddleware from "./src/middlewares/session.js";
import templates from "./src/middlewares/templates.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


sessionMiddleware(app);
templates(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

app.use("/api", router);
app.get("/", (req, res) => {
  res.redirect("/api");
});

export default app;