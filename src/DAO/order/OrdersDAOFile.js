import { promises as fs } from "fs";
import FileContainer from "../../containers/FileDBContainer.js";
import { errorLogger } from "../../utils/loggers.js";

let instance = null;

class OrdersDAOFile extends FileContainer {
    constructor(){
        super("./db/orders.txt");
    };
};

export default OrdersDAOFile;