import express from "express";
import os from "os";
import cookieParser from "cookie-parser";
import session from "express-session";
import exphbs from "express-handlebars";
import path from "path";
import {fileURLToPath} from 'url';
import { checkUserController, listUserDeserializeController } from "./src/controllers/User.controller.js";
import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;
import router from "./src/routes/index.js";
import compression from "compression";
import { logger, errorLogger } from "./src/utils/loggers.js";

const app = express();
const numCPUs = os.cpus().length;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || "1234567890!@#$%^&*()"

/*============================[Middlewares]============================*/

/*----------- Session -----------*/
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000, // 10 min
    },
  })
);
app.use(compression());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((email, password, done) => {
    checkUserController(email, password, done);
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await listUserDeserializeController(id);
  return done(null, user);
});

/*----------- Motor de plantillas -----------*/
app.set("views", path.join(path.dirname(""), "./src/views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "index",
    layoutsDir: path.join(app.get("views"), "layouts"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

app.use("/api", router);

/*============================[Servidor]============================*/
app.get("/", (req, res) => {
    res.redirect("/api");
});

const server = app.listen(PORT, () => {
  logger.info(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  errorLogger.error(`Error en el servidor ${error}`);
});