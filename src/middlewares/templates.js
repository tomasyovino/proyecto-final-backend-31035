import exphbs from "express-handlebars";
import path from "path";

const templates = (app) => {
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
};

export default templates;