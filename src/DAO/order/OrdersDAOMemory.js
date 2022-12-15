import MemoryContainer from "../../containers/MemoryDBContainer.js";
import { errorLogger } from "../../utils/loggers.js";

let instance = null;

class OrdersDAOMemory extends MemoryContainer {

};

export default OrdersDAOMemory;